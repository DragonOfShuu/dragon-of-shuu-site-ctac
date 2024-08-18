// import styles from './NavBar.module.sass'
import Image from "next/image";
import HamburgerMenuIcon from "@/app/assets/lineIcons/hamburgerMenu.svg";

type Props = {};

const NavBar = (props: Props) => {
    return (
        <nav className={`fixed top-0 left-0 right-0`}>
            <div className={`flex items-stretch h-20 px-3 py-2`}>
                <h1 className={`text-5xl`}>Dragon of Shuu</h1>

                <div className={`flex grow justify-end`}>
                    {/* <Image src={hamburgerMenuIcon} alt={`Hamburger Icon`} className={`line-icon h-full w-auto`} /> */}
                    <HamburgerMenuIcon className={`line-icon h-full w-auto`} />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
