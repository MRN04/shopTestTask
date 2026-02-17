export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Product Store. Built with Next.js & Redux.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Inforce Test Task</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
