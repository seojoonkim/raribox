'use client';

import { updateOrderStatus } from '../actions';
import { toast } from 'sonner';
import { useTransition } from 'react';

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'];

export default function OrderStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [pending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      try {
        await updateOrderStatus(id, newStatus);
        toast.success(`Order ${newStatus}`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed');
      }
    });
  };

  return (
    <select
      defaultValue={currentStatus}
      disabled={pending}
      onChange={handleChange}
      className="rounded-md border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
