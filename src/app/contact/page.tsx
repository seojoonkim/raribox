'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPinIcon, MailIcon, ClockIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const storePhotos = [
  { src: 'https://placehold.co/600x400/131929/6366F1?text=RariBox+Store', alt: 'RariBox Store' },
  { src: 'https://placehold.co/600x400/131929/6366F1?text=Card+Collections', alt: 'Card Collections' },
  { src: 'https://placehold.co/600x400/131929/6366F1?text=Grading+Station', alt: 'Grading Station' },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Contact form submitted:', { name, email, subject, message });
    setTimeout(() => {
      toast.success('Message sent!', { description: 'We\'ll get back to you within 24 hours.' });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <section className="border-b border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-8">
          <h1 className="text-2xl font-bold">Contact</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visit our store, send us a message, or connect on social media
          </p>
        </div>
      </section>

      {/* Address + Map */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Location</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-1 pl-10">
                <p className="text-foreground font-medium">Archive Stop at RariBox</p>
                <p>Shop 4, Times Square Center</p>
                <p>Sheikh Zayed Road, Al Quoz</p>
                <p>Dubai, United Arab Emirates</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MailIcon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Contact</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-2 pl-10">
                <p>Email: <a href="mailto:hello@raribox.com" className="text-foreground hover:text-primary transition-colors">hello@raribox.com</a></p>
                <p>Instagram: <a href="https://instagram.com/raribox" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">@raribox</a></p>
                <p>WhatsApp: <span className="text-foreground">+971 XX XXX XXXX</span></p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ClockIcon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold">Opening Hours</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-1 pl-10">
                <div className="flex justify-between max-w-xs">
                  <span>Mon – Sat</span>
                  <span className="text-foreground">10:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span>Sunday</span>
                  <span className="text-foreground">12:00 PM – 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Google Maps */}
          <div className="rounded-xl overflow-hidden border border-rari-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6!2d55.2176!3d25.1145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d5a2a2a2a3%3A0x1!2sTimes+Square+Center+Dubai!5e0!3m2!1sen!2sae!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RariBox Store Location"
            />
          </div>
        </div>
      </section>

      {/* Store Photos */}
      <section className="bg-rari-elevated border-y border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
          <h2 className="text-2xl font-bold mb-6">Visit Our Store</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {storePhotos.map((photo) => (
              <div key={photo.alt} className="relative aspect-[3/2] rounded-xl overflow-hidden border border-rari-border">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">Send us a Message</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Have a question or need help? Fill out the form and we&apos;ll get back to you within 24 hours.
          </p>
          <Card className="rounded-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm">Subject</Label>
                  <Select value={subject} onValueChange={(v) => setSubject(v ?? '')}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="buying">Buying</SelectItem>
                      <SelectItem value="selling">Selling</SelectItem>
                      <SelectItem value="grading">Grading</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm">Message</Label>
                  <textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px] resize-y"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-indigo-500 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
