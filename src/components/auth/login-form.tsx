
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import { Check, AlertTriangle, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const sqlAuthSchema = z.object({
  server: z.string().min(1, "Server is required"),
  database: z.string().min(1, "Database is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const windowsAuthSchema = z.object({
  username: z.string().min(1, "Username is required (domain\\user)"),
  // Windows auth might not need password field here if using integrated security in a desktop context
  // For a web app, it's more complex. Assuming a scenario where it might still be collected or handled differently.
  // For simplicity, let's keep a password field, or it can be removed if integrated auth is purely client-side.
});

type AuthType = "sql" | "windows";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [authType, setAuthType] = React.useState<AuthType>("sql");
  const [showPassword, setShowPassword] = React.useState(false);

  const currentSchema = authType === "sql" ? sqlAuthSchema : windowsAuthSchema;

  const form = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: authType === "sql" ? { server: "", database: "", username: "", password: "" } : { username: "" },
    mode: "onChange", // Validate as user types
  });

  React.useEffect(() => {
    form.reset(authType === "sql" ? { server: "", database: "", username: "", password: "" } : { username: "" });
  }, [authType, form]);

  function onSubmit(values: z.infer<typeof currentSchema>) {
    // Simulate API call
    toast({
      title: "Login Attempt",
      description: `Authenticating as ${values.username}...`,
    });
    console.log("Form submitted:", values);
    // In a real app, you would call an API endpoint here.
    // For now, redirect to dashboard on successful validation.
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
        variant: "default", // Shadcn default is not explicitly 'success'
      });
      router.push('/dashboard');
    }, 1000);
  }

  const getFieldStateIcon = (fieldName: keyof z.infer<typeof currentSchema>) => {
    const fieldState = form.getFieldState(fieldName);
    if (!fieldState.isDirty) return null;
    if (fieldState.error) {
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    }
    if (form.getValues(fieldName)) {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    return null;
  };

  return (
    <Tabs value={authType} onValueChange={(value) => setAuthType(value as AuthType)} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="sql">SQL Server</TabsTrigger>
        <TabsTrigger value="windows">Windows</TabsTrigger>
      </TabsList>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {authType === "sql" && (
            <>
              <FormField
                control={form.control}
                name="server"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input placeholder="e.g., MYSQLSERVER01" {...field} className={cn(form.getFieldState("server").error && "border-destructive focus-visible:ring-destructive")} />
                      </FormControl>
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        {getFieldStateIcon("server")}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="database"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database</FormLabel>
                     <div className="relative">
                      <FormControl>
                        <Input placeholder="e.g., SCADA_DB" {...field} className={cn(form.getFieldState("database").error && "border-destructive focus-visible:ring-destructive")} />
                      </FormControl>
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        {getFieldStateIcon("database")}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder={authType === 'sql' ? "e.g., sa" : "e.g., DOMAIN\\user"} {...field} className={cn(form.getFieldState("username").error && "border-destructive focus-visible:ring-destructive")} />
                  </FormControl>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {getFieldStateIcon("username")}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {authType === "sql" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} className={cn(form.getFieldState("password").error && "border-destructive focus-visible:ring-destructive")} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                   <div className="relative"> {/* For validation icon to align correctly */}
                     <div className="absolute -top-8 right-10 flex items-center pr-1"> {/* Adjust positioning based on eye icon */}
                        {getFieldStateIcon("password")}
                      </div>
                   </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!form.formState.isValid || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Processing..." : "Proceed"}
          </Button>
        </form>
      </Form>
    </Tabs>
  );
}
