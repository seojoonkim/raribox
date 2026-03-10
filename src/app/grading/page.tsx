import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AwardIcon, ShieldIcon, TruckIcon, StarIcon, MapPinIcon,
  CheckCircle2Icon, GlobeIcon, LayersIcon, PackageIcon,
} from '@/components/ui/icons';

const whyChoose = [
  { icon: AwardIcon, title: "UAE's First", description: "Pioneer grading & authentication service in the GCC region, proudly Emirati-owned." },
  { icon: ShieldIcon, title: 'AI + Expert Graders', description: 'Hybrid approach combining AI analysis with professional human inspection for consistent results.' },
  { icon: TruckIcon, title: '15-Day Turnaround', description: 'Fast processing without international shipping delays. Drop off and pick up locally.' },
  { icon: StarIcon, title: '55 AED Flat Rate', description: 'Transparent, affordable pricing per card. No hidden fees or surprise charges.' },
];

const steps = [
  { step: 1, title: 'Drop Off', description: 'Bring your cards to Speedy Comics, Times Square Center, Dubai. No appointment needed.' },
  { step: 2, title: 'Grading', description: 'AI + expert inspection evaluates centering, corners, edges, and surface. Receive a grade 1–10 with a full report.' },
  { step: 3, title: 'Collect', description: 'Pick up your slabbed, certified card within 15 business days. Each card comes with a unique Certificate of Authentication.' },
];

const categories = [
  { icon: LayersIcon, name: 'Trading Cards', detail: 'Pokemon, One Piece, MTG, Yu-Gi-Oh, Sports' },
  { icon: PackageIcon, name: 'Funko Pop Figures', detail: 'Vinyl figures, exclusives, chase variants' },
  { icon: StarIcon, name: 'Comic Books', detail: 'Modern, vintage, signed issues' },
  { icon: AwardIcon, name: 'Signed Memorabilia', detail: 'Autographed cards, posters, collectibles' },
  { icon: ShieldIcon, name: 'Sealed Products', detail: 'Coming Soon', comingSoon: true },
];

const gradeScale = [
  { grade: '10', label: 'Gem Mint', description: 'Virtually perfect in every way' },
  { grade: '9', label: 'Mint', description: 'A superb condition card with only minor flaws' },
  { grade: '8', label: 'Near Mint–Mint', description: 'Very minor wear on corners or edges' },
  { grade: '7', label: 'Near Mint', description: 'Slight surface wear, minor corner wear' },
  { grade: '6', label: 'Excellent–Near Mint', description: 'Slight wear on two or more corners' },
  { grade: '5', label: 'Excellent', description: 'Minor rounding of corners, light scratching' },
  { grade: '4', label: 'Very Good–Excellent', description: 'Moderate wear, minor creasing' },
  { grade: '3', label: 'Very Good', description: 'Noticeable wear, some creasing' },
  { grade: '2', label: 'Good', description: 'Heavy wear, noticeable creasing' },
  { grade: '1', label: 'Poor', description: 'Severe damage, heavy creasing or staining' },
];

