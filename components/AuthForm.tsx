"use client";

import { useId, useState } from "react";
import { siGoogle } from "simple-icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type Mode = "inloggen" | "registreren";

export function AuthForm({
  initialMode,
  googleEnabled,
  next,
}: {
  initialMode: Mode;
  googleEnabled: boolean;
  next?: string;
}) {
  const router = useRouter();
  // Alleen interne paden toestaan om open-redirects te voorkomen.
  const dest =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/overzicht";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (mode === "registreren" && !name.trim()) {
      next.name = "Vul je naam in.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Vul een geldig e-mailadres in.";
    }
    if (password.length < 6) {
      next.password = "Gebruik minimaal 6 tekens.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === "registreren") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          toast.error(data.error ?? "Registreren mislukt");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        toast.error("E-mailadres of wachtwoord is onjuist");
        return;
      }
      router.push(dest);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const isRegister = mode === "registreren";

  return (
    <div className="mt-5">
      <h1 className="font-display text-[32px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[34px]">
        {isRegister ? "Maak je gratis account" : "Welkom terug"}
      </h1>
      <p className="mt-2 text-[15px] text-slate-500">
        {isRegister
          ? "Al een account? Kies hieronder Inloggen."
          : "Nog geen account? Kies hieronder Registreren."}
      </p>

      <div
        role="tablist"
        aria-label="Inloggen of registreren"
        className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-[#e6eef1] p-1"
      >
        {(["inloggen", "registreren"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setErrors({});
            }}
            className={`rounded-full py-2.5 text-sm capitalize transition ${
              mode === m
                ? "bg-navy font-bold text-white shadow-sm"
                : "font-semibold text-slate-600 hover:text-slate-900"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {isRegister && (
          <Field
            label="Naam"
            type="text"
            value={name}
            onChange={(v) => {
              setName(v);
              if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
            }}
            autoComplete="name"
            placeholder="Je naam"
            error={errors.name}
          />
        )}
        <Field
          label="E-mailadres"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          autoComplete="email"
          placeholder="naam@voorbeeld.nl"
          error={errors.email}
        />
        <Field
          label="Wachtwoord"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (errors.password)
              setErrors((e) => ({ ...e, password: undefined }));
          }}
          autoComplete={isRegister ? "new-password" : "current-password"}
          placeholder={isRegister ? "Minimaal 6 tekens" : "••••••••"}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={loading}
          className="h-[50px] w-full rounded-full bg-mint font-bold text-mint-ink transition hover:bg-mint-light disabled:opacity-50"
        >
          {loading ? "Bezig…" : isRegister ? "Account aanmaken" : "Inloggen"}
        </button>
      </form>

      {googleEnabled && (
        <>
          <div className="my-5 flex items-center gap-3 text-sm text-slate-500">
            <span className="h-px flex-1 bg-line" />
            of
            <span className="h-px flex-1 bg-line" />
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: dest })}
            className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-slate-300 bg-white font-semibold text-slate-900 transition hover:bg-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d={siGoogle.path} fill="#4285F4" />
            </svg>
            Doorgaan met Google
          </button>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-fout` : undefined}
        className={`h-12 w-full rounded-[14px] border bg-white px-4 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
          error
            ? "border-red-600 focus:ring-red-500/15"
            : "border-slate-300 focus:border-mint focus:ring-mint/20"
        }`}
      />
      {error && (
        <p id={`${id}-fout`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
