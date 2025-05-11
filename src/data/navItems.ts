
import { NavItem } from "@/types/navbar";

export const getNavItems = (): NavItem[] => {
  return [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/#testimonials" },
  ];
};
