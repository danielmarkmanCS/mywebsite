import { Terminal } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'אודות', href: '#hero' },
  { label: 'כישורים', href: '#skills' },
  { label: 'פרויקטים', href: '#projects' },
  { label: 'טרמינל', href: '#terminal' },
  { label: 'בלוג', href: '#blog' },
  { label: 'צור קשר', href: '#contact' },
];

export function Navigation() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      data-testid="navigation-header"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/30"
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
        <a 
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          data-testid="link-logo"
          className="flex items-center gap-2 text-primary font-mono font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <Terminal className="w-5 h-5" />
          <span>דניאל</span>
        </a>

        <ul className="flex items-center gap-6 flex-wrap">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                data-testid={`link-nav-${item.href.replace('#', '')}`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
