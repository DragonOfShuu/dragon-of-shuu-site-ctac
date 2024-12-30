import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";
import dragonOfShuu from './dragon-of-shuu.png'
import styles from './page.module.sass'
import Image from "next/image";
import NavMargin from "@/components/nav/navBar/NavMargin";

const AboutUs = () => {
    return (
        <>
            <PageHeader fullscreen>
                <NavMargin className={`md:hidden`} />
                <div className={`flex flex-col md:flex-row-reverse items-center gap-2 size-full xl:gap-6 max-w-[1200px] self-center`}>
                    <Image src={dragonOfShuu} alt={`Dragon of Shuu profile picture art`} className={`${styles.profilePic} w-full h-auto sm:w-auto sm:h-96 xl:h-full xl:w-auto`} />
                    <EmphasizedContent alignment="left">
                        <h1 className={`lg:text-6xl`}>
                            {`A motivated developer who finds joy in coding great projects and more.`}
                        </h1>
                    </EmphasizedContent>
                </div>
            </PageHeader>
        </>
    )
}

export default AboutUs;
