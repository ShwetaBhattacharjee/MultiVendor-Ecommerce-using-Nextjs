import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import countries from "@/data/countries.json";
import { Country } from "./lib/types";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// First, create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Then, combine with clerkMiddleware
export default clerkMiddleware(async (auth, req, next) => {
  // Handle internationalization (next-intl) middleware first
  const intlResponse = await intlMiddleware(req);
  if (intlResponse) {
    return intlResponse; // If internationalization middleware redirects or handles the request, stop here
  }

  // Then, handle the user authentication
  const protectedRoutes = createRouteMatcher([
    "/dashboard",
    "/dashboard/(.*)",
    "/checkout",
    "/profile",
    "/profile/(.*)",
  ]);

  if (protectedRoutes(req)) {
    await auth.protect();
  }

  // Handle country detection
  let response = NextResponse.next();

  // Check if country is already set in cookies
  const countryCookie = req.cookies.get("userCountry");

  const DEFAULT_COUNTRY: Country = {
    name: "United States",
    code: "US",
    city: "",
    region: "",
  };

  if (!countryCookie) {
    const geo = geolocation(req);
    const userCountry = {
      name:
        countries.find((c) => c.code === geo.country)?.name ||
        DEFAULT_COUNTRY.name,
      code: geo.country || DEFAULT_COUNTRY.code,
      city: geo.city || DEFAULT_COUNTRY.city,
      region: geo.region || DEFAULT_COUNTRY.region,
    };
    response.cookies.set("userCountry", JSON.stringify(userCountry), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
});

// Middleware Configuration
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all pages except static assets and Next.js internal paths
    "/", // Root path
    "/(api|trpc)(.*)", // API routes
    '/(ar|en)/:path*' // Internationalized paths (languages: de, en)
  ],
};
