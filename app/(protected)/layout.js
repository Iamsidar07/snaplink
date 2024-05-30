import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/dashboard/Tabs";

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="no-scrollbar h-[calc(100vh-60px)] md:h-auto w-full overflow-y-scroll">
        <Tabs />
        <MaxWidthWrapper className="flex-1 ">
          <div>{children}</div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
export default DashboardLayout;
