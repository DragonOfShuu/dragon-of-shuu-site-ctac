import PageHeader from "@/components/PageHeader";
import dragonOfShuu from './dragon-of-shuu.png'
import styles from './page.module.sass'
import Image from "next/image";
import NavMargin from "@/components/nav/navBar/NavMargin";
import CodingPatternFeature from "@/app/about/CodingPatternFeature";
import EmphasizedContent from "@/components/EmphasizedContent";
import TimelineFeature from "@/app/about/TimelineFeature";

const AboutUs = () => {
    return (
        <>
            <PageHeader fullscreen>
                <div className={`md:h-screen flex flex-col size-full`}>
                    <NavMargin className={`md:hidden`} />
                    <EmphasizedContent alignment={'center'}>
                        <h1>
                            About Us
                        </h1>
                    </EmphasizedContent>
                    <div className={`flex flex-col md:flex-row-reverse items-center gap-2 grow xl:gap-6 self-center md:max-w-[1200px]`}>
                        <Image src={dragonOfShuu} alt={`Dragon of Shuu profile picture art`} className={`${styles.profilePic} h-auto w-full max-w-96 md:max-w-max object-contain md:h-full md:w-1/2`} />
                        <h1 className={`text-center md:text-left lg:text-6xl font-striking my-auto`}>
                            {`A motivated developer who finds joy in coding great projects and more.`}
                        </h1>
                    </div>
                </div>
            </PageHeader>
            <CodingPatternFeature/>
            <TimelineFeature />
        </>
    )
}

export default AboutUs;
