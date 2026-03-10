import { Card, CardContent } from '@/components/ui/card';

const upcomingEvents = [
  {
    id: '1',
    title: 'Pokemon TCG Tournament',
    date: '2026-04-15',
    location: 'Dubai Mall, UAE',
    description: 'Compete in the regional Pokemon Trading Card Game tournament. Prizes include exclusive promo cards.',
    tag: 'Tournament',
  },
  {
    id: '2',
    title: 'One Piece Card Release Party',
    date: '2026-04-20',
    location: 'Online',
    description: 'Celebrate the latest One Piece booster set release with exclusive pack openings and giveaways.',
    tag: 'Release',
  },
  {
    id: '3',
    title: 'Grading Submission Drop-off',
    date: '2026-05-01',
    location: 'RariBox HQ, Singapore',
    description: 'Bring your cards for bulk grading submission. Special discounted rates for RariBox members.',
    tag: 'Grading',
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upcoming tournaments, releases, and community meetups
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-4xl opacity-60">
                {event.tag === 'Tournament' ? '🏆' : event.tag === 'Release' ? '📦' : '🔍'}
              </span>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {event.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <p className="text-xs text-muted-foreground">{event.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center py-12 border border-dashed border-border rounded-lg">
        <p className="text-muted-foreground text-sm">More events coming soon</p>
      </div>
    </div>
  );
}
