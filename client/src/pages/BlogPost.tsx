import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import type { BlogPost as BlogPostType } from '@shared/schema';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  const { data, isLoading, error } = useQuery<{ success: boolean; post: BlogPostType }>({
    queryKey: ['/api/blog', slug],
    enabled: !!slug,
  });

  const post = data?.post;

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MatrixBackground />
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/#blog">
            <Button 
              variant="ghost" 
              className="mb-8 text-primary hover:bg-primary/10"
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              חזרה לבלוג
            </Button>
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-primary/10" />
              <Skeleton className="h-6 w-1/4 bg-primary/10" />
              <div className="space-y-4 mt-8">
                <Skeleton className="h-4 w-full bg-primary/10" />
                <Skeleton className="h-4 w-full bg-primary/10" />
                <Skeleton className="h-4 w-5/6 bg-primary/10" />
              </div>
            </div>
          ) : error || !post ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                הפוסט לא נמצא
              </h1>
              <p className="text-muted-foreground mb-6">
                הפוסט שחיפשת לא קיים או הוסר
              </p>
              <Link href="/#blog">
                <Button className="bg-primary text-primary-foreground">
                  חזרה לבלוג
                </Button>
              </Link>
            </div>
          ) : (
            <article data-testid="article-blog-post">
              <header className="mb-8">
                <h1 
                  data-testid="text-blog-title"
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                >
                  {post.titleHe}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(post.createdAt)}</time>
                </div>
              </header>

              <div 
                data-testid="content-blog-post"
                className="prose prose-invert prose-cyan max-w-none"
                style={{ direction: 'rtl' }}
              >
                <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {post.contentHe}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
