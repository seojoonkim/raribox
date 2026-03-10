'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePriceHistory } from '@/lib/mock-data';
import { formatPrice } from '@/lib/constants';

interface PriceChartProps {
  basePrice: number;
}

type Period = '30d' | '90d' | '1y';

export function PriceChart({ basePrice }: PriceChartProps) {
  const [period, setPeriod] = useState<Period>('90d');

  const data = useMemo(() => {
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 365;
    return generatePriceHistory(basePrice, days).map((p) => ({
      date: new Date(p.recorded_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      price: p.price,
    }));
  }, [basePrice, period]);

  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));
  const avgPrice = data.reduce((s, d) => s + d.price, 0) / data.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Price History</CardTitle>
          <div className="flex gap-1">
            {(['30d', '90d', '1y'] as Period[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setPeriod(p)}
              >
                {p === '1y' ? '1Y' : p.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
                interval={Math.floor(data.length / 5)}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
                domain={[minPrice * 0.9, maxPrice * 1.1]}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [formatPrice(value as number), 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex gap-6 text-xs text-muted-foreground">
          <span>Low: <span className="font-medium text-foreground">{formatPrice(minPrice)}</span></span>
          <span>Avg: <span className="font-medium text-foreground">{formatPrice(avgPrice)}</span></span>
          <span>High: <span className="font-medium text-foreground">{formatPrice(maxPrice)}</span></span>
        </div>
      </CardContent>
    </Card>
  );
}
