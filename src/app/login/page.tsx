
import { LoginForm } from '@/components/auth/login-form';
import { AppLogo } from '@/components/layout/app-logo';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl animate-fade-in">
        <CardHeader className="items-center text-center">
          <AppLogo className="mb-4" iconSize={40} textSize="text-3xl" href="/login" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col items-center text-xs text-muted-foreground">
          <p>Version 1.0.0</p>
          <p>Support: support@scada-assistant.com</p>
        </CardFooter>
      </Card>
    </div>
  );
}
