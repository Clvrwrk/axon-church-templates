import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Sign in — Axon Ministry Solutions" }],
  }),
});

function LoginPage() {
  return (
    <div className="theme-portfolio flex min-h-screen items-center justify-center bg-bg px-4 text-fg">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-surface p-8">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Axon Ministry Solutions
          </p>
        </div>
        {authEnabled ? (
          <div className="space-y-3">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted">
            Authentication is disabled in this environment.
          </p>
        )}
        <p className="text-center text-sm">
          <Link to="/" className="text-primary hover:underline">
            Back to templates
          </Link>
        </p>
      </div>
    </div>
  );
}
