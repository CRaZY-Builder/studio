
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <FileText className="mr-3 h-7 w-7 text-primary" />
            Template Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will allow you to manage and edit report templates.
            Functionality to create, view, edit, and delete templates will be available here.
            The layout will likely be a split view with a list of templates on one side and an editor/preview on the other.
          </p>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Template Management Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Check back later for full template editing capabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
