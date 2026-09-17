"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogType } from "@/app/lib/blog/types";
import { deleteBlogs } from "@/app/api/blogAPI";
import LineIconButton from "@/components/LineIconButton";
import SearchIcon from "@/assets/lineIcons/searchIcon.svg";
import PlusIcon from "@/assets/lineIcons/plusIcon.svg";
import TrashIcon from "@/assets/lineIcons/trashIcon.svg";
import PencilIcon from "@/assets/lineIcons/pencilIcon.svg";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import BlogCard from "./BlogCard";
import styles from "./BlogSection.module.sass";

type Props = {
    blogs: BlogType[];
};

const BlogSection = ({ blogs: initialBlogs }: Props) => {
    const router = useRouter();

    // Local copy so deletions can update the list without a refetch
    const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs);
    const [searchText, setSearchText] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleDelete = async () => {
        const ids = [...selectedIds];
        if (
            !window.confirm(
                `Delete ${ids.length} blog post${ids.length === 1 ? "" : "s"}? This cannot be undone.`,
            )
        )
            return;

        await deleteBlogs(ids);
        setBlogs((prev) => prev.filter((blog) => !ids.includes(blog.id)));
        setSelectedIds(new Set());
    };

    const handleEdit = () => {
        // The pencil only shows when exactly one blog is selected
        const [id] = [...selectedIds];
        if (id !== undefined) router.push(`/dashboard/blog/edit/${id}`);
    };

    const filteredBlogs = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        if (!query) return blogs;
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(query) ||
                blog.description.toLowerCase().includes(query) ||
                blog.content.toLowerCase().includes(query),
        );
    }, [blogs, searchText]);

    return (
        <div className={styles.wrapper}>
            <div>
                <span className="kicker">Dashboard / Blog</span>
                <h1 className="text-3xl md:text-4xl font-striking capitalize mt-2">
                    Blog
                </h1>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-orange-500/60 via-amber-500/30 to-transparent" />
            </div>

            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <SearchIcon className={`${styles.searchIcon} line-icon`} />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search your blogs..."
                        className="input-box w-full pl-9"
                    />
                </div>

                {selectedIds.size > 0 ? (
                    <span className={styles.count}>
                        {selectedIds.size} selected
                    </span>
                ) : null}

                {selectedIds.size >= 1 ? (
                    <LineIconButton
                        svg={TrashIcon}
                        iconClassName="line-icon"
                        className={styles.dangerBtn}
                        onClick={handleDelete}
                        title={`Delete ${selectedIds.size} selected blog post${
                            selectedIds.size === 1 ? "" : "s"
                        }`}
                    />
                ) : null}

                {selectedIds.size === 1 ? (
                    <LineIconButton
                        svg={PencilIcon}
                        iconClassName="line-icon"
                        className={styles.actionBtn}
                        onClick={handleEdit}
                        title="Edit selected blog post"
                    />
                ) : null}

                <LineIconButton
                    svg={PlusIcon}
                    iconClassName="line-icon"
                    className={styles.actionBtn}
                    onClick={() => router.push("/dashboard/blog/new")}
                    title="Create a new blog post"
                />
            </div>

            {filteredBlogs.length === 0 ? (
                <div className={styles.empty}>
                    <BookIcon className={`${styles.emptyIcon} line-icon`} />
                    <p className="text-orange-100/70">
                        {searchText.trim()
                            ? "No blogs match your search."
                            : "You haven't written any blogs yet. Click the + button to create one."}
                    </p>
                </div>
            ) : (
                <div className={styles.cardGrid}>
                    {filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            selected={selectedIds.has(blog.id)}
                            onToggleSelect={toggleSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogSection;
