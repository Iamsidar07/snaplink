import { signIn } from "@/auth";
import { Button } from "../ui/button";

const LoginWithGoogle = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="outline" className="w-full mt-2">
        Continue with Google
      </Button>
    </form>
  );
};

export default LoginWithGoogle;
