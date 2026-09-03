import SidebarTab from "@/components/SidebarTab";
import DashboardIcon from "@/assets/lineIcons/dashboardIcon.svg";
import MailIcon from "@/assets/lineIcons/mailIcon.svg";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import SearchIcon from "@/assets/lineIcons/searchIcon.svg";

const DashboardSidebar = () => {
    return (
        <div className="min-w-64 basis-0 flex flex-col gap-1 items-stretch justify-normal">
            <SidebarTab href={`/dashboard`} label="Dashboard">
                <DashboardIcon />
            </SidebarTab>
            <SidebarTab href={`/dashboard/inbox`} label="Inbox">
                <MailIcon />
            </SidebarTab>
            <SidebarTab href={`/dashboard/blog`} label="Blog">
                <BookIcon />
            </SidebarTab>
            <SidebarTab href={`/dashboard/users`} label="Users">
                <SearchIcon />
            </SidebarTab>
        </div>
    );
};

export default DashboardSidebar;
