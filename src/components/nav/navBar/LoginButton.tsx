import Link from "next/link";
import SpecialButton from "@/components/SpecialButton";
import { auth } from "@/app/lib/auth/auth";
import LoggedInDropdown from "./LoggedInDropdown";

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

    return <LoggedInDropdown name={name} email={email} image={image} />;
};

export default LoginButton;
