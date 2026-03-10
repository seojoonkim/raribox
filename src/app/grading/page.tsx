import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const benefits = [
  { icon: '🔍', title: 'Expert Evaluation', description: 'Trained professionals assess your card\'s condition with precision and consistency.' },
  { icon: '🏅', title: 'Official Grade', description: 'Cards receive a certified numerical grade from 1 to 10, recognized worldwide.' },
  { icon: '🛡️', title: 'Protected & Sealed', description: 'Graded cards are sealed in tamper-proof slabs, preserving condition permanently.' },
  { icon: '📈', title: 'Increased Value', description: 'Graded cards typically sell for significantly more than raw cards of the same quality.' },
];

const steps = [
  { step: 1, title: 'Submit Your Cards', description: 'Visit HIT Grading\'s website to submit your cards for professional evaluation. Choose your service tier and shipping method.' },
  { step: 2, title: 'Expert Evaluation', description: 'Trained graders evaluate every aspect of your card — centering, corners, edges, and surface — under controlled conditions.' },
  { step: 3, title: 'Receive Your Slabs', description: 'Your cards are sealed in tamper-proof cases with their official grade and returned to you, ready to display or sell.' },
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 md:py-24">
          <div className="max-w-2xl">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Official Partner</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Get Your Cards Graded
            </h1>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
              Professional card grading through our trusted partner,{' '}
              <span className="text-foreground font-medium">HIT Grading</span> — the #1 grading
              service in the GCC region.
            </p>
            <div className="mt-8">
              <a href="https://hitgrading.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-indigo-500 text-white font-semibold text-base px-8">
                  Submit Cards to HIT Grading →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Grading */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">What is Card Grading?</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Grading authenticates and evaluates trading cards on a standardized scale, increasing their value and protecting them for the long term.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <Card key={b.title} className="text-center rounded-xl hover:border-rari-accent/30 hover:shadow-lg hover:shadow-rari-accent/10 transition-all">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-rari-elevated border-y border-rari-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Three simple steps to get your cards graded</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="relative">
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
        </div>
      </section>

      {/* Grade Scale */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Grade Scale</h2>
          <p className="text-muted-foreground mt-2">Standard 1–10 grading scale used by professional services</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
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
                        <span className={`font-bold ${Number(g.grade) >= 9 ? 'text-primary' : Number(g.grade) >= 7 ? 'text-foreground' : 'text-muted-foreground'}`}>
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
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-br from-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Grade Your Cards?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Submit your cards through HIT Grading and increase their value with a professional, certified grade.
          </p>
          <a href="https://hitgrading.com/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary hover:bg-indigo-500 text-white font-semibold text-base px-8">
              Submit Cards to HIT Grading →
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Powered by <span className="font-medium text-foreground">HIT Grading</span> · Official GCC Partner
          </p>
        </div>
      </section>
    </div>
  );
}
