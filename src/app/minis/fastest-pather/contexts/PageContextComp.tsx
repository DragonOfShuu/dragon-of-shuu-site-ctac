"use client"

import { ReactNode, useState } from "react";
import PageContext, { Page } from "./PageContext";


function PageContextComp(props: {children: ReactNode, defaultPage: Page}) {
    const [page, setPage] = useState<Page>(props.defaultPage)

    return (
        <PageContext.Provider value={{page: page, setPage: setPage}}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContextComp;
