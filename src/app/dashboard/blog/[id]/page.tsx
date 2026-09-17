import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { auth } from "@/app/lib/auth/auth";
import { getBlogById } from "@/app/api/blogAPI";
import DashboardShell from "@/components/DashboardShell";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import { formatBlogDate } from "@/app/lib/blog/utils";

// This route has a dynamic segment, so its static shell can't be
// prerendered (the root layout's NavBarProvider calls usePathname(),
// which is only available at runtime). Render it fully on demand.
export const instant = false;

type Props = {
    params: Promise<{ id: string }>;
};

const BlogViewPage = async ({ params }: Props) => {
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
            <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 lg:p-8 w-full max-w-4xl mx-auto">
                <Link
                    href="/dashboard/blog"
                    className="font-mono uppercase tracking-[0.15em] text-xs md:text-sm text-orange-300/70 hover:text-white transition-colors self-start"
                >
                    &larr; Back to Blog
                </Link>

                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-orange-500/40 bg-gradient-to-br from-amber-950 via-black to-black shadow-[0_0_30px_rgba(245,158,11,0.15)] flex items-center justify-center">
                    {blog.image ? (
                        <Image
                            src={`/blog/image/${blog.image}`}
                            alt={`${blog.title} cover image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 900px"
                            className="object-cover"
                        />
                    ) : (
                        <BookIcon className="w-14 h-14 opacity-40 line-icon" />
                    )}
                </div>

                <div>
                    <h1 className="text-3xl md:text-4xl font-striking capitalize">
                        {blog.title}
                    </h1>
                    <p className="mt-2 font-mono uppercase tracking-[0.15em] text-xs md:text-sm text-orange-300/60">
                        Written {formatBlogDate(blog.dateWritten)}
                        {blog.dateEdited
                            ? ` · Edited ${formatBlogDate(blog.dateEdited)}`
                            : ""}
                    </p>
                </div>

                <div className="glass-panel p-4 md:p-6 markdown-docs">
                    <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
            </div>
        </DashboardShell>
    );
};

export default BlogViewPage;
