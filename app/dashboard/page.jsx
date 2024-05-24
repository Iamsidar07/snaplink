import config from "@/config";
import { constructMetadata, convertToTimeAgo } from "@/utils";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ActivityIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import CreateLink from "@/components/CreateLink";
import TopPerformingLinks from "@/components/dashboard/TopPerformingLinks";

export const metadata = constructMetadata({
  title: "Dashboard | Snaplink",
});

// All shorturls for dashboard
export const getShortLinks = async ({ userId }) => {
  const res = await fetch(`${config.domain}/api/shortUrls?userId=${userId}`);
  const data = await res.json();
  return data;
};

export const formatter = Intl.NumberFormat("en-US", {});

export default async function Page() {
  const { userId } = auth();
  const data = await getShortLinks({ userId });
  console.log("got: ", data);
  if (!data) notFound();

  const totalLinks = data.length;
  const totalClicks = data.reduce((prev, curr) => {
    return prev + curr.clicks;
  }, 0);
  const recentLinks = data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="p-3">
      <div className="flex items-center justify-end mb-4">
        <CreateLink />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800 dark:text-gray-50">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <LinkIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <h3 className="text-2xl font-semibold">
              {formatter.format(totalLinks)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Total Links</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:text-gray-50">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
            <ActivityIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <h3 className="text-2xl font-semibold">
              {formatter.format(totalClicks)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Clicks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
        <Card className="">
          <CardHeader>
            <CardTitle>Recent Links</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Link</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLinks?.map((link) => (
                  <TableRow key={link.createdAt}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Link
                          className="truncate font-medium text-gray-900 dark:text-gray-50"
                          href={link.originalUrl}
                        >
                          {link.originalUrl}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-50">
                      {link.clicks}
                    </TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400 text-nowrap">
                      {convertToTimeAgo(new Date(link.createdAt))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <TopPerformingLinks />
      </div>
    </div>
  );
}
