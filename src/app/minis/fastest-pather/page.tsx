// import TextualHeader from "@/app/components/pageBases/TextualHeader"
import Pager from "./Pager";
import HowOnStart from "./help/HowOnStart";
import SettingsContextComp from "./contexts/SettingsContextComp";
import PageContextComp from "./contexts/PageContextComp";

const Page = () => {
    return (
        // <TextualHeader pagePadding="" childrenPadding="px-4" text="Fastest **Pather**">
        <div className={`flex-grow`}>
            <HowOnStart />
            <div className={`flex flex-col w-full flex-grow`}>
                <SettingsContextComp>
                    <Pager />
                </SettingsContextComp>
            </div>
        </div>
        // {/* // </TextualHeader> */}
    )
}

export default Page;
