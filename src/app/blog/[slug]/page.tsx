import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { BLOG_CONTENT } from "@/lib/blog-content";
import { BLOG_POSTS } from "@/lib/constants";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="bg-sage py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-gold transition-colors hover:text-gold-light"
          >
            &larr; Back to Resources
          </Link>
          <span className="mt-6 inline-block rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold text-gold">
            {post.category}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-cream sm:text-5xl">
            {post.title}
          </h1>
          <time className="mt-4 block text-sm text-cream/70" dateTime={post.date}>
            {post.date}
          </time>
        </div>
      </section>

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {post.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-charcoal-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <CTASection
        title="Need help with your accounts?"
        description="Book a free discovery call and let's discuss how we can support your business."
      />
    </>
  );
};

export default BlogPostPage;
