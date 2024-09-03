import Pager from "./Pager";
import HowOnStart from "./help/HowOnStart";
import SettingsContextComp from "./contexts/SettingsContextComp";
import NavMargin from "@/components/nav/navBar/NavMargin";

const Page = () => {
    return (
        <>
            <NavMargin />
            <div className="flex flex-grow p-12">
                <HowOnStart />
                <div className={`flex flex-col w-full flex-grow`}>
                    <SettingsContextComp>
                        <Pager />
                    </SettingsContextComp>
                </div>
            </div>
        </>
    )
}

export default Page;
