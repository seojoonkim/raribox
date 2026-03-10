'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PackageIcon, HeartIcon, LayersIcon, BellIcon, SettingsIcon, UserIcon } from '@/components/ui/icons';

const navItems = [
  { href: '/account/orders', label: 'Orders', icon: PackageIcon },
  { href: '/account/wishlist', label: 'Wishlist', icon: HeartIcon },
  { href: '/account/collection', label: 'Collection', icon: LayersIcon },
  { href: '/account/notifications', label: 'Notifications', icon: BellIcon },
  { href: '/account/settings', label: 'Settings', icon: SettingsIcon },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UserIcon className="h-6 w-6" /> My Account
      </h1>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-48 shrink-0">
          <nav className="sticky top-24 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-gold/10 text-gold font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden w-full">
          <div className="flex gap-1 overflow-x-auto pb-4 mb-4 border-b border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${
                    active ? 'bg-gold/10 text-gold font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          {children}
        </div>

        {/* Desktop content */}
        <div className="hidden md:block flex-1">{children}</div>
      </div>
    </div>
  );
}
