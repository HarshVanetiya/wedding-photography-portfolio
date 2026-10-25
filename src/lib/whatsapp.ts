import { site } from "@/config/site";

/** wa.me link that opens a chat with the studio, message pre-filled. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enquiry about one service, e.g. "Pre-Wedding Shoots". */
export function serviceEnquiryUrl(service: string) {
  return whatsappUrl(site.contact.messages.service.replace("{service}", service));
}
