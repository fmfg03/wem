
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, User, Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
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
  thumbnailCard?: string;
  thumbnailFeatured?: string;
  category?: string; // Make category optional
  tags: string[];
  isFeatured?: boolean;
  team?: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  const imageContext = featured ? 'featured' : 'card';
  const imageUrl = getBlogImage(post, imageContext);

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
        <img 
          src={imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
          {...getLazyLoadingProps('/placeholder.svg')}
        />
      </Link>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          {post.category && (
            <Badge className="bg-wem-blue hover:bg-wem-darkblue">
              {post.category}
            </Badge>
          )}
          {post.date && (
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-3 w-3 mr-1" />
              {post.date}
            </div>
          )}
        </div>
        <Link to={`/blog/${post.slug}`} className="text-xl font-bold hover:text-wem-blue transition-colors">
          {post.title}
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
        
        {post.team && (
          <div className="mt-2 text-sm text-gray-500">
            Team: {post.team}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <User className="h-3 w-3 mr-1" />
          <span>{post.author}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="text-wem-blue hover:text-wem-darkblue text-sm font-medium">
          Leer más
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
