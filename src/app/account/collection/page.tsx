'use client';

import { useState } from 'react';
import { Layers, Plus, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { formatPrice, CONDITIONS } from '@/lib/constants';

interface CollectionItem {
  id: string;
  title: string;
  condition: string;
  gradeScore: string;
  estValue: number;
  note: string;
}

export default function CollectionPage() {
  const [items, setItems] = useState<CollectionItem[]>([
    { id: '1', title: 'Charizard Base Set 1st Edition', condition: 'LP', gradeScore: '', estValue: 12000, note: 'Bought in 2019' },
    { id: '2', title: 'Pikachu Illustrator (Replica)', condition: 'NM', gradeScore: '', estValue: 250, note: 'Display piece' },
    { id: '3', title: 'Luffy Gear 5 Alternate Art', condition: 'NM', gradeScore: '9.5', estValue: 180, note: 'BGS graded' },
  ]);
  const [newItem, setNewItem] = useState({ title: '', condition: 'NM', gradeScore: '', estValue: '', note: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalValue = items.reduce((sum, i) => sum + i.estValue, 0);

  const handleAdd = () => {
    if (!newItem.title) return;
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        title: newItem.title,
        condition: newItem.condition,
        gradeScore: newItem.gradeScore,
        estValue: Number(newItem.estValue) || 0,
        note: newItem.note,
      },
    ]);
    setNewItem({ title: '', condition: 'NM', gradeScore: '', estValue: '', note: '' });
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">My Collection</h2>
          <p className="text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={<Button size="sm" className="bg-gold text-black hover:bg-gold/90" />}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Card or item name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Condition</Label>
                  <Select value={newItem.condition} onValueChange={(v: string | null) => setNewItem({ ...newItem, condition: v || 'NM' })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.value} — {c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grade Score</Label>
                  <Input
                    value={newItem.gradeScore}
                    onChange={(e) => setNewItem({ ...newItem, gradeScore: e.target.value })}
                    placeholder="e.g. 9.5"
                  />
                </div>
              </div>
              <div>
                <Label>Estimated Value ($)</Label>
                <Input
                  type="number"
                  value={newItem.estValue}
                  onChange={(e) => setNewItem({ ...newItem, estValue: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={newItem.note}
                  onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
                  placeholder="Any notes about this item"
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-gold text-black hover:bg-gold/90">
                Add to Collection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Total value card */}
      <Card className="mb-6 bg-gold/5 border-gold/20">
        <CardContent className="p-4 flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-gold" />
          <div>
            <p className="text-sm text-muted-foreground">Total Estimated Value</p>
            <p className="text-2xl font-bold text-gold">{formatPrice(totalValue)}</p>
          </div>
        </CardContent>
      </Card>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No items in your collection</h3>
          <p className="text-sm text-muted-foreground">Start tracking your collectibles.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-secondary/50 flex items-center justify-center text-xl shrink-0">
                  <Layers className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px]">{item.condition}</Badge>
                    {item.gradeScore && <Badge className="bg-gold text-black text-[10px] border-none">{item.gradeScore}</Badge>}
                  </div>
                  {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(item.estValue)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
