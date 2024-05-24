import BackButton from "@/components/BackButton";
import MyLoader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center relative">
      <BackButton />
      <ClerkLoading>
        <MyLoader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn
          appearance={{
            elements: {
              headerTitle: "text-secondary-foreground",
              headerSubtitle: "text-secondary-foreground",
              socialButtonsBlockButton__google: "border border-muted",
              socialButtonsBlockButtonText__google: "text-secondary-foreground",
              socialButtonsBlockButtonArrow__google:
                "text-secondary-foreground",

              dividerLine: "bg-muted",
              dividerText: "text-secondary-foreground",
              formFieldLabel__identifier: "text-secondary-foreground",
              formFieldInput__identifier: "bg-muted",
              footerActionText: "text-secondary-foreground",
            },
          }}
        />
      </ClerkLoaded>
    </MaxWidthWrapper>
  );
}
