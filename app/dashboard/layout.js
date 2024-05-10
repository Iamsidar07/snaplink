import Sidebar from "@/components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full">
      <div className="w-[250px] z-10 border-r">
        <Sidebar />
      </div>
      <div className="flex-1 ">
        <div>{children}</div>
      </div>
    </div>
  );
}
export default DashboardLayout;
