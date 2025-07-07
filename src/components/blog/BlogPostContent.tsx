
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
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
  thumbnailCard?: string;
  thumbnailFeatured?: string;
  category?: string; // Make category optional
  tags: string[];
  isFeatured?: boolean;
  team?: string;
}

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const imageUrl = getBlogImage(post, 'page');
  const categorySlug = post.category ? post.category.toLowerCase().replace(/\s+/g, '-') : '';

  return (
    <article className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-wem-blue">Inicio</Link>
            {' > '}
            <Link to="/blog" className="hover:text-wem-blue">Blog</Link>
            {post.category && (
              <>
                {' > '}
                <Link to={`/blog/categoria/${categorySlug}`} className="hover:text-wem-blue">{post.category}</Link>
              </>
            )}
            {' > '}
            <span className="text-gray-700">{post.title}</span>
          </div>
          
          {/* Post Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
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
            {post.category && (
              <Link to={`/blog/categoria/${categorySlug}`}>
                <Badge className="bg-wem-blue">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.category}
                </Badge>
              </Link>
            )}
            {post.team && (
              <Badge variant="outline">
                Team: {post.team}
              </Badge>
            )}
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={post.title} 
              className="w-full h-auto"
              {...getLazyLoadingProps('/placeholder.svg')}
            />
          </div>
          
          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Etiquetas:</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/blog/etiqueta/${tag.toLowerCase()}`}>
                  <Badge variant="outline" className="hover:bg-gray-100">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Social Share */}
          <div className="border-t border-b py-6 my-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h4 className="font-semibold flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir este artículo:
              </h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda con tus empaques?</h3>
            <p className="mb-4">Nuestros expertos están listos para asesorarte y ofrecerte las mejores soluciones.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/contacto">
                <Button className="bg-wem-blue hover:bg-wem-darkblue">
                  Contactar Ahora
                </Button>
              </Link>
              <Link to="/cotizar">
                <Button variant="outline" className="border-wem-blue text-wem-blue hover:bg-wem-lightblue">
                  Solicitar Cotización
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostContent;
