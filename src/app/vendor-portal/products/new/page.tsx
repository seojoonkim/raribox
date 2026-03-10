'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadIcon, XIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CONDITIONS, FRANCHISES, LANGUAGES, GRADE_COMPANIES } from '@/lib/constants';
import { mockCategories } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function NewProductPage() {
  const router = useRouter();
  const [isGraded, setIsGraded] = useState(false);
  const [isSale, setIsSale] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product created!', { description: 'Your product has been listed.' });
    router.push('/vendor-portal/products');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input placeholder="e.g. Charizard VMAX Rainbow Rare" required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Describe your item..." rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Franchise</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {FRANCHISES.map((f) => (
                      <SelectItem key={f.slug} value={f.slug}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <UploadIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop images or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              <Input type="file" accept="image/*" multiple className="mt-4" />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pricing & Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price ($) *</Label>
                <Input type="number" step="0.01" placeholder="0.00" required />
              </div>
              <div>
                <Label>Compare at Price ($)</Label>
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock</Label>
                <Input type="number" defaultValue={1} min={0} />
              </div>
              <div>
                <Label>Currency</Label>
                <Select defaultValue="USD">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="AED">AED</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="sale" checked={isSale} onCheckedChange={(v) => setIsSale(!!v)} />
              <Label htmlFor="sale">On Sale</Label>
            </div>
            {isSale && (
              <div>
                <Label>Sale Price ($)</Label>
                <Input type="number" step="0.01" placeholder="0.00" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Condition</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.value} — {c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Language</Label>
                <Select defaultValue="EN">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Set Name</Label>
                <Input placeholder="e.g. Darkness Ablaze" />
              </div>
              <div>
                <Label>Card Number</Label>
                <Input placeholder="e.g. 074/073" />
              </div>
              <div>
                <Label>Year</Label>
                <Input type="number" placeholder="2024" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rarity</Label>
                <Input placeholder="e.g. Secret Rare" />
              </div>
              <div>
                <Label>Edition</Label>
                <Input placeholder="e.g. 1st Edition" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="graded" checked={isGraded} onCheckedChange={(v) => setIsGraded(!!v)} />
              <Label htmlFor="graded">This is a graded item</Label>
            </div>
            {isGraded && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Grade Company</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {GRADE_COMPANIES.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grade Score</Label>
                  <Input type="number" step="0.5" placeholder="10" />
                </div>
                <div>
                  <Label>Cert Number</Label>
                  <Input placeholder="12345678" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="bg-primary hover:bg-indigo-500 text-white font-semibold">
            Publish Product
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
