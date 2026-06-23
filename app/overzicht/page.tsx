import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import { Subscription } from "@/lib/models/Subscription";
import { toClient } from "@/lib/serialize";
import { OverviewClient } from "@/components/OverviewClient";

export default async function OverzichtPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  await connectDB();
  const docs = await Subscription.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });
  const initial = docs.map(toClient);

  const firstName = session.user.name?.split(" ")[0];

  return <OverviewClient initial={initial} firstName={firstName} />;
}
