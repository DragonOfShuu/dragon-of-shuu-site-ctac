import DashboardShell from "@/components/DashboardShell";
import BlogEditorForm from "../BlogEditorForm";

const NewBlogPage = () => (
    <DashboardShell>
        <BlogEditorForm blogId={null} />
    </DashboardShell>
);

export default NewBlogPage;
