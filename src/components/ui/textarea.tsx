import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-md border border-scriptorium-border bg-scriptorium-bg px-3 py-2 text-base text-scriptorium-cream ring-offset-scriptorium-bg placeholder:text-scriptorium-gold-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scriptorium-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
