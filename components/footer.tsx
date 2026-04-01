export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Mohammed Samrose. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
