"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@/app/lib/blog/types";
import { formatBlogDate } from "@/app/lib/blog/utils";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import styles from "./BlogSection.module.sass";

type Props = {
    blog: BlogType;
    selected: boolean;
    onToggleSelect: (id: number) => void;
};

const BlogCard = ({ blog, selected, onToggleSelect }: Props) => {
    return (
        <div
            className={`group ${styles.card} ${
                selected ? styles.selected : ""
            }`}
        >
            <label
                className={styles.checkboxWrap}
                title={`Select "${blog.title}"`}
            >
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-amber-500 cursor-pointer"
                    checked={selected}
                    onChange={() => onToggleSelect(blog.id)}
                    aria-label={`Select "${blog.title}"`}
                />
            </label>
            <Link
                href={`/dashboard/blog/${blog.id}`}
                className="flex flex-col grow"
            >
                <div className={styles.imageWrap}>
                    {blog.image ? (
                        <Image
                            src={`/blog/image/${blog.image}`}
                            alt={`${blog.title} cover image`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <BookIcon
                            className="line-icon w-12 h-12 opacity-40"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-2 p-4 grow">
                    <h3 className="text-xl leading-snug">{blog.title}</h3>
                    {blog.description ? (
                        <p className="text-sm text-orange-100/70 leading-relaxed line-clamp-3">
                            {blog.description}
                        </p>
                    ) : null}
                    <span className="mt-auto pt-2 font-mono uppercase tracking-[0.15em] text-xs text-orange-300/60">
                        {formatBlogDate(blog.dateWritten)}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;
