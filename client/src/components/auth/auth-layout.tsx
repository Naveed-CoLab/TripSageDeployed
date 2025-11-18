import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  actionSlot?: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  actionSlot,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full p-4 md:p-8">
        <div className="flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to TripSage</h1>
            <p className="mt-2 text-gray-600">AI-powered travel planning made simple</p>
          </div>

          <Card>
            <CardContent className="pt-8 relative">
              {actionSlot && (
                <div className="absolute top-4 right-4">
                  {actionSlot}
                </div>
              )}

              <div className="mb-6 pr-16">
                <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-gray-600">{subtitle}</p>
              </div>

              {children}
            </CardContent>
          </Card>

          {footer && (
            <div className="mt-6 text-center md:text-left">
              {footer}
            </div>
          )}
        </div>

        <AuthHero />
      </div>
    </div>
  );
}

function AuthHero() {
  return (
    <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800">
        <h2 className="text-3xl font-bold mb-6">Explore the World with AI-Powered Planning</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Personalized travel recommendations based on your preferences</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Detailed day-by-day itineraries created in seconds</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Book flights, hotels, and activities all in one place</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Discover hidden gems and local favorites</span>
          </li>
        </ul>
        <div className="mt-8">
          <p className="text-blue-200 italic">
            "TripSage transformed our vacation planning. The AI recommendations were spot-on and saved us hours of research!"
          </p>
          <p className="mt-2 font-medium">— Sarah J., TripSage User</p>
        </div>
      </div>
    </div>
  );
}

