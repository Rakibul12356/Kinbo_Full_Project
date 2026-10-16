"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Search, X, type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Page not built yet: shown disabled with a "Soon" chip. */
  soon?: boolean;
  badge?: number;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

interface DashboardShellProps {
  brandLabel: string;
  navGroups: NavGroup[];
  title: string;
  description?: string;
  user: { name: string; email: string; avatar?: string; tag?: React.ReactNode };
  onLogout: () => void;
  /** Rendered on the right of the page title row. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

function Sidebar({
  brandLabel,
  navGroups,
  pathname,
  onNavigate,
}: {
  brandLabel: string;
  navGroups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-[#E5E7EB] px-5">
        <Link href="/" aria-label="Kinbo home">
          <Image src="/images/logo-trimmed.png" alt="Kinbo" width={131} height={36} className="h-7 w-auto" style={{ width: "auto" }} />
        </Link>
        <span className="rounded-md bg-[#FF6B00]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">
          {brandLabel}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6" aria-label={`${brandLabel} navigation`}>
        {navGroups.map((group, gi) => (
          <div key={group.title ?? gi}>
            {group.title && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, soon, badge }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                const base = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition";
                if (soon) {
                  return (
                    <li key={href}>
                      <span className={`${base} cursor-not-allowed text-zinc-400`} aria-disabled>
                        <Icon className="h-4.5 w-4.5" />
                        <span className="flex-1">{label}</span>
                        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                          Soon
                        </span>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`${base} ${
                        active
                          ? "bg-[#082F6B] text-white shadow-sm"
                          : "text-zinc-600 hover:bg-[#F3F7FC] hover:text-[#082F6B]"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span className="flex-1">{label}</span>
                      {!!badge && (
                        <span
                          className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                            active ? "bg-white text-[#082F6B]" : "bg-[#FF6B00] text-white"
                          }`}
                        >
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

function UserMenu({ user, onLogout }: Pick<DashboardShellProps, "user" | "onLogout">) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 rounded-xl p-1.5 pr-2 transition hover:bg-zinc-100 cursor-pointer"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#082F6B] text-xs font-bold text-white">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </span>
        <span className="hidden md:block text-left">
          <span className="block text-sm font-semibold leading-tight text-[#1F2937]">{user.name}</span>
          <span className="block text-[11px] leading-tight text-zinc-500">{user.email}</span>
        </span>
        <ChevronDown className="hidden md:block h-4 w-4 text-zinc-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-xl"
        >
          <div className="border-b border-[#E5E7EB] px-4 py-3">
            <p className="text-sm font-semibold text-[#1F2937]">{user.name}</p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
            {user.tag && <div className="mt-2">{user.tag}</div>}
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function DashboardShell({
  brandLabel,
  navGroups,
  title,
  description,
  user,
  onLogout,
  actions,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex-1 bg-[#F3F7FC]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#E5E7EB] bg-white lg:block">
        <Sidebar brandLabel={brandLabel} navGroups={navGroups} pathname={pathname} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar
              brandLabel={brandLabel}
              navGroups={navGroups}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#E5E7EB] bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F3F7FC] py-2 pl-10 pr-4 text-sm focus:border-[#082F6B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#082F6B]/20"
            />
          </div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B00] ring-2 ring-white" />
            </button>
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937]">{title}</h1>
              {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
