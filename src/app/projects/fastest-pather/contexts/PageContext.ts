import { createContext, useContext } from "react";

export type Page = "SIZER" | "PAINTER" | "RUNNER";

export type PageContextType = {
    page: Page;
    setPage: (newPage: Page) => any;
};

const PageContext = createContext<null | PageContextType>(null);

export const usePages = () => {
    return useContext(PageContext) as PageContextType;
};

export default PageContext;
