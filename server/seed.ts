import { db } from "./db";
import { projects, blogPosts, siteSettings } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed site settings (social links)
  const settings = [
    { key: "instagram_url", value: "https://instagram.com/daniel_cyber" },
    { key: "linkedin_url", value: "https://linkedin.com/in/daniel-cyber" },
    { key: "email", value: "daniel@example.com" },
    { key: "github_url", value: "https://github.com/daniel-cyber" },
  ];

  for (const setting of settings) {
    try {
      await db.insert(siteSettings).values(setting).onConflictDoNothing();
    } catch (e) {
      console.log(`Setting ${setting.key} already exists or error:`, e);
    }
  }

  // Seed sample projects
  const sampleProjects = [
    {
      title: "Network Scanner",
      titleHe: "סורק רשתות",
      description: "Automated network scanning tool with vulnerability detection",
      descriptionHe: "כלי סריקת רשתות אוטומטי עם זיהוי פגיעויות",
      technologies: ["Python", "Scapy", "Nmap"],
      githubUrl: "https://github.com/daniel/network-scanner",
      featured: "true",
    },
    {
      title: "Log Analyzer",
      titleHe: "מנתח לוגים",
      description: "Smart log analysis system with anomaly detection",
      descriptionHe: "מערכת ניתוח לוגים חכמה עם זיהוי חריגות",
      technologies: ["Python", "ELK Stack", "ML"],
      githubUrl: "https://github.com/daniel/log-analyzer",
      featured: "true",
    },
    {
      title: "Phishing Detector",
      titleHe: "מזהה פישינג",
      description: "Browser extension to detect phishing websites",
      descriptionHe: "תוסף דפדפן לזיהוי אתרי פישינג",
      technologies: ["JavaScript", "NLP", "Chrome API"],
      githubUrl: "https://github.com/daniel/phishing-detector",
      featured: "true",
    },
    {
      title: "Password Auditor",
      titleHe: "בודק סיסמאות",
      description: "Password strength checker and policy validator",
      descriptionHe: "כלי לבדיקת חוזק סיסמאות ואימות מדיניות",
      technologies: ["Python", "Hashcat", "REST API"],
      githubUrl: "https://github.com/daniel/password-auditor",
      featured: "false",
    },
  ];

  for (const project of sampleProjects) {
    try {
      await db.insert(projects).values(project);
    } catch (e) {
      console.log(`Error inserting project ${project.title}:`, e);
    }
  }

  // Seed sample blog posts
  const sampleBlogPosts = [
    {
      title: "Getting Started with Penetration Testing",
      titleHe: "מדריך למתחילים בבדיקות חדירות",
      slug: "getting-started-pentesting",
      excerpt: "Learn the basics of penetration testing and how to get started",
      excerptHe: "למדו את הבסיס של בדיקות חדירות וכיצד להתחיל",
      content: "Penetration testing is a crucial skill in cybersecurity...",
      contentHe: `בדיקות חדירות הן אחד התחומים החשובים ביותר באבטחת מידע.

בדיקות חדירות (Penetration Testing) הן תהליך של בדיקת מערכות מחשוב לזיהוי פרצות אבטחה.

## מה צריך לדעת?

1. רשתות - הבנה של פרוטוקולי TCP/IP
2. לינוקס - עבודה בסביבת Kali Linux
3. כלים - Nmap, Burp Suite, Metasploit
4. סקריפטים - Python ו-Bash

## איך להתחיל?

מומלץ להתחיל עם פלטפורמות לימוד כמו:
- TryHackMe
- HackTheBox
- OverTheWire

בהצלחה!`,
      published: "true",
    },
    {
      title: "OSINT Techniques for Security Researchers",
      titleHe: "טכניקות OSINT לחוקרי אבטחה",
      slug: "osint-techniques",
      excerpt: "Discover open source intelligence gathering methods",
      excerptHe: "גלו שיטות לאיסוף מידע ממקורות פתוחים",
      content: "OSINT is the collection and analysis of information...",
      contentHe: `OSINT (Open Source Intelligence) הוא תחום העוסק באיסוף וניתוח מידע ממקורות פתוחים.

## מהו OSINT?

OSINT מאפשר לנו לאסוף מידע על יעדים מבלי לחדור למערכות שלהם.

## כלים מומלצים

- Maltego - לניתוח קשרים
- Shodan - לסריקת מכשירים מחוברים
- TheHarvester - לאיסוף מידע על דומיינים
- Google Dorks - חיפוש מתקדם בגוגל

## שימושים לגיטימיים

1. בדיקת חשיפה ארגונית
2. חקירות אבטחה
3. איתור דליפות מידע
4. מודיעין עסקי

זכרו: השתמשו בכלים אלו באחריות ובהתאם לחוק!`,
      published: "true",
    },
  ];

  for (const post of sampleBlogPosts) {
    try {
      await db.insert(blogPosts).values(post);
    } catch (e) {
      console.log(`Error inserting blog post ${post.title}:`, e);
    }
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
