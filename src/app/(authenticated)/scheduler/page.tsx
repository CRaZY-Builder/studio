
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

export default function SchedulerPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <CalendarClock className="mr-3 h-7 w-7 text-primary" />
            Task Scheduler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage scheduled tasks using a calendar view (monthly/weekly/daily). Add new tasks,
            edit existing ones, and monitor their status. Conflict detection and status indicators
            will be part of this module.
          </p>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Task Scheduler Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Automate your report generation and other tasks with the upcoming scheduler.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
