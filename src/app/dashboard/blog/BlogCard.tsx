"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@/app/lib/blog/types";
import { formatBlogDate } from "@/app/lib/blog/utils";
import BookIcon from "@/assets/lineIcons/bookIcon.svg";
import styles from "./BlogCard.module.sass";

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
                    className={styles.checkbox}
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
                            className={styles.image}
                        />
                    ) : (
                        <BookIcon
                            className={`${styles.fallbackIcon} line-icon`}
                        />
                    )}
                </div>
                <div className={styles.body}>
                    <h3 className={styles.title}>{blog.title}</h3>
                    {blog.description ? (
                        <p className={styles.desc}>{blog.description}</p>
                    ) : null}
                    <span className={styles.date}>
                        {formatBlogDate(blog.dateWritten)}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;
