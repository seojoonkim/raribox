import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-gold">Rari</span>Box
            </h3>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for rare collectibles. Trading cards, figures, and more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/browse" className="hover:text-foreground transition-colors">Browse All</Link></li>
              <li><Link href="/browse/pokemon" className="hover:text-foreground transition-colors">Pokemon</Link></li>
              <li><Link href="/browse/one-piece" className="hover:text-foreground transition-colors">One Piece</Link></li>
              <li><Link href="/browse?sale=true" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/auth/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              <li><Link href="/auth/register" className="hover:text-foreground transition-colors">Register</Link></li>
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Orders</Link></li>
              <li><Link href="/account/collection" className="hover:text-foreground transition-colors">My Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Sell</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/vendor-portal/dashboard" className="hover:text-foreground transition-colors">Vendor Portal</Link></li>
              <li><Link href="/auth/register" className="hover:text-foreground transition-colors">Become a Seller</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RariBox. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
