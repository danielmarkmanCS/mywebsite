import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'שם חייב להכיל לפחות 2 תווים'),
  email: z.string().email('נא להזין כתובת אימייל תקינה'),
  message: z.string().min(10, 'ההודעה חייבת להכיל לפחות 10 תווים'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: 'ההודעה נשלחה בהצלחה',
        description: 'אחזור אליך בהקדם האפשרי',
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    },
    onError: () => {
      toast({
        title: 'שגיאה בשליחת ההודעה',
        description: 'נא לנסות שוב מאוחר יותר',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section
      id="contact"
      data-testid="section-contact"
      className="relative z-10 py-20 px-4 pb-32"
    >
      <div className="max-w-2xl mx-auto">
        <h2 
          data-testid="text-contact-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          <span className="text-primary font-mono">@</span>
          <span className="text-foreground"> יצירת קשר</span>
        </h2>

        <Card className="bg-card/50 border-primary/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-center font-mono">
              שלח לי הודעה
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div 
                data-testid="contact-success"
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  תודה על פנייתך!
                </h3>
                <p className="text-muted-foreground">
                  אחזור אליך בהקדם האפשרי
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">שם</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            data-testid="input-name"
                            placeholder="הכנס את שמך"
                            className="bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">אימייל</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            data-testid="input-email"
                            placeholder="your@email.com"
                            dir="ltr"
                            className="bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground text-left"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">הודעה</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            data-testid="input-message"
                            placeholder="כתוב את הודעתך כאן..."
                            rows={5}
                            className="bg-background/50 border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    data-testid="button-submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        שולח...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 ml-2" />
                        שליחה
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
