
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Tag, Calendar, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '@/contexts/SearchContext';
import { useLocale } from '@/contexts/LocaleContext';
import { supabase } from '@/integrations/supabase/client';

interface BlogCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

const BlogHeader = () => {
  const { t } = useLocale();
  const { searchTerm, setSearchTerm, performSearch } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true })
          .limit(3);
          
        if (error) throw error;
        
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchTopCategories();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      setSearchTerm(localSearchTerm);
      navigate(`/buscar?q=${encodeURIComponent(localSearchTerm)}`);
    }
  };

  return (
    <section className="bg-gradient-to-r from-wem-blue to-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blog.header.title')}</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          {t('blog.header.subtitle')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/blog/categoria/${category.slug}`}>
              <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                <Tag className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder={t('search.blog_placeholder')}
            className="w-full px-5 py-3 rounded-full border-none focus:ring-2 focus:ring-wem-green text-black"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          <Button 
            className="absolute right-1 top-1 rounded-full bg-wem-green hover:bg-wem-darkgreen h-10 px-4"
            type="submit"
          >
            <Search className="h-4 w-4 mr-1" />
            {t('search.button')}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BlogHeader;
