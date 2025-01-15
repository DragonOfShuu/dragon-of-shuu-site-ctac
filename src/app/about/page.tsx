import PageHeader from "@/components/PageHeader";
import dragonOfShuu from './dragon-of-shuu.png'
import styles from './page.module.sass'
import Image from "next/image";
import NavMargin from "@/components/nav/navBar/NavMargin";
import CodingPatternFeature from "@/app/about/CodingPatternFeature";
import EmphasizedContent from "@/components/EmphasizedContent";
import TimelineFeature from "@/app/about/TimelineFeature";

const AboutMe = () => {
    return (
        <>
            <PageHeader fullscreen>
                <div className={`h-screen flex flex-col size-full p-4 md:p-14`}>
                    <NavMargin className={`md:hidden`} />
                    <EmphasizedContent alignment={'center'}>
                        <h1>
                            About Me
                        </h1>
                    </EmphasizedContent>
                    <div className={`flex flex-col md:flex-row-reverse items-center gap-2 grow basis-0 min-h-0 xl:gap-6 self-center md:max-w-[1200px]`}>
                        <Image src={dragonOfShuu} alt={`Dragon of Shuu profile picture art`} className={`${styles.profilePic} grow basis-0 min-h-0 max-w-96 object-contain md:w-1/2`} />
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

export default AboutMe;
