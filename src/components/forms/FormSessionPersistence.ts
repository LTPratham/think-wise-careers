import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * Custom hook to persist form state to sessionStorage.
 * This ensures users don't lose data if they accidentally navigate away.
 * No PII leaves the browser until final submit.
 */
export function useFormSessionPersistence<T extends Record<string, any>>(
  formKey: string,
  form: UseFormReturn<T>
) {
  // Restore form state on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem(formKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Safely reset form with saved values, keeping pristine state
        form.reset(parsed, { keepDefaultValues: true });
      } catch (error) {
        console.error("Failed to parse saved form data", error);
      }
    }
  }, [form, formKey]);

  // Save form state on changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      sessionStorage.setItem(formKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form, formKey]);

  // Provide a method to clear the session storage on successful submit
  const clearSession = () => {
    sessionStorage.removeItem(formKey);
  };

  return { clearSession };
}
