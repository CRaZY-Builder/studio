
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ListFilter, BarChartBig, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";

const reportCriteriaSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: "Start date is required." }),
    to: z.date({ required_error: "End date is required." }),
  }),
  machineIds: z.array(z.string()).min(1, "At least one machine ID must be selected."),
  reportType: z.string().min(1, "Report type is required."),
});

// Mock data for machine IDs
const allMachineIds = Array.from({ length: 20 }, (_, i) => ({
  id: `MACHINE-${String(i + 1).padStart(3, '0')}`,
  name: `Machine ${String(i + 1).padStart(3, '0')}`
}));


export function ReportStep1Criteria() {
  const [machineSearch, setMachineSearch] = React.useState("");

  const form = useForm<z.infer<typeof reportCriteriaSchema>>({
    resolver: zodResolver(reportCriteriaSchema),
    defaultValues: {
      dateRange: { from: new Date(), to: new Date() },
      machineIds: [],
      reportType: "",
    },
  });

  function onSubmit(values: z.infer<typeof reportCriteriaSchema>) {
    console.log("Step 1 Values:", values);
    // Typically, you'd pass these values to the parent component or a state management solution
  }

  const filteredMachineIds = allMachineIds.filter(machine => 
    machine.name.toLowerCase().includes(machineSearch.toLowerCase())
  );


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Range</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={{ from: field.value.from, to: field.value.to }}
                    onSelect={(range) => field.onChange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="machineIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Machine IDs</FormLabel>
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search machines..." 
                  className="pl-10"
                  value={machineSearch}
                  onChange={(e) => setMachineSearch(e.target.value)}
                />
              </div>
              <ScrollArea className="h-40 w-full rounded-md border p-2">
                {filteredMachineIds.length > 0 ? filteredMachineIds.map((machine) => (
                  <FormField
                    key={machine.id}
                    control={form.control}
                    name="machineIds"
                    render={({ field: innerField }) => { // Rename field to innerField to avoid conflict
                      return (
                        <FormItem
                          key={machine.id}
                          className="flex flex-row items-start space-x-3 space-y-0 py-1.5 px-2 hover:bg-muted rounded-md"
                        >
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(machine.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), machine.id])
                                  : innerField.onChange(
                                    (innerField.value || []).filter(
                                        (value) => value !== machine.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {machine.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                )) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No machines found.</p>
                )}
              </ScrollArea>
              <FormMessage />
               <FormDescription>
                Select one or more machine IDs for the report.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a report type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="production_summary">
                    <div className="flex items-center">
                      <BarChartBig className="mr-2 h-4 w-4 text-muted-foreground" />
                      Production Summary
                    </div>
                  </SelectItem>
                  <SelectItem value="downtime_analysis">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-muted-foreground" />
                      Downtime Analysis
                    </div>
                  </SelectItem>
                  <SelectItem value="quality_metrics">
                    <div className="flex items-center">
                      <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
                      Quality Metrics
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit button is handled by the parent wizard component */}
      </form>
    </Form>
  );
}

// Helper icon, not used in final form but good for select items
const AlertTriangle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
