// Next.js
import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { CurrencyProvider } from "@/components/store/home/CurrencyContext";
// Global css
import "./globals.css";

// Theme provider
import { ThemeProvider } from "next-themes";

// Clerk provider
import { ClerkProvider } from "@clerk/nextjs";

// Toast
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";

// Fonts
const interFont = Inter({ subsets: ["latin"] });
const barlowFont = Barlow({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-barlow",
});

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "hdPartz",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const isArabic = locale === "ar";
  return (
    <ClerkProvider>
      <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
        <body className={`${interFont.className} ${barlowFont.variable}`}>
          <NextIntlClientProvider messages={messages}>
            <ModalProvider>
              <CurrencyProvider>{children}</CurrencyProvider>
            </ModalProvider>
            <Toaster />
            <SonnerToaster position="bottom-left" />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
