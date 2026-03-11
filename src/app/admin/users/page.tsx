import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserActions from './user-actions';

interface DisplayUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  created_at: string;
}

async function getUsers(): Promise<DisplayUser[]> {
  const supabase = createAdminClient();

  // Try public.users first
  const { data: publicUsers, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error && publicUsers && publicUsers.length > 0) {
    return publicUsers.map((u) => ({
      id: u.id,
      email: u.email ?? '',
      name: u.name ?? u.email ?? '',
      role: u.role ?? 'buyer',
      status: u.status ?? 'active',
      created_at: u.created_at,
    }));
  }

  // Fallback to auth.users
  const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 100 });
  if (!authData?.users) return [];

  return authData.users.map((u) => ({
    id: u.id,
    email: u.email ?? '',
    name: (u.user_metadata?.name as string) ?? u.email ?? '',
    role: (u.user_metadata?.role as string) ?? 'buyer',
    status: (u as unknown as { banned_at?: string }).banned_at ? 'banned' : 'active',
    created_at: u.created_at,
  }));
}

function roleBadge(role: string) {
  const colors: Record<string, string> = {
    admin: 'bg-primary/10 text-primary',
    vendor: 'bg-blue-500/10 text-blue-500',
    buyer: 'bg-secondary text-muted-foreground',
  };
  return <Badge className={colors[role] || ''}>{role}</Badge>;
}

export default async function AdminUsers() {
  const users = await getUsers();

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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
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
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <UserActions id={user.id} role={user.role} status={user.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
