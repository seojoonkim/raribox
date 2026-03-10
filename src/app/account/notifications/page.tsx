import { BellIcon, PackageIcon, TagIcon, StarIcon } from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';

const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order Delivered',
    body: 'Your order RB-XYZ123-ABCD has been delivered.',
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    icon: PackageIcon,
  },
  {
    id: '2',
    type: 'sale',
    title: 'Flash Sale!',
    body: 'Pokemon cards are 20% off for the next 24 hours.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    icon: TagIcon,
  },
  {
    id: '3',
    type: 'review',
    title: 'Review Reminder',
    body: 'How was your Charizard VMAX? Leave a review!',
    is_read: true,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    icon: StarIcon,
  },
];

export default function NotificationsPage() {
  if (mockNotifications.length === 0) {
    return (
      <div className="text-center py-16">
        <BellIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold">No notifications</h2>
        <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="space-y-3">
        {mockNotifications.map((n) => {
          const Icon = n.icon;
          return (
            <Card key={n.id} className={`rounded-xl transition-all ${!n.is_read ? 'border-rari-accent/30 bg-rari-accent/5' : ''}`}>
              <CardContent className="p-4 flex gap-3">
                <div className="h-10 w-10 rounded-full bg-rari-elevated flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(n.created_at).toLocaleDateString()}
                  </p>
                </div>
                {!n.is_read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
