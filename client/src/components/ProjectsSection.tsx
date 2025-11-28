import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import type { Project } from '@shared/schema';

export function ProjectsSection() {
  const { data, isLoading } = useQuery<{ success: boolean; projects: Project[] }>({
    queryKey: ['/api/projects'],
  });

  const projects = data?.projects || [];

  return (
    <section
      id="projects"
      data-testid="section-projects"
      className="relative z-10 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          data-testid="text-projects-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono">&lt;</span>
          <span className="text-foreground">פרויקטים</span>
          <span className="text-primary font-mono">/&gt;</span>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-primary/30">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-primary/10" />
                  <Skeleton className="h-4 w-full mt-2 bg-primary/10" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full bg-primary/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <FolderGit2 className="w-16 h-16 text-primary/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              פרויקטים יתווספו בקרוב...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                data-testid={`card-project-${project.id}`}
                className="bg-card/50 border-primary/30 backdrop-blur-sm hover-elevate group transition-all duration-300 flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-foreground font-mono flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-primary" />
                    {project.titleHe}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.descriptionHe}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/30 font-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 ml-2" />
                          קוד
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 ml-2" />
                          צפייה
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
