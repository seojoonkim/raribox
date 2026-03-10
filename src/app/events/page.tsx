import { CalendarIcon, TrophyIcon, PackageIcon, SearchIcon } from '@/components/ui/icons';
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

function getTagIcon(tag: string) {
  switch (tag) {
    case 'Tournament':
      return <TrophyIcon className="h-8 w-8 text-rari-accent-light" />;
    case 'Release':
      return <PackageIcon className="h-8 w-8 text-rari-accent-light" />;
    case 'Grading':
      return <SearchIcon className="h-8 w-8 text-rari-accent-light" />;
    default:
      return <CalendarIcon className="h-8 w-8 text-rari-accent-light" />;
  }
}

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
          <Card key={event.id} className="overflow-hidden rounded-xl bg-rari-card border-rari-border hover:border-rari-accent/30 hover:shadow-lg hover:shadow-rari-accent/10 transition-all">
            <div className="h-40 bg-gradient-to-br from-rari-accent/20 to-rari-accent/5 flex items-center justify-center">
              {getTagIcon(event.tag)}
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rari-accent/10 text-indigo-300">
                  {event.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <p className="text-xs text-rari-muted">{event.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center py-12 border border-dashed border-rari-border rounded-xl">
        <p className="text-muted-foreground text-sm">More events coming soon</p>
      </div>
    </div>
  );
}
