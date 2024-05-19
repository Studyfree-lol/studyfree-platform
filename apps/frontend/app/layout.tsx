"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  GithubIcon,
  MenuIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import UploadCard from "@/components/upload-card";
import Navigation from "@/components/navigation";
import DarkmodeToggle from "@/components/darkmode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { InstantSearch } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL ?? "",
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
);

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Studyfree - Free Document Sharing Platform",
//   description: "Studyfree is a free document sharing platform for students.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InstantSearch searchClient={searchClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="grid min-h-screen max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                  <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                      className="flex items-center gap-2 font-semibold"
                      href="/"
                    >
                      <Image
                        alt="Studyfree"
                        height={18}
                        src="/img/logo.png"
                        width={18}
                      />
                      <span className="">Studyfree</span>
                    </Link>
                    <Button
                      className="ml-auto h-8 w-8"
                      size="icon"
                      variant="outline"
                    >
                      <BellIcon className="h-4 w-4" />
                      <span className="sr-only">Toggle notifications</span>
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Navigation />
                  </div>
                  <div className="mt-auto p-4">
                    <UploadCard />
                  </div>
                </div>
              </div>
              <div className="flex flex-col max-h-screen">
                <header className="flex h-14 flex-shrink-0 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        className="shrink-0 md:hidden"
                        size="icon"
                        variant="outline"
                      >
                        <MenuIcon className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col" side="left">
                      <Navigation />
                      <div className="mt-auto">
                        <UploadCard />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <div className="w-full flex justify-between">
                    <form className="w-full">
                      <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                          placeholder="Search course..."
                          type="search"
                        />
                      </div>
                    </form>
                    <div className="flex gap-1">
                      <Link
                        target="_blank"
                        href="https://github.com/Studyfree-lol/studyfree-platform"
                      >
                        <Button size="icon" variant="ghost">
                          <GithubIcon className="h-5 w-5" />
                        </Button>
                      </Link>
                      <DarkmodeToggle />
                    </div>
                  </div>
                </header>
                <main className="flex flex-1 flex-col overflow-y-auto gap-4 p-4 lg:gap-6 lg:p-6">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </InstantSearch>
      </body>
    </html>
  );
}
