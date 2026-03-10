'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function VendorSettings() {
  const [settings, setSettings] = useState({
    shopName: 'CardMaster Dubai',
    description: 'Premium TCG cards from the heart of Dubai.',
    slug: 'cardmaster-dubai',
  });

  const handleSave = () => {
    toast.success('Shop settings updated');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold">Shop Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Shop Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Shop Name</Label>
            <Input
              value={settings.shopName}
              onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
            />
          </div>
          <div>
            <Label>Shop URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">raribox.vercel.app/vendor/</span>
              <Input
                value={settings.slug}
                onChange={(e) => setSettings({ ...settings, slug: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div>
            <Label>Banner</Label>
            <Input type="file" accept="image/*" />
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-indigo-500 text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Shipping Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Default Shipping Fee ($)</Label>
              <Input type="number" step="0.01" defaultValue="5.99" />
            </div>
            <div>
              <Label>Free Shipping Above ($)</Label>
              <Input type="number" step="0.01" defaultValue="100.00" />
            </div>
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-indigo-500 text-white">
            Save Shipping Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
