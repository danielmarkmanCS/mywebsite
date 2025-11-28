import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { BlogPost } from '@shared/schema';

export function BlogSection() {
  const { data, isLoading } = useQuery<{ success: boolean; posts: BlogPost[] }>({
    queryKey: ['/api/blog'],
  });

  const posts = data?.posts || [];

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      id="blog"
      data-testid="section-blog"
      className="relative z-10 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          data-testid="text-blog-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono">#</span>
          <span className="text-foreground"> בלוג</span>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-primary/30">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-primary/10" />
                  <Skeleton className="h-4 w-1/2 mt-2 bg-primary/10" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full bg-primary/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              פוסטים יתווספו בקרוב...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                data-testid={`card-blog-${post.id}`}
                className="bg-card/50 border-primary/30 backdrop-blur-sm hover-elevate group transition-all duration-300 flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <CardTitle className="text-foreground font-mono text-lg">
                    {post.titleHe}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerptHe}
                  </CardDescription>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/10 w-full justify-between"
                    >
                      <span>קרא עוד</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
