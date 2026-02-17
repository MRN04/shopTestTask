"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background py-6 mt-auto">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Product Store. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js, React, and Nest.js
        </p>
      </div>
    </footer>
  );
}
