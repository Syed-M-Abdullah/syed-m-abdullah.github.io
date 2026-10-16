import { site } from "@/data/site";

/**
 * WhatsApp number in international format, digits only (no "+" or spaces).
 * Single source of truth: `site.whatsapp` in src/data/site.ts — change it there.
 */
export const WHATSAPP_NUMBER = site.whatsapp;

export const WHATSAPP_MESSAGE =
  "Hello Abdullah, I came across your portfolio and I'm interested in discussing an AI automation / software project. Could we connect to talk about my requirements?";

export const whatsappLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
