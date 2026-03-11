'use client';

import { Button } from '@/components/ui/button';
import { BanIcon, CheckCircle2Icon } from '@/components/ui/icons';
import { banUser, unbanUser } from '../actions';
import { toast } from 'sonner';
import { useTransition } from 'react';

export default function UserActions({ id, role, status }: { id: string; role: string; status: string }) {
  const [pending, startTransition] = useTransition();

  if (role === 'admin') return null;

  const handleToggle = () => {
    startTransition(async () => {
      try {
        if (status === 'active') {
          await banUser(id);
          toast.success('User banned');
        } else {
          await unbanUser(id);
          toast.success('User unbanned');
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed');
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${status === 'active' ? 'text-red-500' : 'text-green-500'}`}
      disabled={pending}
      onClick={handleToggle}
    >
      {status === 'active' ? <BanIcon className="h-4 w-4" /> : <CheckCircle2Icon className="h-4 w-4" />}
    </Button>
  );
}
