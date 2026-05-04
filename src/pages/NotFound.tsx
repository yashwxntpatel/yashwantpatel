import { memo } from "react";

const NotFound = memo(() => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
      <p className="mb-4 text-xl text-muted-foreground">Page not found</p>
      <a href="/" className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors">
        Return to Home
      </a>
    </div>
  </div>
));

NotFound.displayName = "NotFound";
export default NotFound;
