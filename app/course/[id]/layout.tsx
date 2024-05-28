import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="loading loading-spinner" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
