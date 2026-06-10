import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CONTACT_EMAIL, CONTACT_PHONE, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sage/10 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo variant="header" />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
              Helping small business owners stay organised, compliant and ready
              for Making Tax Digital.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Get in Touch
            </p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-sage"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-sage"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-sage/10 pt-6 text-center text-xs text-charcoal-light">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
