import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  // Check if dark mode is active by looking at the document class
  const isDark = typeof document !== 'undefined'
    ? document.documentElement.classList.contains('dark')
    : false;

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error: 'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive/30',
          success: 'group-[.toaster]:bg-green-600 group-[.toaster]:text-white group-[.toaster]:border-green-600/30',
          warning: 'group-[.toaster]:bg-yellow-600 group-[.toaster]:text-white group-[.toaster]:border-yellow-600/30',
          info: 'group-[.toaster]:bg-blue-600 group-[.toaster]:text-white group-[.toaster]:border-blue-600/30',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
