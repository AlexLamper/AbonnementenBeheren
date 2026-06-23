"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type Mode = "inloggen" | "registreren";

export function AuthForm({
  initialMode,
  googleEnabled,
}: {
  initialMode: Mode;
  googleEnabled: boolean;
}) {
  const router = useRouter();
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
      router.push("/overzicht");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
        {(["inloggen", "registreren"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setErrors({});
            }}
            className={`rounded-md py-2 text-sm font-medium capitalize transition ${
              mode === m
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "registreren" && (
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
          autoComplete={mode === "registreren" ? "new-password" : "current-password"}
          placeholder={mode === "registreren" ? "Minimaal 6 tekens" : "••••••••"}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Bezig…"
            : mode === "registreren"
              ? "Account aanmaken"
              : "Inloggen"}
        </button>
      </form>

      {googleEnabled && (
        <>
          <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            of
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/overzicht" })}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
          >
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
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            : "border-slate-300 focus:border-brand focus:ring-brand/20"
        }`}
      />
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
