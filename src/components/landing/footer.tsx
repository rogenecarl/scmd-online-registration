"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  navigation: {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "#features" },
      { label: "Login", href: "/login" },
    ],
  },
  forPresidents: {
    title: "For Church Presidents",
    links: [
      { label: "Register Delegates", href: "/login" },
      { label: "View Events", href: "/login" },
      { label: "Track Registrations", href: "/login" },
    ],
  },
  forAdmins: {
    title: "For Administrators",
    links: [
      { label: "Manage Events", href: "/login" },
      { label: "Review Registrations", href: "/login" },
      { label: "Generate Reports", href: "/login" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Admin", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <Image src={"/logo.webp"} alt="Logo" width={30} height={20} priority />
                </div>
                <span className="text-lg font-semibold tracking-tight">
                  SCMD Events
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Online registration portal for SCMD church events. Streamlining
                delegate management and event coordination.
              </p>
            </div>

            {/* Link Columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SCMD Online Registration. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            South Central Mindanao District
          </p>
        </div>
      </div>
    </footer>
  );
}
