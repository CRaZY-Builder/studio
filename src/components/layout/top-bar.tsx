
"use client";

import * as React from 'react';
import { Bell, CalendarDays, ChevronRight, LogOut, Settings, User, PanelLeft } from 'lucide-react';
import { AppLogo } from './app-logo';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TopBar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', href: '/dashboard' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        href: currentPath
      });
    });
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="-ml-2">
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
        {!isMobile && <AppLogo href="/dashboard" iconSize={24} textSize="text-lg" />}

        <nav aria-label="Breadcrumb" className="hidden md:flex items-center text-sm">
          <ol role="list" className="flex items-center space-x-1">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href}>
                <div className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  <Link
                    href={crumb.href}
                    className={`ml-1 font-medium ${index === breadcrumbs.length -1 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                  >
                    {crumb.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-auto justify-start text-left font-normal">
              <CalendarDays className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/100/100?grayscale" alt="User Avatar" data-ai-hint="person face"/>
                <AvatarFallback>UA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/login" passHref legacyBehavior>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
