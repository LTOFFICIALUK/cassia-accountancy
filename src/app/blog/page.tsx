import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Helpful articles on Making Tax Digital, bookkeeping, tax returns, VAT and cloud accounting for small businesses.",
};

const BlogPage = () => {
  return (
    <>
      <Hero
        headline="Resources & Insights"
        subheading="Practical guides to help you understand your finances and stay on top of your obligations."
        ctaText="Book a Free Discovery Call"
        ctaHref="/contact"
        imageSrc="/images/blog-hero.jpg"
        compact
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Latest Articles"
            subtitle="Clear, practical advice for small business owners — no jargon, no fluff."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-xl border border-sage/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md"
              >
                <span className="inline-block self-start rounded-full bg-sage/10 px-3 py-1 text-xs font-semibold text-sage">
                  {post.category}
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-sage transition-colors group-hover:text-gold">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-charcoal-light">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <time className="text-xs text-charcoal-light" dateTime={post.date}>
                    {post.date}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a question about your accounts?"
        description="Our articles are a great starting point — but nothing beats a conversation. Book your free discovery call today."
      />
    </>
  );
};

export default BlogPage;
