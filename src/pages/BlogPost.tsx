
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostContent from '@/components/blog/BlogPostContent';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  published_at: string;
  featured_image: string;
  category: string;
  tags: string[];
  status: string;
  team?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(false);
      
      try {
        if (!slug) {
          setError(true);
          return;
        }
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();
        
        if (error) {
          console.error('Error fetching blog post:', error);
          setError(true);
          return;
        }
        
        if (data) {
          setPost(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error in blog post fetch:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-80 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Publicación no encontrada</h1>
            <p className="mb-6">Lo sentimos, la publicación que buscas no existe o ha sido eliminada.</p>
            <Link to="/blog" className="flex items-center justify-center text-wem-blue hover:text-wem-darkblue">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format the post for the components
  const formattedPost = {
    ...post,
    id: Number(post.id), // Convert to number for component compatibility
    date: post.published_at ? new Date(post.published_at).toLocaleDateString() : '',
    image: post.featured_image,
    featuredImage: post.featured_image
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogPostContent post={formattedPost} />
        <RelatedPosts currentPostId={post.id} />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
