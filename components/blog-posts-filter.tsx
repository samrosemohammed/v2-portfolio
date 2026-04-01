"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

type BlogPostsFilterProps = {
  posts: BlogPost[];
};

export function BlogPostsFilter({ posts }: BlogPostsFilterProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }

    return ["all", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag =
        activeTag === "all" || (post.tags ?? []).includes(activeTag);

      if (!matchesTag) return false;

      if (!normalizedQuery) return true;

      const haystack = [post.title, post.description, ...(post.tags ?? [])]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, activeTag]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section className="space-y-5">
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, topic, or tag..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {tag === "all" ? "All" : tag}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-background/70 px-6 py-10 text-center">
          <p className="text-sm font-medium text-foreground">
            No matching posts
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another keyword or choose a different tag.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent/30"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <time className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      Read
                      <ArrowUpRight size={13} />
                    </span>
                  </div>

                  <h2 className="mb-2 text-base font-semibold text-foreground">
                    {post.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
