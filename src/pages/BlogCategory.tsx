
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from '@/components/ui/skeleton';
import BlogPostCard from '@/components/blog/BlogPostCard';

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
  category?: string; // Make category optional
  tags: string[];
  isFeatured?: boolean;
  team?: string;
}

interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

const BlogCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryNotFound, setCategoryNotFound] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<BlogCategory | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
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
          
          // Find the current category
          const category = data.find(cat => cat.slug === slug);
          if (category) {
            setCurrentCategory(category);
          } else {
            setCategoryNotFound(true);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [slug]);

  useEffect(() => {
    if (!currentCategory) return;

    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        // Get the total count first
        const { count, error: countError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('category', currentCategory.name);
        
        if (countError) throw countError;
        
        // Get paginated results
        const from = (currentPage - 1) * postsPerPage;
        const to = from + postsPerPage - 1;
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .eq('category', currentCategory.name)
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
  }, [currentCategory, currentPage]);
  
  // Redirect if category not found
  if (categoryNotFound && !categoriesLoading) {
    return <Navigate to="/blog" replace />;
  }

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogHeader />
        
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
                activeCategory={slug}
              />
            )}
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {currentCategory && (
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">{currentCategory.name}</h2>
                {currentCategory.description && (
                  <p className="text-gray-600 max-w-3xl mx-auto">{currentCategory.description}</p>
                )}
              </div>
            )}
            
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
                    <p className="text-gray-500">No hay publicaciones disponibles en esta categoría.</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default BlogCategory;
