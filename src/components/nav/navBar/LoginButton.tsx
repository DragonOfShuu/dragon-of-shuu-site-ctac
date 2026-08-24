import Link from "next/link";
import SpecialButton from "@/components/SpecialButton";
// import { auth } from "@/app/lib/auth/auth";
// import { use } from "react";

const LoginButton = async () => {
    // const session = use(auth());
    // const email = session?.user?.email;

    // if (email) {
    //     return (
    //         <span
    //             className="text-orange-400 text-sm font-medium truncate max-w-[160px]"
    //             title={email}
    //         >
    //             {email}
    //         </span>
    //     );
    // }

    return (
        <Link href="/login">
            <SpecialButton notProminent>Sign In</SpecialButton>
        </Link>
    );
};

export default LoginButton;
