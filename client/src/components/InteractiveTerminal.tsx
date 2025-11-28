import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Card } from '@/components/ui/card';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const commands: Record<string, string | string[]> = {
  help: [
    'פקודות זמינות:',
    '  help           - הצגת רשימת פקודות',
    '  about          - מידע על דניאל',
    '  skills         - רשימת כישורים',
    '  projects       - פרויקטים נבחרים',
    '  experience     - ניסיון מקצועי',
    '  certifications - הסמכות ותעודות',
    '  contact        - פרטי יצירת קשר',
    '  clear          - ניקוי הטרמינל',
  ],
  about: [
    'דניאל - חוקר סייבר ומומחה אבטחת מידע',
    '',
    'מתמחה בבדיקות חדירות, ניתוח פרצות אבטחה',
    'וחקירת אירועי סייבר. עובד עם כלים מתקדמים',
    'כמו Kali Linux, Burp Suite ו-Metasploit.',
    '',
    'תמיד לומד ומתעדכן בטכנולוגיות חדשות.',
  ],
  skills: [
    '[ כישורים טכניים ]',
    '',
    '> בדיקות חדירות (Penetration Testing)',
    '> עבודה עם Kali Linux',
    '> Nmap, Burp Suite, Metasploit',
    '> ניתוח לוגים וזיהוי חריגות',
    '> Python & Bash scripting',
    '> OSINT - מודיעין ממקורות פתוחים',
    '> ניתוח נוזקות והנדסה לאחור',
  ],
  contact: [
    '[ יצירת קשר ]',
    '',
    'אימייל: daniel@example.com',
    'לינקדאין: linkedin.com/in/daniel',
    'גיטהאב: github.com/daniel',
    '',
    'או השתמש בטופס יצירת קשר למטה',
  ],
  projects: [
    '[ פרויקטים נבחרים ]',
    '',
    '> Network Scanner - כלי סריקת רשתות אוטומטי',
    '  └─ Python, Scapy, Nmap integration',
    '',
    '> Log Analyzer - מערכת ניתוח לוגים חכמה',
    '  └─ ELK Stack, Python, Machine Learning',
    '',
    '> Phishing Detector - זיהוי אתרי פישינג',
    '  └─ NLP, URL analysis, Browser extension',
    '',
    '> Password Auditor - בדיקת חוזק סיסמאות',
    '  └─ Hashcat integration, Policy checker',
  ],
  experience: [
    '[ ניסיון מקצועי ]',
    '',
    '> 2023-הווה: חוקר אבטחת מידע',
    '  └─ בדיקות חדירות, ניתוח פרצות, דוחות אבטחה',
    '',
    '> 2022-2023: אנליסט SOC',
    '  └─ ניטור אירועי אבטחה, תגובה לאירועים',
    '',
    '> 2021-2022: מתמחה אבטחת מידע',
    '  └─ סריקות פגיעויות, בדיקות אוטומטיות',
    '',
    '> 2020-2021: לימודים עצמאיים',
    '  └─ CTF, TryHackMe, HackTheBox',
  ],
  certifications: [
    '[ הסמכות ותעודות ]',
    '',
    '> CEH - Certified Ethical Hacker',
    '  └─ EC-Council',
    '',
    '> CompTIA Security+',
    '  └─ CompTIA',
    '',
    '> OSCP - Offensive Security Certified Professional',
    '  └─ בתהליך השלמה',
    '',
    '> eJPT - eLearnSecurity Junior Penetration Tester',
    '  └─ INE Security',
  ],
};

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'מערכת דניאל v1.0.0' },
    { type: 'output', content: 'הקלד "help" לקבלת רשימת פקודות' },
    { type: 'output', content: '' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: `root@daniel:~$ ${cmd}` },
    ];

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    if (trimmedCmd === '') {
      setLines(newLines);
      return;
    }

    const response = commands[trimmedCmd];
    
    if (response) {
      const outputLines = Array.isArray(response) ? response : [response];
      outputLines.forEach((line) => {
        newLines.push({ type: 'output', content: line });
      });
    } else {
      newLines.push({ 
        type: 'output', 
        content: `bash: ${trimmedCmd}: פקודה לא מוכרת. הקלד "help" לעזרה.` 
      });
    }

    newLines.push({ type: 'output', content: '' });
    setLines(newLines);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        setCommandHistory((prev) => [...prev, inputValue]);
        setHistoryIndex(-1);
      }
      processCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      id="terminal"
      data-testid="section-terminal"
      className="relative z-10 py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          data-testid="text-terminal-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono">$</span>
          <span className="text-foreground"> טרמינל אינטראקטיבי</span>
        </h2>

        <Card 
          className="bg-black border-primary/50 overflow-hidden cursor-text"
          onClick={focusInput}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-card/80 border-b border-primary/30">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground text-sm font-mono mr-4">
              daniel@cyber:~
            </span>
          </div>

          <div
            ref={terminalRef}
            data-testid="terminal-output"
            className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
            dir="ltr"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap ${
                  line.type === 'input' 
                    ? 'text-green-400' 
                    : 'text-primary/90'
                }`}
              >
                {line.content || '\u00A0'}
              </div>
            ))}
            
            <div className="flex items-center text-green-400">
              <span>root@daniel:~$&nbsp;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                data-testid="input-terminal"
                className="flex-1 bg-transparent border-none outline-none text-primary font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="animate-pulse text-primary">|</span>
            </div>
          </div>
        </Card>

        <p className="text-center text-muted-foreground text-sm mt-4 font-mono">
          נסה להקליד: help, about, skills, projects, experience, certifications, contact
        </p>
      </div>
    </section>
  );
}
