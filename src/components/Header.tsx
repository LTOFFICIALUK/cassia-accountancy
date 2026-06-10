"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/constants";

const HEADER_NAV_LINKS = NAV_LINKS.filter((link) => link.href !== "/contact");

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggleMenu();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sage/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo variant="header" />

        <nav
          className="hidden items-center xl:flex"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-1">
            {HEADER_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "bg-sage/10 text-sage"
                      : "text-charcoal hover:bg-sage/5 hover:text-sage"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="ml-5 shrink-0 rounded-md bg-gold px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-gold-light"
          >
            Book a Call
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-sage transition-colors hover:bg-sage/10 xl:hidden"
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-sage/10 bg-cream px-4 py-4 xl:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleCloseMenu}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-sage/10 text-sage"
                      : "text-charcoal hover:bg-sage/5 hover:text-sage"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 border-t border-sage/10 pt-3">
              <Link
                href="/contact"
                onClick={handleCloseMenu}
                className="block rounded-md bg-gold px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gold-light"
              >
                Book a Call
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
