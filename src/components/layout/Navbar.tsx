'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  MenuIcon, XIcon, UserIcon, ShoppingCartIcon, HeartIcon,
  PackageIcon, BellIcon, ChevronDownIcon, SunIcon, MoonIcon,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { useCartStore } from '@/lib/store';

const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: 'Events', href: '/events' },
  { label: 'Browse', href: '/browse' },
  { label: 'Packs', href: '/packs' },
  { label: 'Grading', href: '/grading' },
  { label: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const itemCount = useCartStore((s) => s.itemCount());

  const isActive = (href: string) => {
    if (href.startsWith('http')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="md:hidden" />}
              >
                <MenuIcon className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetTitle className="text-lg font-bold">
                  <span className="text-gold">Rari</span>Box
                </SheetTitle>
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) =>
                    item.external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                      >
                        {item.label} ↗
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                  <div className="my-3 border-t border-border" />
                  <Link href="/auth/login" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
                    Sign Up
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-gold">Rari</span>
                <span>Box</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              </Button>

              {/* Wishlist */}
              <Link href="/account/wishlist">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <HeartIcon className="h-4 w-4" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <ShoppingCartIcon className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] bg-gold text-black">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" className="h-9 w-9" />}
                >
                  <UserIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem render={<Link href="/auth/login" />}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/auth/register" />}>
                    Sign Up
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/account/orders" />}>
                    <PackageIcon className="mr-2 h-4 w-4" />Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/account/wishlist" />}>
                    <HeartIcon className="mr-2 h-4 w-4" />Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/account/notifications" />}>
                    <BellIcon className="mr-2 h-4 w-4" />Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href="/vendor-portal/dashboard" />}>
                    Vendor Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/admin/dashboard" />}>
                    Admin Panel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sign In / Sign Up buttons - desktop */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="h-9 px-4 text-sm font-medium bg-gold text-black hover:bg-gold/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-navigation */}
      <nav className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16">
          <div className="hidden md:flex items-center gap-1 h-12">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-foreground after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-gold after:rounded-full'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
