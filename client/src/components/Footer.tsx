import { Terminal, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      data-testid="footer"
      className="relative z-10 border-t border-primary/30 bg-background/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-mono">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">דניאל - סייבר ואבטחת מידע</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>נבנה עם</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
