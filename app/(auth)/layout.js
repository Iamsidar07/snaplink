import { constructMetadata } from "@/lib/utils";
export const metadata = constructMetadata({
  title: "Auth | Snaplink",
});
export default async function AuthRootLayout({ children }) {
  return (
    <>
      <div className="w-52 h-52 absolute left-0 top-[12rem] filter blur-[12rem] bg-gradient-to-r from-yellow-900 to-transparent" />
      <div className="p-2 sm:p-0">{children}</div>
    </>
  );
}
