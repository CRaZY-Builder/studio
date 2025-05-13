
"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, List, CheckCircle2, Search } from "lucide-react";
import Image from "next/image";

interface Template {
  id: string;
  name: string;
  category: string;
  previewUrl: string;
  description: string;
}

const mockTemplates: Template[] = [
  { id: "tpl1", name: "Daily Production Overview", category: "Production", previewUrl: "https://picsum.photos/seed/tpl1/300/200", description: "Summary of daily production metrics and KPIs." },
  { id: "tpl2", name: "Weekly Maintenance Log", category: "Maintenance", previewUrl: "https://picsum.photos/seed/tpl2/300/200", description: "Detailed log of maintenance activities for the week." },
  { id: "tpl3", name: "Monthly Quality Report", category: "Quality", previewUrl: "https://picsum.photos/seed/tpl3/300/200", description: "Comprehensive quality analysis for the month." },
  { id: "tpl4", name: "Shift Handover Notes", category: "Operations", previewUrl: "https://picsum.photos/seed/tpl4/300/200", description: "Standardized notes for shift handover procedures." },
  { id: "tpl5", name: "Equipment Downtime Analysis", category: "Maintenance", previewUrl: "https://picsum.photos/seed/tpl5/300/200", description: "Analysis of equipment downtime and root causes." },
];

export function ReportStep2Template() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");

  const filteredTemplates = mockTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "all" || template.category === filterCategory)
  );

  const categories = ["all", ...Array.from(new Set(mockTemplates.map(t => t.category)))];

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search templates..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</SelectItem>
                ))}
            </SelectContent>
            </Select>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
            <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view">
            <List className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No templates match your criteria.</p>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-xl ${selectedTemplate === template.id ? "ring-2 ring-primary shadow-xl" : "shadow-md"}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader className="p-0">
                <Image 
                    src={template.previewUrl} 
                    alt={template.name} 
                    width={300} height={200} 
                    className="rounded-t-lg object-cover w-full aspect-[3/2]"
                    data-ai-hint="report document" 
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-md mb-1">{template.name}</CardTitle>
                <p className="text-xs text-muted-foreground mb-2">{template.category}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
              </CardContent>
              {selectedTemplate === template.id && (
                <CardFooter className="p-2 bg-primary/10 rounded-b-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Selected</span>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedTemplate === template.id ? "ring-2 ring-primary shadow-lg" : "shadow-md"}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <Image 
                src={template.previewUrl} 
                alt={template.name} 
                width={120} height={80} 
                className="rounded-md object-cover aspect-[3/2] mr-4"
                data-ai-hint="report document"
              />
              <div className="flex-1">
                <CardTitle className="text-md mb-1">{template.name}</CardTitle>
                <p className="text-xs text-muted-foreground mb-1">{template.category}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <CheckCircle2 className="h-6 w-6 text-primary ml-4" />
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
