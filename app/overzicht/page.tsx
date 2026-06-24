import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { toClient } from "@/lib/serialize";
import { getPresets } from "@/lib/presets/store";
import { OverviewClient } from "@/components/OverviewClient";

export const metadata: Metadata = {
  title: "Mijn abonnementen",
  robots: { index: false, follow: false },
};

export default async function OverzichtPage({
  searchParams,
}: {
  searchParams: Promise<{ add?: string }>;
}) {
  const { add } = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(
      add
        ? `/login?next=${encodeURIComponent(`/overzicht?add=${add}`)}`
        : "/login"
    );
  }

  await connectDB();
  const docs = await Subscription.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });
  const initial = docs.map(toClient);

  const presets = await getPresets();
  const firstName = session.user.name?.split(" ")[0];

  return (
    <OverviewClient
      initial={initial}
      presets={presets}
      firstName={firstName}
      autoAddId={add}
    />
  );
}
