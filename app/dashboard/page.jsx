import ShortUrlForm from "@/components/ShortUrlForm";
import config from "@/config/config";
import { constructMetadata } from "@/utils";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { DataTable } from "./data-table";
import RenderQrCode from "@/components/RenderQrCode";
import { columns } from "@/app/dashboard/columns";
import RenderChart from "@/components/RenderChart";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { formatDistance } from "date-fns";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertToTimeAgo } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Dashboard | Snaplink",
});

export const fetData = async ({ userId }) => {
  const res = await fetch(`${config.domain}/api/url?userId=${userId}`);
  return await res.json();
};
export default async function Page() {
  const { userId } = auth();
  const data = await fetData({ userId });
  if (!data) notFound();

  const totalLinks = data.length;
  const totalClicks = data.reduce((prev, curr) => {
    return prev + curr.clicks;
  }, 0);
  const recentLinks = data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const formatter = Intl.NumberFormat("en-US", {});

  const clicksHighToLow = data?.sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const formattedData = clicksHighToLow?.map((item) => {
    const domain = new URL(item.actualUrl).host;
    return {
      domain,
      clicks: item.clicks,
    };
  });

  return (
    <div className="p-5">
      <div className="grid grid-cols-2 gap-6">
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
      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <Card className="dark:bg-gray-800 dark:text-gray-50">
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
                          href={link.actualUrl}
                        >
                          {link.actualUrl}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-gray-50">
                      {link.clicks}
                    </TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">
                      {convertToTimeAgo(new Date(link.createdAt))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">Create new link</CardTitle>
          </CardHeader>
          <CardContent>
            <ShortUrlForm />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
          </CardHeader>
          <CardContent>
            <RenderChart data={formattedData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
