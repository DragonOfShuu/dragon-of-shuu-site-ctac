import { auth } from "@/app/lib/auth/auth";
import getBlogs from "@/app/api/blogAPI";
import DashboardShell from "@/components/DashboardShell";
import BlogSection from "./BlogSection";

// This page reads the session (cookies), which can't be prerendered into a
// static shell. It's user-specific anyway, so render it fully on demand.
export const instant = false;

const BlogPage = async () => {
    // The proxy already redirects unauthenticated visitors to /login,
    // but guard anyway so this page can never render someone else's data.
    const session = await auth();
    const blogs = session?.user?.id ? await getBlogs() : [];

    return (
        <DashboardShell>
            <BlogSection blogs={blogs} />
        </DashboardShell>
    );
};

export default BlogPage;