export default function GradingPage() {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0d1030] to-[#0A0D14] border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hit-logo.svg" alt="HiT GCC" className="h-12 mb-6" />
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                The GCC&apos;s Own<br />
                <span className="text-primary">Grading Authority</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
                Professional card grading & authentication — powered by HiT GCC, UAE&apos;s first Emirati-owned grading company.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2">
                  <span className="text-xl font-extrabold text-primary">55</span>
                  <span className="text-xs text-muted-foreground">AED / card</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2">
                  <span className="text-xl font-extrabold">15</span>
                  <span className="text-xs text-muted-foreground">business days</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2">
                  <span className="text-xl font-extrabold">1–10</span>
                  <span className="text-xs text-muted-foreground">grade scale</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="https://hitgrading.com/" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-indigo-500 text-white font-semibold px-6">
                    Submit Cards to HiT
                  </Button>
                </a>
                <a href="#how-to-submit">
                  <Button variant="outline" className="border-white/[0.1] text-foreground hover:bg-white/[0.04]">
                    How It Works
                  </Button>
                </a>
              </div>
            </div>
            {/* Dr. Rashed hero card */}
            <div className="md:w-[340px] shrink-0">
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-primary/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rashed-official.jpg"
                  alt="Dr. Rashed Al Farooq"
                  className="w-full object-cover"
                />
                <div className="bg-[#0F1320] p-4 border-t border-white/[0.06]">
                  <p className="font-bold text-sm">Dr. Rashed Al Farooq</p>
                  <p className="text-xs text-primary mt-0.5">Co-Founder & Chairman, Speedy Comics Group</p>
                  <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                    &ldquo;For the first time, collectors can access world-class grading within the region — efficiently, transparently, and proudly under Emirati leadership.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT HiT GCC ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Badge className="bg-rari-elevated text-muted-foreground border border-rari-border mb-4">About HiT GCC</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Holistic Inspection & Tagging</h2>
            <p className="text-muted-foreground leading-relaxed">
              HiT GCC is the UAE&apos;s first Emirati-owned collectibles grading and authentication company.
              Launched in May 2025 through a partnership between{' '}
              <span className="text-foreground font-medium">Speedy Comics Group</span> and{' '}
              <span className="text-foreground font-medium">Middle East Grading Alliance (MEGA)</span>,
              HiT brings world-class card certification to the GCC — without the delays and costs of overseas shipping.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Using a proprietary hybrid approach that combines AI-driven analysis with expert human graders,
              HiT delivers consistent, transparent grades on a standard 1–10 scale. Every graded item receives a unique
              Certificate of Authentication (CUA) verifiable online.
            </p>
          </div>
          {/* Speedy Comics bio card */}
          <Card className="bg-rari-card border-rari-border rounded-xl">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-base font-bold">Speedy Comics Group</p>
                <p className="text-sm text-primary mt-0.5">GCC&apos;s #1 Collectibles Destination</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From a family stall to the GCC&apos;s largest collectibles and pop-culture retail group —
                spanning comics, trading cards, figures, and live events.
              </p>
              <div className="pt-3 border-t border-rari-border space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Flagship store at Times Square Center, Dubai</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <StarIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Home to PopCon ME — GCC&apos;s biggest pop culture event</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <AwardIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">Trusted by collectors across the GCC since 2009</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── WHY CHOOSE HiT ───────────────────────────────── */}
      <section className="bg-rari-elevated border-y border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Why Choose HiT?</h2>
            <p className="text-muted-foreground mt-2">Professional grading, right here in the UAE</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center rounded-xl bg-rari-card border-rari-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW TO SUBMIT ────────────────────────────────── */}
      <section id="how-to-submit" className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">How to Submit</h2>
          <p className="text-muted-foreground mt-2">Three simple steps to get your cards graded locally</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[calc(50%+40px)] right-0 h-px bg-gradient-to-r from-rari-border to-transparent" />
              )}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg shrink-0">
                  {s.step}
                </span>
                <h3 className="font-semibold text-lg">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-[52px]">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT GETS GRADED ─────────────────────────────── */}
      <section className="bg-rari-elevated border-y border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">What Gets Graded</h2>
            <p className="text-muted-foreground mt-2">HiT grades a wide range of collectibles</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.name} className={`rounded-xl bg-rari-card border-rari-border transition-all ${cat.comingSoon ? 'opacity-60' : 'hover:border-primary/30'}`}>
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-rari-elevated flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.detail}</p>
                    {cat.comingSoon && (
                      <Badge className="mt-2 bg-rari-warning/10 text-amber-300 border border-rari-warning/20 text-[10px]">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <Card className="rounded-xl bg-gradient-to-r from-primary/5 to-rari-card border-primary/20">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <CheckCircle2Icon className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Certificate of Authentication</h2>
              <p className="text-muted-foreground">
                Every HiT-graded card receives a unique Certificate of Authentication (CUA) number.
                Verify any card&apos;s authenticity online at hitgrading.com — ensuring buyers and sellers can trade with full confidence.
              </p>
            </div>
            <a href="https://hitgrading.com/" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button className="bg-primary hover:bg-indigo-500 text-white font-semibold px-6">
                <GlobeIcon className="mr-2 h-4 w-4" />
                Verify a Certificate
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>

      {/* ── GRADE SCALE ──────────────────────────────────── */}
      <section className="bg-rari-elevated border-y border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Grade Scale</h2>
            <p className="text-muted-foreground mt-2">Standard 1–10 grading scale</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="rounded-xl">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Grade</TableHead>
                      <TableHead className="w-48">Label</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradeScale.map((g) => (
                      <TableRow key={g.grade}>
                        <TableCell>
                          <span className={`font-bold text-lg ${Number(g.grade) >= 9 ? 'text-primary' : Number(g.grade) >= 7 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {g.grade}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{g.label}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{g.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── DROP-OFF LOCATION ────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Drop-off Location</h2>
        </div>
        <Card className="rounded-xl bg-rari-card border-rari-border max-w-lg mx-auto">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MapPinIcon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Speedy Comics</h3>
            <p className="text-muted-foreground mt-1">Times Square Center, Dubai, UAE</p>
            <p className="text-xs text-muted-foreground mt-3">
              Walk-in submissions welcome. No appointment needed.
            </p>
            <a href="https://maps.google.com/?q=Times+Square+Center+Dubai" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
              <Button variant="outline" className="border-rari-border hover:bg-rari-elevated">
                <MapPinIcon className="mr-2 h-4 w-4" />
                Open in Google Maps
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0D14] to-[#0d1030] border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(99,102,241,0.12)_0%,_transparent_65%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-20 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Grade Your Cards?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Submit your cards through HiT GCC and increase their value with a professional, certified grade — all without leaving the UAE.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://hitgrading.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-indigo-500 text-white font-semibold text-base px-8">
                Submit Cards to HiT
              </Button>
            </a>
            <a href="https://hitgrading.com/pages/contact" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/[0.1] text-foreground hover:bg-white/[0.04]">
                Contact HiT GCC
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Powered by <span className="font-medium text-foreground">HiT GCC</span> · Holistic Inspection &amp; Tagging · Est. 2025
          </p>
        </div>
      </section>

    </div>
  );
}
