'use client';

import { useState } from 'react';
import { BanIcon, CheckCircle2Icon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: '1', name: 'Ahmed K.', email: 'ahmed@example.com', role: 'buyer', status: 'active', joined: '2024-01-15' },
    { id: '2', name: 'Sarah M.', email: 'sarah@example.com', role: 'buyer', status: 'active', joined: '2024-02-20' },
    { id: '3', name: 'CardMaster Admin', email: 'card@master.ae', role: 'vendor', status: 'active', joined: '2024-01-10' },
    { id: '4', name: 'Rarity Vault', email: 'info@rarityvault.com', role: 'vendor', status: 'active', joined: '2023-06-20' },
    { id: '5', name: 'System Admin', email: 'admin@raribox.com', role: 'admin', status: 'active', joined: '2023-01-01' },
  ]);

  const toggleStatus = (id: string) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    ));
    toast.success('User status updated');
  };

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-primary/10 text-primary',
      vendor: 'bg-blue-500/10 text-blue-500',
      buyer: 'bg-secondary text-muted-foreground',
    };
    return <Badge className={colors[role] || ''}>{role}</Badge>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">User Management ({users.length})</h2>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </TableCell>
                  <TableCell>{roleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge className={user.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.joined}</TableCell>
                  <TableCell className="text-right">
                    {user.role !== 'admin' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${user.status === 'active' ? 'text-red-500' : 'text-green-500'}`}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === 'active' ? <BanIcon className="h-4 w-4" /> : <CheckCircle2Icon className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
