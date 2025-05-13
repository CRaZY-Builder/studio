
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function EmailSenderPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <Mail className="mr-3 h-7 w-7 text-primary" />
            Email Sender Configuration & Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Configure SMTP settings, manage email templates, view an address book, and monitor the email queue
            and send history. This section will provide tools for managing all email-related functionalities.
          </p>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Email Management Tools Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Full email configuration and logging capabilities are under development.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
