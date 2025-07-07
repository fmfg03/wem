
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogImage, getLazyLoadingProps } from '@/utils/imageUtils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image: string;
  category: string;
  published_at: string;
  thumbnailCard?: string;
}

interface RelatedPostsProps {
  currentPostId: number | string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setLoading(true);
      try {
        // First, get the category of the current post
        const { data: currentPost, error: currentPostError } = await supabase
          .from('blog_posts')
          .select('category')
          .eq('id', currentPostId)
          .single();
        
        if (currentPostError || !currentPost) {
          throw new Error('Failed to fetch current post category');
        }
        
        // Then, get related posts in the same category
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .eq('category', currentPost.category)
          .neq('id', currentPostId)
          .order('published_at', { ascending: false })
          .limit(3);
        
        if (relatedError) throw relatedError;
        
        let postsToShow = relatedData || [];
        
        // If we don't have enough related posts by category, get some recent posts
        if (postsToShow.length < 3) {
          const { data: recentData, error: recentError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .neq('id', currentPostId)
            .neq('category', currentPost.category) // Exclude posts with the same category (we already have those)
            .order('published_at', { ascending: false })
            .limit(3 - postsToShow.length);
          
          if (!recentError && recentData) {
            postsToShow = [...postsToShow, ...recentData];
          }
        }
        
        setRelatedPosts(postsToShow);
      } catch (error) {
        console.error('Error fetching related posts:', error);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentPostId) {
      fetchRelatedPosts();
    }
  }, [currentPostId]);
  
  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Artículos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-40 w-full" />
                  <CardHeader className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Artículos Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => {
              const imageUrl = getBlogImage({
                featuredImage: post.featured_image,
                thumbnailCard: post.thumbnailCard,
                image: post.featured_image
              }, 'card');
              
              return (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-40">
                    <img 
                      src={imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      {...getLazyLoadingProps('/placeholder.svg')}
                    />
                  </Link>
                  
                  <CardHeader className="p-4">
                    <Link to={`/blog/${post.slug}`} className="text-lg font-bold hover:text-wem-blue transition-colors line-clamp-2">
                      {post.title}
                    </Link>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="text-wem-blue text-sm font-medium mt-2 inline-block">
                      Leer más
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
