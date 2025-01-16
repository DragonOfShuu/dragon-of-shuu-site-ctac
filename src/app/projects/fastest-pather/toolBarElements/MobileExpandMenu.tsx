import ToolBarButton from "@/app/projects/fastest-pather/toolBarElements/ToolBarButton";
import { ReactNode, useState } from "react";

type MobileExpandMenuPropType = {
    children: ReactNode;
};

const MobileExpandMenu = (props: MobileExpandMenuPropType) => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const showHideMenu = () => {
        setMenuVisible((v) => !v);
    };

    return (
        <>
            <div className={`relative h-full`}>
                <ToolBarButton
                    onClick={showHideMenu}
                    text={`^`}
                    className={`lg:hidden h-full`}
                />
                <div
                    className={`h-full lg:block lg:static ${menuVisible ? `absolute z-40` : `hidden`}`}
                >
                    <div
                        className={`flex flex-row items-stretch gap-1 lg:gap-2 flex-wrap lg:flex-nowrap lg:h-full w-max max-w-64 mt-2 lg:mt-0 p-3 lg:p-0 lg:w-auto backdrop-blur-sm rounded-md bg-orange-500/50 lg:bg-transparent`}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileExpandMenu;
