'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, BarChart3Icon, SettingsIcon, StoreIcon } from '@/components/ui/icons';

const navItems = [
  { href: '/vendor-portal/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/vendor-portal/products', label: 'Products', icon: PackageIcon },
  { href: '/vendor-portal/orders', label: 'Orders', icon: ShoppingCartIcon },
  { href: '/vendor-portal/analytics', label: 'Analytics', icon: BarChart3Icon },
  { href: '/vendor-portal/settings', label: 'Settings', icon: SettingsIcon },
];

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <StoreIcon className="h-6 w-6 text-gold" /> Vendor Portal
      </h1>

      <div className="flex gap-8">
        <aside className="hidden md:block w-52 shrink-0">
          <nav className="sticky top-24 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
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
              const active = pathname.startsWith(item.href);
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

        <div className="hidden md:block flex-1">{children}</div>
      </div>
    </div>
  );
}
