
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogPostList from '@/components/blog/BlogPostList';
import FeaturedBlogPost from '@/components/blog/FeaturedBlogPost';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

const Blog = () => {
  const [featuredPost, setFeaturedPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .is('is_featured', true)
          .order('published_at', { ascending: false })
          .limit(1)
          .single();
        
        if (!error && data) {
          setFeaturedPost({
            ...data,
            id: Number(data.id),
            date: data.published_at ? new Date(data.published_at).toLocaleDateString() : undefined,
            image: data.featured_image,
            featuredImage: data.featured_image,
            thumbnailFeatured: data.featured_image,
          });
        }
      } catch (error) {
        console.error('Error fetching featured post:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchFeaturedPost();
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogHeader />
        
        {loading ? (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <Skeleton className="h-96 w-full max-w-5xl mx-auto rounded-lg" />
            </div>
          </section>
        ) : (
          featuredPost && <FeaturedBlogPost post={featuredPost} />
        )}
        
        <section className="bg-white pt-10">
          <div className="container mx-auto px-4">
            {categoriesLoading ? (
              <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-24 rounded-full" />
                ))}
              </div>
            ) : (
              <BlogCategoryFilter 
                categories={categories}
              />
            )}
          </div>
        </section>
        
        <BlogPostList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
