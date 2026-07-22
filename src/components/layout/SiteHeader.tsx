"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/layout/Container";
import { navigation, site } from "@/config/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-serif text-lg tracking-tight text-foreground">
              {site.name}
            </span>
            <span className="hidden text-xs tracking-wide text-muted sm:inline">
              {site.tagline}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full border border-line px-3 py-1.5 text-sm text-foreground md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface md:hidden">
          <Container width="wide">
            <nav aria-label="Main, mobile" className="flex flex-col py-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-3 ${
                    isActive(item.href) ? "text-accent" : "text-foreground"
                  }`}
                >
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {item.description}
                  </span>
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
