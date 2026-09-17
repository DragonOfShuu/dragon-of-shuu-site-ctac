/**
 * Format a blog date for display. Accepts either a Date or an ISO string,
 * since dates arrive as strings once they cross the server/client boundary.
 */
export const formatBlogDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Like formatBlogDate but includes the time — used by the editor preview,
 * which shows a live "written" timestamp for posts that aren't saved yet.
 */
export const formatBlogDateTime = (date: Date | string): string => {
    return new Date(date).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
