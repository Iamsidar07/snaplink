import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="w-full h-full max-w-[1440px] mx-auto pb-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="md:text-lg">Insights</h3>
      </div>
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 ">
        <Skeleton className="w-full border-border rounded-lg h-64" />
        <Skeleton className="w-full border-border rounded-lg h-64" />{" "}
      </div>
      <div className="flex items-center gap-2 my-3 md:my-6">
        <h3 className="md:text-lg">Customization</h3>
      </div>
      <Skeleton className="w-full border-border rounded-lg h-64" />{" "}
    </div>
  );
}
