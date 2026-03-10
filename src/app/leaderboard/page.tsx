import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const leaderboardData = [
  { rank: 1, name: 'CardMaster_AE', score: 12450, trades: 342, badge: 'Diamond', emoji: '💎' },
  { rank: 2, name: 'RarityVault', score: 9870, trades: 256, badge: 'Diamond', emoji: '💎' },
  { rank: 3, name: 'PokeFanatic92', score: 7230, trades: 189, badge: 'Gold', emoji: '🥇' },
  { rank: 4, name: 'OnePieceKing', score: 5640, trades: 147, badge: 'Gold', emoji: '🥇' },
  { rank: 5, name: 'TCGCollector', score: 4210, trades: 98, badge: 'Silver', emoji: '🥈' },
  { rank: 6, name: 'GradeHunter', score: 3890, trades: 87, badge: 'Silver', emoji: '🥈' },
  { rank: 7, name: 'MintCondition', score: 2950, trades: 72, badge: 'Silver', emoji: '🥈' },
  { rank: 8, name: 'PackRipper', score: 2100, trades: 54, badge: 'Sprout', emoji: '🌱' },
  { rank: 9, name: 'FigureKing', score: 1870, trades: 43, badge: 'Sprout', emoji: '🌱' },
  { rank: 10, name: 'NewCollector', score: 950, trades: 21, badge: 'Sprout', emoji: '🌱' },
];

function getRankDisplay(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
}

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Top collectors and traders on RariBox
        </p>
      </div>

      {/* Top 3 cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {leaderboardData.slice(0, 3).map((user) => (
          <Card key={user.rank} className={user.rank === 1 ? 'border-primary/30 bg-primary/5' : ''}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{getRankDisplay(user.rank)}</div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-2xl font-bold text-primary mt-1">{user.score.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{user.trades} trades</p>
              <Badge className="mt-3 bg-primary/10 text-primary">
                {user.emoji} {user.badge}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Trades</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell className="font-medium">{getRankDisplay(user.rank)}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {user.emoji} {user.badge}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{user.trades}</TableCell>
                  <TableCell className="text-right font-bold">{user.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
