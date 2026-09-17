"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createBlog, updateBlog } from "@/app/api/blogAPI";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import { formatBlogDateTime } from "@/app/lib/blog/utils";
import styles from "./BlogEditorForm.module.sass";

type Props = {
    /** Null when creating a new post; the id when editing */
    blogId: number | null;
    initialTitle?: string;
    initialImage?: string;
    initialDescription?: string;
    initialContent?: string;
};

const BlogEditorForm = ({
    blogId,
    initialTitle = "",
    initialImage = "",
    initialDescription = "",
    initialContent = "",
}: Props) => {
    const router = useRouter();
    const isEdit = blogId !== null;

    const [title, setTitle] = useState(initialTitle);
    const [image, setImage] = useState(initialImage);
    const [description, setDescription] = useState(initialDescription);
    const [content, setContent] = useState(initialContent);
    const [preview, setPreview] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    // Whether the image-name input is popped down under the image zone
    const [imageNameOpen, setImageNameOpen] = useState(false);
    // Set when the browser fails to load the named file from /blog/image/
    const [imageError, setImageError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const contentRef = useRef<HTMLTextAreaElement>(null);

    // The content box grows with the text instead of scrolling internally —
    // the page itself scrolls. Re-measure on every change and on mount.
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [content, preview]);

    // Text wraps differently at different widths, so re-measure on resize.
    useEffect(() => {
        const onResize = () => {
            const el = contentRef.current;
            if (!el) return;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Escape closes the details drawer
    useEffect(() => {
        if (!detailsOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setDetailsOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [detailsOpen]);

    const imageSrc = image.trim() ? `/blog/image/${image.trim()}` : null;
    const showImage = Boolean(imageSrc) && !imageError;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || saving) return;

        setSaving(true);
        setStatus(null);
        try {
            const input = {
                title: title.trim(),
                image: image.trim(),
                description: description.trim(),
                content,
            };
            if (isEdit) {
                const ok = await updateBlog(blogId as number, input);
                if (ok) router.push(`/dashboard/blog/${blogId}`);
                else
                    setStatus(
                        "Not saved yet — wire up the database in src/app/api/blogAPI.",
                    );
            } else {
                const newId = await createBlog(input);
                if (newId !== null) router.push(`/dashboard/blog/${newId}`);
                else
                    setStatus(
                        "Not saved yet — wire up the database in src/app/api/blogAPI.",
                    );
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            {/* Details drawer: description + future metadata live here */}
            <div
                aria-hidden={!detailsOpen}
                onClick={() => setDetailsOpen(false)}
                className={`${styles.drawerBackdrop} ${
                    detailsOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />
            <aside
                className={`${styles.drawer} ${
                    detailsOpen ? styles.drawerOpen : styles.drawerClosed
                }`}
            >
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>Post Details</span>
                    <button
                        type="button"
                        onClick={() => setDetailsOpen(false)}
                        className={styles.closeBtn}
                    >
                        Close &times;
                    </button>
                </div>

                <div className={styles.drawerField}>
                    <label htmlFor="blog-description" className={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="blog-description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="A short summary shown on the blog card"
                        className="input-box w-full resize-y"
                    />
                </div>
            </aside>

            <div>
                <span className="kicker">Dashboard / Blog</span>
                <h1 className="text-3xl md:text-4xl font-striking capitalize mt-2">
                    {isEdit ? "Edit Post" : "New Post"}
                </h1>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-orange-500/60 via-amber-500/30 to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
                <div className={styles.topbar}>
                    <Link href="/dashboard/blog" className={styles.backBtn}>
                        &larr; Back
                    </Link>
                    <span className={styles.modeLabel}>
                        {isEdit ? "Editing post" : "New post"}
                    </span>
                    <div className="flex-grow" />
                    <button
                        type="button"
                        onClick={() => setDetailsOpen((o) => !o)}
                        className={`${styles.toolBtn} ${
                            detailsOpen ? styles.toolBtnActive : ""
                        }`}
                    >
                        Details
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreview((p) => !p)}
                        className={`${styles.toolBtn} ${
                            preview ? styles.toolBtnActive : ""
                        }`}
                    >
                        {preview ? "Edit" : "Preview"}
                    </button>
                    <button
                        type="submit"
                        disabled={saving || !title.trim()}
                        className="special-button"
                        data-prominent="true"
                    >
                        {saving
                            ? "Saving..."
                            : isEdit
                              ? "Save Changes"
                              : "Create Post"}
                    </button>
                </div>

                {preview ? (
                    // Mirrors /dashboard/blog/[id] so the preview matches the published post.
                    // The timestamp is only computed here (client-side, after the user
                    // toggles preview) to keep it out of the prerendered shell.
                    <article className={styles.previewArticle}>
                        <div className={styles.previewBanner}>
                            {showImage && imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={`${title || "Untitled"} cover image`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 900px"
                                    className="object-cover"
                                />
                            ) : (
                                <BookIcon className="w-14 h-14 opacity-40 line-icon" />
                            )}
                        </div>

                        <div>
                            <h1 className={styles.previewTitle}>
                                {title.trim() || "Untitled"}
                            </h1>
                            <p className={styles.previewMeta}>
                                Written {formatBlogDateTime(new Date())}
                            </p>
                        </div>

                        <div className="glass-panel p-4 md:p-6 markdown-docs">
                            {content.trim() ? (
                                <ReactMarkdown>{content}</ReactMarkdown>
                            ) : (
                                <p className={styles.previewEmpty}>
                                    Nothing to preview yet.
                                </p>
                            )}
                        </div>
                    </article>
                ) : (
                    <>
                        {/* Title: borderless, large; the underline draws in on hover/focus */}
                        <div className={styles.titleWrap}>
                            <input
                                id="blog-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="My awesome post"
                                autoComplete="off"
                                className={styles.titleInput}
                            />
                        </div>

                        {/* Image: giant outlined placeholder, or the real image. Click to (re)open the name box. */}
                        <div className={styles.imageZone}>
                            {showImage && imageSrc ? (
                                <img
                                    src={imageSrc}
                                    alt={`${title || "Untitled"} cover`}
                                    onClick={() => setImageNameOpen(true)}
                                    onError={() => setImageError(true)}
                                    className={styles.imageShown}
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setImageNameOpen((o) => !o)
                                    }
                                    className={styles.imageBox}
                                >
                                    <span className={styles.imageBoxLabel}>
                                        Missing Image
                                    </span>
                                </button>
                            )}

                            {imageNameOpen ? (
                                <div className={styles.imageNameRow}>
                                    <input
                                        id="blog-image"
                                        type="text"
                                        value={image}
                                        onChange={(e) => {
                                            setImage(e.target.value);
                                            // Retry loading once the name changes
                                            setImageError(false);
                                        }}
                                        placeholder="cover.png (stored in public/blog/image/)"
                                        className="input-box w-full font-mono text-sm"
                                    />
                                </div>
                            ) : null}
                        </div>

                        {/* Content: writing directly on the page — no box, no scrollbar */}
                        <textarea
                            ref={contentRef}
                            id="blog-content"
                            rows={1}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="# Start writing... markdown is supported."
                            className={styles.contentBox}
                        />
                    </>
                )}

                {status ? <p className={styles.status}>{status}</p> : null}
            </form>
        </div>
    );
};

export default BlogEditorForm;
