'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2Icon, XCircleIcon, Trash2Icon, EditIcon } from '@/components/ui/icons';
import { toggleItemStatus, deleteItem } from '../actions';
import { toast } from 'sonner';
import { useTransition } from 'react';

export default function ProductActions({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const newStatus = status === 'active' ? 'inactive' : 'active';
        await toggleItemStatus(id, newStatus);
        toast.success('Product status updated');
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed');
      }
    });
  };

  const handleDelete = () => {
    if (!confirm('Delete this product?')) return;
    startTransition(async () => {
      try {
        await deleteItem(id);
        toast.success('Product deleted');
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed');
      }
    });
  };

  return (
    <div className="flex justify-end gap-1">
      <Link href={`/admin/products/${id}/edit`}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <EditIcon className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${status === 'active' ? 'text-red-500' : 'text-green-500'}`}
        disabled={pending}
        onClick={handleToggle}
      >
        {status === 'active' ? <XCircleIcon className="h-4 w-4" /> : <CheckCircle2Icon className="h-4 w-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-red-500"
        disabled={pending}
        onClick={handleDelete}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
