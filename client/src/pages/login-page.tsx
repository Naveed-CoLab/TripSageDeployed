import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Loader2 } from "lucide-react";

import AuthLayout from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buildRedirectQuery, extractRedirectFromSearch } from "@/lib/auth-redirect";

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [location, navigate] = useLocation();
  const { user, loginMutation, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate(redirectPath || "/");
    }
  }, [user, navigate, redirectPath]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const redirect = params.get("redirect");

    if (error) {
      setAuthError(decodeURIComponent(error));
    } else {
      setAuthError(null);
    }

    setRedirectPath(extractRedirectFromSearch(redirect));
  }, [location]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const redirectQuery = useMemo(() => buildRedirectQuery(redirectPath), [redirectPath]);

  function onLoginSubmit(data: LoginFormValues) {
    if (data.username.toLowerCase().includes("admin")) {
      setAuthError("Admin users cannot login here. Please use /admin/login instead.");
      return;
    }

    setAuthError(null);
    loginMutation.mutate(data, {
      onError: (error: any) => {
        if (error.message?.includes("admin")) {
          setAuthError(error.message);
        }
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthLayout
      title="Sign in to TripSage"
      subtitle="Access your personalized itineraries, bookings, and recommendations."
      actionSlot={
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={() => navigate("/admin/login")}
        >
          Admin Login
        </Button>
      }
      footer={
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href={`/register${redirectQuery}`} className="text-primary font-semibold">
            Sign up
          </Link>
        </p>
      }
    >
      {authError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = "/api/auth/google")}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25526 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25537 21.31 7.3104 24.0001 12.0004 24.0001Z"
                fill="#34A853"
              />
            </svg>
            Sign in with Google
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}

