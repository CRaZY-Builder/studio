
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function WinccActivityLoggerPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <Activity className="mr-3 h-7 w-7 text-primary" />
            WinCC Activity Logger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This module will display a timeline view of WinCC activities. You'll be able to filter
            activities by date range, category, and user. Detailed information for selected activities
            and export options will also be available.
          </p>
           <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">WinCC Activity Tracking Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Monitor SCADA system activities effectively in an upcoming release.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
