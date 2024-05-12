import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Tabs from "@/components/dashboard/Tabs";

function DashboardLayout({ children }) {
  return (
    <div className="no-scrollbar h-[calc(100vh-60px)] md:h-auto w-full overflow-y-scroll">
      <Tabs />
      <MaxWidthWrapper className="flex-1 ">
        <div>{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}
export default DashboardLayout;
