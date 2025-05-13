

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarChart, LineChart, PieChart as RechartsPieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Line } from 'recharts'; // Renamed PieChart to avoid conflict, Added Line
import { Card, CardContent, CardDescription as ShadcnCardDescription, CardHeader, CardTitle } from "../ui/card"; // Renamed CardDescription


const chartConfigSchema = z.object({
  includeCharts: z.boolean().default(false),
  chartType: z.string().optional(),
  xAxisField: z.string().optional(),
  yAxisField: z.string().optional(),
  colorScheme: z.string().optional(),
});

// Mock data for chart preview
const mockChartData = [
  { name: 'Machine A', value: 400, uv: 200 },
  { name: 'Machine B', value: 300, uv: 250 },
  { name: 'Machine C', value: 200, uv: 300 },
  { name: 'Machine D', value: 278, uv: 180 },
  { name: 'Machine E', value: 189, uv: 220 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function ReportStep4Charts() {
  const form = useForm<z.infer<typeof chartConfigSchema>>({
    resolver: zodResolver(chartConfigSchema),
    defaultValues: {
      includeCharts: false,
      chartType: "bar",
      xAxisField: "name",
      yAxisField: "value",
      colorScheme: "default",
    },
  });

  const includeCharts = form.watch("includeCharts");
  const chartType = form.watch("chartType");

  function onSubmit(values: z.infer<typeof chartConfigSchema>) {
    console.log("Step 4 Values:", values);
  }

  const renderChartPreview = () => {
    if (!includeCharts) return <p className="text-center text-muted-foreground">Charts are disabled.</p>;

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={form.getValues("xAxisField") || "name"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={form.getValues("yAxisField") || "value"} fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={form.getValues("xAxisField") || "name"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={form.getValues("yAxisField") || "value"} stroke={COLORS[1]} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={mockChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={form.getValues("yAxisField") || "value"}
                nameKey={form.getValues("xAxisField") || "name"}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {mockChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return <p className="text-center text-muted-foreground">Select a chart type to see a preview.</p>;
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="includeCharts"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Include Charts in Report</FormLabel>
                  <FormDescription>
                    Add visual representations of your data.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {includeCharts && (
            <>
              <FormField
                control={form.control}
                name="chartType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="xAxisField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X-Axis Field</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select X-axis field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="name">Machine Name</SelectItem>
                        <SelectItem value="timestamp">Timestamp</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yAxisField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Y-Axis Field</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Y-axis field" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="value">Value</SelectItem>
                        <SelectItem value="count">Count</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Scheme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color scheme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="blueScale">Blue Scale</SelectItem>
                        <SelectItem value="greenScale">Green Scale</SelectItem>
                        <SelectItem value="monochrome">Monochrome</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Live Chart Preview</CardTitle>
            <ShadcnCardDescription>This is a sample representation of your selected chart.</ShadcnCardDescription>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center border rounded-md p-4 bg-muted/20">
            {renderChartPreview()}
        </CardContent>
      </Card>
    </div>
  );
}

