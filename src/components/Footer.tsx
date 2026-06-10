import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CONTACT_EMAIL, CONTACT_PHONE, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
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
                    className="text-sm text-cream/80 transition-colors hover:text-gold"
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
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-gold"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-gold"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/20 pt-6 text-center text-xs text-cream/60">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
