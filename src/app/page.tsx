import HeaderCanvas from "./headerCanvas/HeaderCanvas";
import SpecialButton from "@/components/SpecialButton";
import Link from "next/link";
import DisableHeaderCanvas from "./DisablableHeaderCanvas";

export default function Home() {
    return (
        <div className={`h-screen relative`}>
            <DisableHeaderCanvas className={`size-full -z-10`} />
            <div
                className={`absolute inset-0 flex flex-col justify-center items-start p-4 md:p-16 space-y-5 pointer-events-none`}
            >
                <h1>Software Developer of Ten Years.</h1>
                <p className={`text-2xl lg:w-[500px] ml-2`}>
                    And it shows. An advocate of clean, consistent code, with
                    maxiumum readability and reusability. Not only that, but a
                    skilled 3D artist since 2020.
                </p>
                <SpecialButton className={`pointer-events-auto`}>
                    <Link href={`/contact`}>Contact Us</Link>
                </SpecialButton>
            </div>
        </div>
    );
}
