
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FilePlus, CalendarClock, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description?: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description, trend, trendDirection }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      {trend && (
        <p className={`text-xs pt-1 ${trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

interface QuickActionProps {
  title: string;
  icon: React.ElementType;
  href: string;
  description: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, icon: Icon, href, description }) => (
  <Link href={href} passHref>
    <Button variant="outline" className="flex flex-col items-start justify-start h-auto p-4 text-left shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      <div className="flex items-center mb-2">
        <Icon className="h-6 w-6 mr-3 text-primary" />
        <span className="text-lg font-semibold text-foreground">{title}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Button>
  </Link>
);

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconColor?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, icon: Icon, iconColor = "text-muted-foreground" }) => (
  <li className="flex items-start space-x-3 py-3">
    <div className={`p-1.5 rounded-full bg-muted ${iconColor} bg-opacity-20`}>
      <Icon className={`h-5 w-5 ${iconColor}`} />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <p className="text-xs text-muted-foreground whitespace-nowrap">{time}</p>
  </li>
);

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    setCurrentTime(new Date().toLocaleTimeString()); // Initial set
    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="container mx-auto py-2 animate-fade-in">
      <Card className="mb-6 shadow-lg bg-card border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome to SCADA Assistant</h1>
              <p className="text-lg text-muted-foreground mt-1">
                {currentDate} - <span className="font-semibold">{currentTime}</span>
              </p>
            </div>
            <Image src="https://picsum.photos/seed/dashboard/200/100" alt="Dashboard banner" width={200} height={100} className="rounded-lg mt-4 md:mt-0 shadow-md" data-ai-hint="industrial technology"/>
          </div>
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAction title="New Report" icon={FilePlus} href="/report-generator" description="Generate a new SCADA report." />
          <QuickAction title="View Templates" icon={BarChart3} href="/templates" description="Manage and edit report templates." />
          <QuickAction title="Check Schedule" icon={CalendarClock} href="/scheduler" description="View and manage scheduled tasks." />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">System Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Reports Generated (Month)" value="1,234" icon={FilePlus} description="+20.1% from last month" trendDirection="up"/>
          <StatCard title="Scheduled Tasks" value="42" icon={CalendarClock} description="5 overdue" trendDirection="down"/>
          <StatCard title="Active Users" value="7" icon={Users} />
          <StatCard title="System Status" value="Operational" icon={CheckCircle2} description="All systems green" trendDirection="up" />
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Track the latest system and user activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border -mx-6 px-6">
              <ActivityItem title="Report 'Daily Production' Generated" description="Generated by System Scheduler" time="10 min ago" icon={FilePlus} iconColor="text-green-500" />
              <ActivityItem title="User 'john.doe' Logged In" description="From IP: 192.168.1.100" time="45 min ago" icon={Users} />
              <ActivityItem title="Template 'ShiftSummary_v2' Updated" description="By admin@example.com" time="2 hours ago" icon={BarChart3} />
              <ActivityItem title="Scheduled Task 'WeeklyBackup' Failed" description="Error: Connection timed out" time="5 hours ago" icon={AlertTriangle} iconColor="text-red-500" />
              <ActivityItem title="New User 'jane.smith' Added" description="Role: Operator" time="1 day ago" icon={Users} iconColor="text-blue-500"/>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
             <CardDescription>Health overview of critical components.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Connection</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                <span className="text-sm font-medium text-foreground">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">WinCC Interface</span>
               <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                <span className="text-sm font-medium text-foreground">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email Service</span>
               <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" /> 
                <span className="text-sm font-medium text-foreground">Degraded</span>
              </div>
            </div>
             <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Report Engine</span>
               <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                <span className="text-sm font-medium text-foreground">Idle</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
