import SpecialButton from "@/components/SpecialButton";
import { signIn } from "../lib/auth/auth";

export default function LoginPage() {
    const googleSignIn = async () => {
        "use server";

        await signIn("google");
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="non-prominent-frame flex flex-col items-stretch p-5">
                <h1>Sign In / Sign Up</h1>
                <div className="mt-8 mb-2 mx-4 h-[2px] bg-orange-400" />
                <SpecialButton onClick={googleSignIn}>
                    Google Sign In
                </SpecialButton>
            </div>
        </div>
    );
}
