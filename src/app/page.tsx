import Link from "next/link";
import DisableableHeaderCanvas from "../components/headerCanvas/DisableableHeaderCanvas";
import EmphasizedContent from "@/components/EmphasizedContent";
import SpaceshipWithControls from "@/app/SpaceshipWithControls";

export default function Home() {
    return (
        <>
            <div className={`h-screen relative`}>
                <DisableableHeaderCanvas className={`size-full -z-10`}>
                    <SpaceshipWithControls />
                </DisableableHeaderCanvas>
                <div
                    className={`absolute inset-0 flex flex-col justify-center items-start p-4 md:p-16 space-y-5 pointer-events-none`}
                >
                    <EmphasizedContent alignment={`left`}>
                        <h1>Software Developer of Ten Years.</h1>
                    </EmphasizedContent>
                    <p className={`text-xl sm:text-2xl lg:w-[500px] ml-2`}>
                        And it shows. An advocate of clean, consistent code,
                        with maxiumum readability and reusability. Not only
                        that, but a skilled 3D artist since 2020.
                    </p>
                    <Link
                        href={`/contact`}
                        className={`special-button pointer-events-auto`}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    );
}
