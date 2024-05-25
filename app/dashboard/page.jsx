import config from "@/config";
import { constructMetadata, numberFormatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ActivityIcon, LinkIcon } from "lucide-react";
import CreateLink from "@/components/CreateLink";
import TopPerformingLinks from "@/components/dashboard/TopPerformingLinks";
import { getTotalClicks } from "@/actions";
import RecentLinks from "@/components/dashboard/RecentLinks";

export const metadata = constructMetadata({
  title: "Dashboard | Snaplink",
});

// All shorturls for dashboard
export const getShortLinks = async ({ userId }) => {
  const res = await fetch(`${config.domain}/api/shortUrls?userId=${userId}`);
  const data = await res.json();
  return data;
};

export default async function Page() {
  const { userId } = auth();
  const data = await getShortLinks({ userId });
  const totalClicks = await getTotalClicks();
  console.log({totalClicks})
  if (!data) notFound();
  const totalLinks = data.length;
  const recentLinks = data.slice(0, 5);

  return (
    <div className="p-3">
      <div className="flex items-center justify-end mb-4">
        <CreateLink />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <LinkIcon className="h-8 w-8 text-gray-300" />
            <h3 className="text-2xl font-semibold">
              {numberFormatter.format(totalLinks)}
            </h3>
            <p className="">Total Links</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <ActivityIcon className="h-8 w-8 text-gray-300" />
            <h3 className="text-2xl font-semibold">
              {numberFormatter.format(totalClicks)}
            </h3>
            <p className="">Clicks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
        <RecentLinks recentLinks={recentLinks || []} />
        <TopPerformingLinks />
      </div>
    </div>
  );
}
