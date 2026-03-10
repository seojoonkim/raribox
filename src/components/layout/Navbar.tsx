'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search, ShoppingCart, User, Menu, X, Sun, Moon,
  Heart, Package, Bell, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import { useCartStore } from '@/lib/store';
import { FRANCHISES } from '@/lib/constants';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = useCartStore((s) => s.itemCount());

  const navLinks = [
    ...FRANCHISES.slice(0, 8).map((f) => ({
      label: f.name,
      href: `/browse/${f.slug}`,
    })),
    { label: 'More', href: '/browse' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="lg:hidden" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle className="text-lg font-bold text-gold">RariBox</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-border" />
                <Link href="/browse?sale=true" className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-accent">
                  Sale 🔥
                </Link>
                <div className="my-2 border-t border-border" />
                <Link href="/auth/login" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  Sign In
                </Link>
                <Link href="/auth/register" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent">
                  Create Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-gold">Rari</span>
              <span>Box</span>
            </span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden flex-1 max-w-xl lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cards, figures, collectibles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Link href="/account/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-gold text-black">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <User className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem render={<Link href="/auth/login" />}>
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/auth/register" />}>
                  Create Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/account/orders" />}>
                  <Package className="mr-2 h-4 w-4" />Orders
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/account/wishlist" />}>
                  <Heart className="mr-2 h-4 w-4" />Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/account/collection" />}>
                  <ChevronDown className="mr-2 h-4 w-4" />Collection
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/account/notifications" />}>
                  <Bell className="mr-2 h-4 w-4" />Notifications
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
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="pb-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cards, figures, collectibles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Category nav - desktop */}
        <nav className="hidden lg:flex items-center gap-1 pb-2 overflow-x-auto">
          {FRANCHISES.slice(0, 8).map((f) => (
            <Link
              key={f.slug}
              href={`/browse/${f.slug}`}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {f.icon} {f.name}
            </Link>
          ))}
          <Link
            href="/browse?sale=true"
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            Sale 🔥
          </Link>
          <Link
            href="/browse"
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Browse All
          </Link>
        </nav>
      </div>
    </header>
  );
}
