import PageHeader from "@/components/PageHeader";
import dragonOfShuu from './dragon-of-shuu.png'
import styles from './page.module.sass'
import Image from "next/image";
import NavMargin from "@/components/nav/navBar/NavMargin";
import FullscreenFeature from "@/app/about/FullscreenFeature";
import CodingPatternFeature from "@/app/about/CodingPatternFeature";

const AboutUs = () => {
    return (
        <>
            <PageHeader fullscreen>
                <NavMargin className={`md:hidden`} />
                <div className={`flex flex-col md:flex-row-reverse items-center gap-2 grow xl:gap-6 self-center max-w-[1200px] overflow-hidden`}>
                    <Image src={dragonOfShuu} alt={`Dragon of Shuu profile picture art`} className={`${styles.profilePic} h-auto w-full max-w-96 md:max-w-max object-contain md:h-auto md:w-1/2`} />
                    <h1 className={`text-center md:text-left lg:text-6xl font-striking my-auto`}>
                        {`A motivated developer who finds joy in coding great projects and more.`}
                    </h1>
                </div>
            </PageHeader>
            <CodingPatternFeature/>
        </>
    )
}

export default AboutUs;
