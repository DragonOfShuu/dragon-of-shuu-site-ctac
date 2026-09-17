import { notFound } from "next/navigation";
import { auth } from "@/app/lib/auth/auth";
import { getBlogById } from "@/app/api/blogAPI";
import DashboardShell from "@/components/DashboardShell";
import BlogEditorForm from "../../BlogEditorForm";

// This route has a dynamic segment, so its static shell can't be
// prerendered (the root layout's NavBarProvider calls usePathname(),
// which is only available at runtime). Render it fully on demand.
export const instant = false;

type Props = {
    params: Promise<{ id: string }>;
};

const EditBlogPage = async ({ params }: Props) => {
    const { id } = await params;
    const blogId = Number(id);
    if (!Number.isInteger(blogId)) notFound();

    // The proxy already redirects unauthenticated visitors to /login,
    // but guard anyway so this page can never render someone else's data.
    const session = await auth();
    const blog = session?.user?.id ? await getBlogById(blogId) : null;
    if (!blog) notFound();

    return (
        <DashboardShell>
            <BlogEditorForm
                blogId={blog.id}
                initialTitle={blog.title}
                initialImage={blog.image}
                initialDescription={blog.description}
                initialContent={blog.content}
            />
        </DashboardShell>
    );
};

export default EditBlogPage;
