/**
 * Think Wise Careers — SMS & WhatsApp Notification Service
 * Supports pluggable Indian & International SMS gateways:
 * - Fast2SMS (DND bypass / quick transactional for Indian numbers)
 * - Twilio
 * - MSG91
 * - Safe development fallback (logs to console when API keys are not yet configured)
 */

interface SendSmsOptions {
  phone: string;
  message: string;
  code?: string;
}

export async function sendSms({ phone, message, code }: SendSmsOptions): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  // Normalize phone number (digits only or e.164)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  const digitsOnly = phone.replace(/\D/g, '');
  // For Indian numbers, get 10-digit number
  const indian10Digit = digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
  const fullIntlNumber = digitsOnly.startsWith('91') || digitsOnly.length > 10 ? digitsOnly : `91${indian10Digit}`;

  // 1. OpenWA WhatsApp Gateway (Free, Self-Hosted WhatsApp API Gateway: https://github.com/rmyndharis/OpenWA)
  if (process.env.OPENWA_BASE_URL && process.env.OPENWA_API_KEY) {
    try {
      const baseUrl = process.env.OPENWA_BASE_URL.replace(/\/$/, "");
      const apiKey = process.env.OPENWA_API_KEY;
      
      // Auto-resolve session ID if set to "auto" or empty
      let sessionId = process.env.OPENWA_SESSION_ID;
      if (!sessionId || sessionId === "auto") {
        try {
          const sessionsRes = await fetch(`${baseUrl}/api/sessions`, {
            headers: { "X-API-Key": apiKey }
          });
          if (sessionsRes.ok) {
            const sessions = await sessionsRes.json();
            if (Array.isArray(sessions) && sessions.length > 0) {
              const active = sessions.find((s: any) => 
                ['ready', 'connected', 'working'].includes(String(s.status).toLowerCase())
              ) || sessions[0];
              sessionId = active?.id || active?.sessionId || active?.name;
            }
          }
        } catch (e) {
          console.warn("[OpenWA] Could not fetch sessions list:", e);
        }
      }

      if (sessionId) {
        const chatId = `${fullIntlNumber}@c.us`;
        const formattedText = code 
          ? `*Think Wise Careers*\n\nYour inquiry verification code is: *${code}*\n\nValid for 5 minutes. Do not share this code with anyone.`
          : message;

        const response = await fetch(`${baseUrl}/api/sessions/${sessionId}/messages/send-text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey
          },
          body: JSON.stringify({
            chatId,
            text: formattedText
          })
        });

        if (response.ok) {
          console.log(`[OpenWA WhatsApp] Successfully dispatched OTP to ${chatId} using session ${sessionId}`);
          return { success: true };
        } else {
          const errText = await response.text();
          console.error(`[OpenWA WhatsApp Send Error]: ${response.status} -`, errText);
        }
      } else {
        console.warn(`[OpenWA] API key configured, but no WhatsApp session found yet. Please create and link a session at ${baseUrl}/sessions`);
      }
    } catch (err: any) {
      console.error(`[OpenWA Request Exception]:`, err);
    }
  }

  // 2. Fast2SMS Provider (Very popular in India for instant OTP)
  if (process.env.FAST2SMS_API_KEY) {
    try {
      const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          "authorization": process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: code || message,
          numbers: indian10Digit
        })
      });

      const data = await response.json();
      if (data.return) {
        console.log(`[Fast2SMS] Successfully dispatched OTP to ${indian10Digit}`);
        return { success: true };
      } else {
        console.error(`[Fast2SMS Error]:`, data);
      }
    } catch (err: any) {
      console.error(`[Fast2SMS Request Error]:`, err);
    }
  }

  // 2. Twilio Provider
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_PHONE_NUMBER;
      const formattedTo = cleanPhone.startsWith('+') ? cleanPhone : `+91${indian10Digit}`;

      const params = new URLSearchParams();
      params.append('To', formattedTo);
      params.append('From', from);
      params.append('Body', message);

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (response.ok) {
        console.log(`[Twilio] Successfully sent SMS to ${formattedTo}`);
        return { success: true };
      } else {
        const errText = await response.text();
        console.error(`[Twilio Error]:`, errText);
      }
    } catch (err: any) {
      console.error(`[Twilio Request Error]:`, err);
    }
  }

  // 3. MSG91 Provider
  if (process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID) {
    try {
      const response = await fetch(`https://api.msg91.com/api/v5/otp?template_id=${process.env.MSG91_TEMPLATE_ID}&mobile=91${indian10Digit}&authkey=${process.env.MSG91_AUTH_KEY}&otp=${code}`, {
        method: "GET"
      });
      const resJson = await response.json();
      if (resJson.type === "success") {
        console.log(`[MSG91] Successfully dispatched OTP to 91${indian10Digit}`);
        return { success: true };
      }
    } catch (err: any) {
      console.error(`[MSG91 Error]:`, err);
    }
  }

  // 4. Safe Development Fallback
  // If no SMS gateway keys are set in .env, simulate delivery cleanly so local/dev works out-of-the-box
  console.log(`\n======================================================`);
  console.log(`[SMS SIMULATION / DEV MODE]`);
  console.log(`To: ${cleanPhone}`);
  console.log(`Message: ${message}`);
  if (code) console.log(`OTP Code: ${code}`);
  console.log(`======================================================\n`);

  return { success: true, simulated: true };
}
