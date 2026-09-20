"use client";

import { useState } from "react";
import { QrCode, Smartphone, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function QuickAccessQR({ siteUrl = "https://thinkwisecareers.com" }: { siteUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const crmUrl = `${siteUrl}/crm`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(crmUrl)}&color=1e3a8a`;

  function copyShortcut() {
    navigator.clipboard.writeText(crmUrl);
    setCopied(true);
    toast.success("CRM link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5 text-indigo-300" />
          <h3 className="font-bold text-lg font-outfit text-white">Mobile & Team Quick Connect</h3>
        </div>
        <p className="text-xs text-indigo-200 leading-relaxed mb-4">
          Scan this QR code with any phone camera to instantly open and bookmark the Think Wise Careers CRM on mobile.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
        <div className="bg-white p-2 rounded-lg shrink-0 shadow-inner">
          <img
            src={qrCodeUrl}
            alt="CRM Mobile QR Code"
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-white">Direct Shortcut:</p>
          <div className="bg-black/30 px-2.5 py-1.5 rounded font-mono text-indigo-300 text-[11px] truncate max-w-[170px]">
            thinkwisecareers.com/crm
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="w-full text-xs h-7 bg-white text-indigo-950 hover:bg-indigo-50"
            onClick={copyShortcut}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-green-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
