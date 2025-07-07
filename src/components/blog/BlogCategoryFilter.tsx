
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  activeCategory?: string;
}

const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({
  categories,
  activeCategory
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <Button
        variant={!activeCategory ? "default" : "outline"} 
        className="rounded-full"
        onClick={() => navigate('/blog')}
      >
        Todos
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? "default" : "outline"}
          className="rounded-full"
          onClick={() => navigate(`/blog/categoria/${category.slug}`)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default BlogCategoryFilter;
