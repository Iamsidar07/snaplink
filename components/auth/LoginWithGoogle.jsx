import { Button } from "../ui/button";
import { signInWithGoogle } from "@/actions";

const LoginWithGoogle = () => {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit" variant="outline" className="w-full mt-2">
        Continue with Google
      </Button>
    </form>
  );
};

export default LoginWithGoogle;
