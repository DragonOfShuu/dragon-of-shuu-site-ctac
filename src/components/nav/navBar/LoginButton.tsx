import Link from "next/link";
import SpecialButton from "@/components/SpecialButton";
import { auth } from "@/app/lib/auth/auth";
import Image from "next/image";

const LoginButton = async () => {
    const session = await auth();
    const email = session?.user?.email;
    const name = session?.user?.name;
    const image = session?.user?.image;

    if (!email) {
        return (
            <Link href="/login">
                <SpecialButton notProminent>Sign In</SpecialButton>
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4 rounded-full xl:rounded-xl bg-orange-950/75 hover:bg-orange-900 p-1 xl:px-4 xl:py-1 max-w-72 overflow-hidden">
            <Image
                src={image || "/default-profile.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full aspect-square"
            />
            <div className="hidden xl:flex flex-col w-full items-stretch overflow-hidden">
                <span className="text-xl truncate w-full">
                    {name || email.split("@")[0]}
                </span>
                <span
                    className="text-orange-400 text-sm font-medium truncate max-w-full"
                    title={email}
                >
                    {email}
                </span>
            </div>
        </div>
    );
};

export default LoginButton;
