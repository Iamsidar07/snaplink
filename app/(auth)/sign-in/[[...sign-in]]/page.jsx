import BackButton from "@/components/BackButton";
import MyLoader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative w-full">
      <BackButton />
      <ClerkLoading>
        <MyLoader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </MaxWidthWrapper>
  );
}
