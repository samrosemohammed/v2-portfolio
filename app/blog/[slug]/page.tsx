import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";
import { Navbar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | mdsamrose.dev`,
      description: post.description,
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <MaxWidthWrapper>
      <main className="py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            {post.title}
          </h1>
          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <article className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
          <MDXRemote source={post.content} />
        </article>
      </main>
      <Footer />
    </MaxWidthWrapper>
  );
}
