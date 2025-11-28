import { useQuery } from '@tanstack/react-query';
import { TypingEffect } from './TypingEffect';
import { Mail, Linkedin, Github, type LucideIcon } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import type { IconType } from 'react-icons';

const typingWords = ['חוקר סייבר', 'פנטסטר', 'לומד כל יום', 'מחפש הזדמנות'];

interface SocialLink {
  icon: LucideIcon | IconType;
  label: string;
  settingKey: string;
  defaultUrl: string;
  testId: string;
}

const socialLinks: SocialLink[] = [
  { icon: SiInstagram, label: 'אינסטגרם', settingKey: 'instagram_url', defaultUrl: '#', testId: 'link-instagram' },
  { icon: Linkedin, label: 'לינקדאין', settingKey: 'linkedin_url', defaultUrl: '#', testId: 'link-linkedin' },
  { icon: Github, label: 'גיטהאב', settingKey: 'github_url', defaultUrl: '#', testId: 'link-github' },
  { icon: Mail, label: 'מייל', settingKey: 'email', defaultUrl: 'mailto:daniel@example.com', testId: 'link-email' },
];

export function HeroSection() {
  const { data: settingsData } = useQuery<{ success: boolean; settings: Record<string, string> }>({
    queryKey: ['/api/settings'],
  });

  const settings = settingsData?.settings || {};

  const getUrl = (link: SocialLink) => {
    const value = settings[link.settingKey];
    if (!value) return link.defaultUrl;
    if (link.settingKey === 'email') {
      return `mailto:${value}`;
    }
    return value;
  };

  return (
    <section
      id="hero"
      data-testid="section-hero"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="text-center max-w-3xl mx-auto relative z-10">
        <h1 
          data-testid="text-hero-title"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="text-primary font-mono">דניאל</span>
          <span className="text-foreground"> - סייבר ואבטחת מידע</span>
        </h1>

        <div className="mb-8 min-h-[2em]">
          <TypingEffect words={typingWords} />
        </div>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const url = getUrl(link);
            const isExternal = !url.startsWith('mailto:') && url !== '#';
            
            return (
              <a
                key={link.label}
                href={url}
                data-testid={link.testId}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="mt-12 animate-bounce">
          <a 
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            }}
            data-testid="link-scroll-down"
            className="text-primary/60 hover:text-primary transition-colors"
          >
            <svg 
              className="w-8 h-8 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
