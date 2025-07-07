
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BlogPostCard from './BlogPostCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  date?: string;
  image?: string;
  featuredImage?: string;
  thumbnailCard?: string;
  thumbnailFeatured?: string;
  category?: string; // Making category optional to match other interfaces
  tags: string[];
  isFeatured?: boolean;
  team?: string;
}

const BlogPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;
  
  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        // Get the total count first
        const { count, error: countError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');
        
        if (countError) throw countError;
        
        // Get paginated results
        const from = (currentPage - 1) * postsPerPage;
        const to = from + postsPerPage - 1;
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .range(from, to);
        
        if (error) throw error;
        
        if (data) {
          // Transform the data
          const formattedPosts = data.map(post => ({
            id: Number(post.id),
            title: post.title,
            excerpt: post.excerpt || '',
            content: post.content || '',
            slug: post.slug,
            author: post.author,
            date: post.published_at ? new Date(post.published_at).toLocaleDateString() : undefined,
            tags: post.tags || [],
            category: post.category || undefined,
            isFeatured: post.is_featured || false,
            team: post.team,
            image: post.featured_image,
            featuredImage: post.featured_image,
            thumbnailCard: post.featured_image,
            thumbnailFeatured: post.featured_image
          }));
          
          setBlogPosts(formattedPosts);
          setTotalPosts(count || 0);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, [currentPage]);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Publicaciones Recientes</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col h-full">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post}
                    featured={post.isFeatured}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay publicaciones disponibles en este momento.</p>
              </div>
            )}
            
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink 
                        isActive={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => paginate(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogPostList;
