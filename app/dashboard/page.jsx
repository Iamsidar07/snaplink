import { constructMetadata } from "@/lib/utils";
import CreateLink from "@/components/CreateLink";
import TopPerformingLinks from "@/components/dashboard/TopPerformingLinks";
import RecentLinks from "@/components/dashboard/RecentLinks";
import { auth } from "@/auth";
import TotalLinks from "@/components/dashboard/TotalLinks";
import { signIn } from "@/auth/helpers";
import TotalClicks from "@/components/dashboard/TotalClicks";

export const metadata = constructMetadata({
  title: "Dashboard | Snaplink",
});

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    signIn();
  }
  return (
    <div className="p-3">
      <div className="flex items-center justify-end mb-4">
        <CreateLink />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalLinks />
        <TotalClicks />
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
        <RecentLinks />
        <TopPerformingLinks />
      </div>
    </div>
  );
}
