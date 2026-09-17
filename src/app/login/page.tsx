import SpecialButton from "@/components/SpecialButton";
import { signIn } from "../lib/auth/auth";

export default function LoginPage() {
    const googleSignIn = async () => {
        "use server";

        await signIn("google");
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="non-prominent-frame flex flex-col items-stretch w-full max-w-md p-6 md:p-8">
                <span className={`kicker self-start`}>Authentication</span>
                <h1>Sign In / Sign Up</h1>
                <div
                    className={`mt-4 mb-6 h-[2px] bg-gradient-to-r from-amber-400 to-orange-600/0`}
                />
                <SpecialButton onClick={googleSignIn}>
                    Google Sign In
                </SpecialButton>
            </div>
        </div>
    );
}
