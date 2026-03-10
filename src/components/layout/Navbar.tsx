'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  MenuIcon, UserIcon, ShoppingCartIcon, HeartIcon,
  PackageIcon, BellIcon,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/lib/store';

const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: 'Events', href: '/events' },
  { label: 'Collectibles', href: '/browse' },
  { label: 'Packs', href: '/packs' },
  { label: 'Grading', href: '/grading' },
  { label: 'Leaderboard', href: '/leaderboard' },
];

export function Navbar() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  const isActive = (href: string) => {
    if (href.startsWith('http')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0F1320]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground" />}
              >
                <MenuIcon className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-[#0F1320] border-white/[0.06]">
                <SheetTitle>
                  <Image src="/logo.webp" alt="RariBox" width={120} height={34} className="h-7 w-auto object-contain invert" />
                </SheetTitle>
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-white/[0.06] text-foreground'
                          : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-3 border-t border-white/[0.06]" />
                  <Link href="/auth/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-colors">
                    Sign Up
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.webp"
                alt="RariBox"
                width={140}
                height={40}
                className="h-8 w-auto object-contain invert"
                priority
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-1">
              {/* Wishlist */}
              <Link href="/account/wishlist">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <HeartIcon className="h-4 w-4" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <ShoppingCartIcon className="h-4 w-4" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] bg-primary text-white">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" />}
                >
                  <UserIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#131929] border-white/[0.08]">
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
                  <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium border-white/[0.1] text-foreground hover:bg-white/[0.04]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="h-9 px-4 text-sm font-medium bg-primary hover:bg-indigo-500 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-navigation */}
      <nav className="border-b border-white/[0.06] bg-[#0F1320]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16">
          <div className="hidden md:flex items-center gap-1 h-11">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-foreground after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
