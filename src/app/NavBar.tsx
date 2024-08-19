import HamburgerMenuIcon from "@/assets/lineIcons/hamburgerMenu.svg";
import Link from "next/link";
import LineIconButton from "@/components/LineIconButton";

type Props = {};

const NavBar = (props: Props) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50`}>
            <div className={`flex items-center h-14 px-3 py-2`}>
                <h1
                    className={`text-3xl text-amber-500 text-glow shadow-amber-500`}
                >
                    <Link href={`/`}>Dragon of Shuu</Link>
                </h1>

                <div className={`grow`} />

                <LineIconButton svg={HamburgerMenuIcon} className={`h-full`} />
            </div>
        </nav>
    );
};

export default NavBar;
