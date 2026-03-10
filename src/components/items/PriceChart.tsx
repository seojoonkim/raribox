'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePriceHistory } from '@/lib/mock-data';
import { formatPrice } from '@/lib/constants';
import { TrendingUpIcon } from '@/components/ui/icons';

interface PriceChartProps {
  basePrice: number;
}

type Period = '7d' | '30d' | '90d' | '1y';

export function PriceChart({ basePrice }: PriceChartProps) {
  const [period, setPeriod] = useState<Period>('90d');

  const data = useMemo(() => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 90 : 365;
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
  const lastPrice = data[data.length - 1]?.price ?? basePrice;

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            Price History
          </CardTitle>
          <div className="flex gap-1 bg-rari-elevated rounded-lg p-0.5">
            {(['7d', '30d', '90d', '1y'] as Period[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'default' : 'ghost'}
                size="sm"
                className={`h-7 text-xs px-3 ${period === p ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setPeriod(p)}
              >
                {p === '1y' ? '1Y' : p.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                stroke="rgba(255,255,255,0.2)"
                interval={Math.floor(data.length / 5)}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                stroke="rgba(255,255,255,0.2)"
                domain={[minPrice * 0.9, maxPrice * 1.1]}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#131929',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [formatPrice(value as number), 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="rounded-lg bg-rari-elevated p-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Last Sale</p>
            <p className="font-bold text-sm">{formatPrice(lastPrice)}</p>
          </div>
          <div className="rounded-lg bg-rari-elevated p-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Low</p>
            <p className="font-bold text-sm text-rari-success">{formatPrice(minPrice)}</p>
          </div>
          <div className="rounded-lg bg-rari-elevated p-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Average</p>
            <p className="font-bold text-sm">{formatPrice(avgPrice)}</p>
          </div>
          <div className="rounded-lg bg-rari-elevated p-2.5 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">High</p>
            <p className="font-bold text-sm text-rari-warning">{formatPrice(maxPrice)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
