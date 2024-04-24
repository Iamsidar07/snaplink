import { constructMetadata } from "@/utils";
import Image from "next/image";
export const metadata = constructMetadata({
  title: "Not found",
});

export default function NotFound() {
  return (
    <Image
      alt="page not found"
      src={"/page-not-found.png"}
      width={1024}
      height={1024}
      className="max-w-xl mx-auto"
    />
  );
}
