
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getBlogImage, getLazyLoadingProps } from '@/utils/imageUtils';

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
  thumbnailFeatured?: string;
  category?: string; // Make category optional
  tags: string[];
  team?: string;
}

interface FeaturedBlogPostProps {
  post: BlogPost;
}

const FeaturedBlogPost: React.FC<FeaturedBlogPostProps> = ({ post }) => {
  const imageUrl = getBlogImage(post, 'featured');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Publicación Destacada</h2>
        
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <img 
                  src={imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  {...getLazyLoadingProps('/placeholder.svg')}
                />
              </Link>
            </div>
            
            <div className="p-6 md:p-8 md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                {post.category && (
                  <Badge className="bg-wem-blue">
                    {post.category}
                  </Badge>
                )}
                {post.team && (
                  <Badge variant="outline">
                    Team: {post.team}
                  </Badge>
                )}
              </div>
              
              <Link to={`/blog/${post.slug}`} className="block mb-3">
                <h3 className="text-2xl md:text-3xl font-bold hover:text-wem-blue transition-colors">
                  {post.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                {post.date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 mb-6 line-clamp-4">
                {post.excerpt}
              </p>
              
              <Link to={`/blog/${post.slug}`}>
                <Button className="bg-wem-blue hover:bg-wem-darkblue">
                  Leer artículo completo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPost;
