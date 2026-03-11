'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2Icon, XCircleIcon, BanIcon } from '@/components/ui/icons';
import { approveVendor, suspendVendor, banVendor } from '../actions';
import { toast } from 'sonner';
import { useTransition } from 'react';

export default function VendorActions({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  const handle = (action: (id: string) => Promise<void>, label: string) => {
    startTransition(async () => {
      try {
        await action(id);
        toast.success(`Vendor ${label}`);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Action failed');
      }
    });
  };

  return (
    <div className="flex justify-end gap-1">
      {status === 'pending' && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-green-500"
            disabled={pending}
            onClick={() => handle(approveVendor, 'approved')}
          >
            <CheckCircle2Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            disabled={pending}
            onClick={() => handle(suspendVendor, 'rejected')}
          >
            <XCircleIcon className="h-4 w-4" />
          </Button>
        </>
      )}
      {status === 'active' && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500"
          disabled={pending}
          onClick={() => handle(suspendVendor, 'suspended')}
        >
          <BanIcon className="h-4 w-4" />
        </Button>
      )}
      {status === 'suspended' && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-green-500"
            disabled={pending}
            onClick={() => handle(approveVendor, 'reactivated')}
          >
            <CheckCircle2Icon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500"
            disabled={pending}
            onClick={() => handle(banVendor, 'banned')}
          >
            <BanIcon className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
