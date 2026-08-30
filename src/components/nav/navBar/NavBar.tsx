// Server component — owns the LoginButton import so callers don't have to.
// All interactive behaviour lives in NavBarClient (the "use client" boundary).
import LoginButton from "@/components/nav/navBar/LoginButton";
import NavBarClient from "@/components/nav/navBar/NavBarClient";
import { Suspense } from "react";

const NavBar = () => {
    return (
        <NavBarClient
            loginButton={
                <Suspense fallback={<p>loading</p>}>
                    <LoginButton />
                </Suspense>
            }
        />
    );
};

export default NavBar;
