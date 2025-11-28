import { Shield, Terminal, Bug, FileSearch, Network, Lock, Code, Server } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  icon: typeof Shield;
  title: string;
  description: string;
}

const skills: Skill[] = [
  {
    icon: Bug,
    title: 'בדיקות חדירות',
    description: 'זיהוי פרצות אבטחה וחולשות במערכות',
  },
  {
    icon: Terminal,
    title: 'Kali Linux',
    description: 'עבודה מתקדמת עם כלי אבטחה',
  },
  {
    icon: Network,
    title: 'Nmap & Burp Suite',
    description: 'סריקת רשתות וניתוח תעבורה',
  },
  {
    icon: FileSearch,
    title: 'ניתוח לוגים',
    description: 'חקירת אירועי אבטחה וזיהוי חריגות',
  },
  {
    icon: Lock,
    title: 'אבטחת רשתות',
    description: 'הגנה על תשתיות ומערכות',
  },
  {
    icon: Code,
    title: 'סקריפטים',
    description: 'Python, Bash ואוטומציה',
  },
  {
    icon: Shield,
    title: 'OSINT',
    description: 'איסוף מידע ממקורות פתוחים',
  },
  {
    icon: Server,
    title: 'ניתוח נוזקות',
    description: 'חקירת קוד זדוני והנדסה לאחור',
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      data-testid="section-skills"
      className="relative z-10 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          data-testid="text-skills-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono">&lt;</span>
          <span className="text-foreground">כישורי סייבר</span>
          <span className="text-primary font-mono">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card
                key={skill.title}
                data-testid={`card-skill-${index}`}
                className="bg-card/50 border-primary/30 backdrop-blur-sm hover-elevate group transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-mono">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
