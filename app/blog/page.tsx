import { getAllPosts } from "@/lib/blog";
import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";
import { Footer } from "@/components/footer";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPostsFilter } from "@/components/blog-posts-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Software engineering, AI, architecture, and practical development guides from Mohammed Samrose.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | mdsamrose.dev",
    description:
      "Software engineering, AI, architecture, and practical development guides from Mohammed Samrose.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | mdsamrose.dev",
    description:
      "Software engineering, AI, architecture, and practical development guides from Mohammed Samrose.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <MaxWidthWrapper>
      <main className="py-12">
        <section className="mb-10 space-y-4">
          <Badge variant="secondary" className="w-max uppercase">
            journal
          </Badge>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Blog
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Thoughts, practical guides, and system-level lessons from building
              software products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              Updated regularly
            </span>
            <span>{posts.length} published posts</span>
          </div>
        </section>

        <BlogPostsFilter posts={posts} />
      </main>
      <Footer />
    </MaxWidthWrapper>
  );
}
