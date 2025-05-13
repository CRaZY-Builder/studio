
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3, FileText, Settings, Activity, FileWarning, Mail, CalendarClock, HelpCircle, UserCircle, ChevronsLeft, ChevronsRight
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppLogo } from './app-logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 }, // Changed icon to BarChart3 for Dashboard
  { href: '/report-generator', label: 'Report Generator', icon: BarChart3 },
  { href: '/templates', label: 'Templates', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/wincc-activity-logger', label: 'WinCC Activity Logger', icon: Activity },
  { href: '/logs-errors', label: 'Logs/Errors', icon: FileWarning },
  { href: '/email-sender', label: 'Email Sender', icon: Mail },
  { href: '/scheduler', label: 'Scheduler', icon: CalendarClock },
];

const helpNavItem = { href: '/help', label: 'Help', icon: HelpCircle };

export function AppSidebar() {
  const pathname = usePathname();
  const { open, toggleSidebar, isMobile, state } = useSidebar();

  return (
    <Sidebar side="left" collapsible={isMobile ? "offcanvas" : "icon"} variant="sidebar" className="border-r border-sidebar-border shadow-md">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          {state === "expanded" && <AppLogo href="/dashboard" />}
          {!isMobile && (
             <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent">
              {open ? <ChevronsLeft /> : <ChevronsRight />}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          )}
        </div>
        {state === "expanded" && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <Avatar className="h-16 w-16 border-2 border-sidebar-primary">
              <AvatarImage src="https://picsum.photos/100/100?grayscale" alt="User Avatar" data-ai-hint="person face" />
              <AvatarFallback>UA</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-sidebar-foreground">User Admin</p>
          </div>
        )}
      </SidebarHeader>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarContent className="flex-1 px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "bg-sidebar text-sidebar-foreground border-sidebar-border" }}
                  className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  {state === "expanded" && <span>{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href={helpNavItem.href} passHref legacyBehavior>
              <SidebarMenuButton
                isActive={pathname.startsWith(helpNavItem.href)}
                tooltip={{ children: helpNavItem.label, className: "bg-sidebar text-sidebar-foreground border-sidebar-border" }}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <helpNavItem.icon className="h-5 w-5" />
                 {state === "expanded" && <span>{helpNavItem.label}</span>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
