import { forwardRef } from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = forwardRef<HTMLAnchorElement>(function WhatsAppButton(_, ref) {
  return (
    <a
      ref={ref}
      href="https://whatsss.link/14oavw"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/20 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 active:scale-95"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
});
