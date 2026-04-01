import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";
import { Navbar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Blog | mdsamrose.dev",
  description: "Thoughts, tutorials, and writing.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <MaxWidthWrapper>
      <main className="py-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Coming soon!</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block space-y-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-base font-medium group-hover:underline underline-offset-4">
                      {post.title}
                    </h2>
                    <time className="text-sm text-muted-foreground shrink-0">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </MaxWidthWrapper>
  );
}
