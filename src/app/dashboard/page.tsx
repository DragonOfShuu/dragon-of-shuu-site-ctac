import PageHeader from "@/components/PageHeader";
import EmphasizedContent from "@/components/EmphasizedContent";

const Dashboard = () => {
    return (
        <>
            <PageHeader fullscreen>
                <div className={`h-screen flex flex-col size-full p-4 md:p-14`}>
                    <EmphasizedContent alignment={"center"}>
                        <h1>Dashboard</h1>
                    </EmphasizedContent>
                </div>
            </PageHeader>
        </>
    );
};

export default Dashboard;
