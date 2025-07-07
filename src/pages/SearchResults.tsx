import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingBag, FileText, Tag, Building, Loader2 } from 'lucide-react';
import { useSearch, SearchItem, SearchItemType } from '@/contexts/SearchContext';
import ProductCard from '@/components/ProductCard';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { useLocale } from '@/contexts/LocaleContext';
import { blogPosts } from '@/data/blogPosts';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const { searchTerm, setSearchTerm, performSearch } = useSearch();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLocale();
  
  // Results state
  const [results, setResults] = useState<{
    products: SearchItem[];
    blogs: SearchItem[];
    categories: SearchItem[];
    industries: SearchItem[];
  }>({
    products: [],
    blogs: [],
    categories: [],
    industries: []
  });

  // Format blog posts for display
  const formattedBlogPosts = results.blogs.map(item => {
    const blogPost = blogPosts.find(post => post.id.toString() === item.id);
    return blogPost || {
      id: parseInt(item.id),
      title: item.title,
      excerpt: item.description || '',
      content: '',
      slug: item.slug,
      author: 'WEM México',
      date: '2025-01-01',
      image: item.image || '',
      category: 'Blog',
      tags: []
    };
  });

  useEffect(() => {
    // Set the search term from URL
    if (query && query !== searchTerm) {
      setSearchTerm(query);
      performSearch(query);
    }

    // Simulate more comprehensive search for the search results page
    const fetchSearchResults = async () => {
      setIsLoading(true);
      
      // Here you would typically call your API
      // This is a mock implementation
      
      // In a real implementation, you would:
      // 1. Call your backend API with the search term
      // 2. Get categorized results back

      const mockSearch = () => {
        const lowerTerm = query.toLowerCase();
        
        // Mock product results
        const productResults: SearchItem[] = [
          {
            id: "1",
            title: "Bolsa para Basura Natural 90x120",
            description: "Bolsa para basura natural calibre 600, resistente para uso industrial",
            type: "product" as SearchItemType,
            slug: "bolsa-basura-natural-90x120",
            image: "https://images.unsplash.com/photo-1613149778612-28072ae467c2?q=80&w=2070"
          },
          {
            id: "2",
            title: "Bolsa Negra Extra Resistente 60x90",
            description: "Bolsa para basura negra de alta densidad, resistente a la perforación",
            type: "product" as SearchItemType,
            slug: "bolsa-negra-extra-resistente-60x90",
            image: "https://images.unsplash.com/photo-1620673399864-1e31d2959be5?q=80&w=2070"
          },
          {
            id: "7",
            title: "Bolsa en Rollo Natural 20x30 PCM",
            description: "Bolsa en rollo natural de polietileno, ideal para embalaje y protección de productos",
            type: "product" as SearchItemType,
            slug: "bolsa-rollo-natural-20x30",
            image: "/lovable-uploads/0365f9d9-0ec7-42b5-8814-7c6233785eb0.png"
          }
        ].filter(item => 
          item.title.toLowerCase().includes(lowerTerm) || 
          (item.description && item.description.toLowerCase().includes(lowerTerm))
        );
        
        // Blog results
        const blogResults: SearchItem[] = blogPosts
          .filter(post => 
            post.title.toLowerCase().includes(lowerTerm) || 
            post.excerpt.toLowerCase().includes(lowerTerm) ||
            post.content.toLowerCase().includes(lowerTerm)
          )
          .map(post => ({
            id: post.id.toString(),
            title: post.title,
            description: post.excerpt,
            type: "blog" as SearchItemType,
            slug: post.slug,
            image: post.image
          }));
        
        // Category results
        const categoryResults: SearchItem[] = [
          { id: "cat1", title: "Bolsas para Basura", type: "category" as SearchItemType, slug: "bolsas-para-basura" },
          { id: "cat2", title: "Bolsas de Plástico", type: "category" as SearchItemType, slug: "bolsas-de-plastico" },
          { id: "cat3", title: "Polietileno en Rollo", type: "category" as SearchItemType, slug: "polietileno-en-rollo" },
          { id: "cat4", title: "Playo y Stretch", type: "category" as SearchItemType, slug: "playo-y-stretch" },
          { id: "cat5", title: "Material de Empaque", type: "category" as SearchItemType, slug: "material-de-empaque" }
        ].filter(item => 
          item.title.toLowerCase().includes(lowerTerm)
        );
        
        // Industry results
        const industryResults: SearchItem[] = [
          { id: "ind1", title: "Restaurantes & Food Service", type: "industry" as SearchItemType, slug: "restaurantes" },
          { id: "ind2", title: "Construcción & Manufactura", type: "industry" as SearchItemType, slug: "construccion" },
          { id: "ind3", title: "Retail & Comercio", type: "industry" as SearchItemType, slug: "retail" },
          { id: "ind4", title: "Gobierno & Salud", type: "industry" as SearchItemType, slug: "gobierno" }
        ].filter(item => 
          item.title.toLowerCase().includes(lowerTerm)
        );
        
        return {
          products: productResults,
          blogs: blogResults,
          categories: categoryResults,
          industries: industryResults
        };
      };
      
      // Simulate API delay
      setTimeout(() => {
        const searchResults = mockSearch();
        setResults(searchResults);
        setIsLoading(false);
      }, 500);
    };
    
    fetchSearchResults();
  }, [query, performSearch, searchTerm, setSearchTerm]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
    
    // Update URL without reload
    const newUrl = `/buscar?q=${encodeURIComponent(searchTerm)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  const totalResults = 
    results.products.length + 
    results.blogs.length + 
    results.categories.length + 
    results.industries.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('search.results_title')}</h1>
      
      {/* Search form */}
      <form onSubmit={handleSearchSubmit} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-wem-blue hover:bg-wem-darkblue">
            {t('search.button')}
          </Button>
        </div>
      </form>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-wem-blue" />
        </div>
      ) : (
        <>
          {/* Results summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              {totalResults === 0
                ? t('search.no_results_for')
                : t('search.results_count')}
            </p>
          </div>
          
          {totalResults > 0 ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="all" className="flex items-center gap-1">
                  <Search className="h-4 w-4" />
                  {t('search.all')} ({totalResults})
                </TabsTrigger>
                {results.products.length > 0 && (
                  <TabsTrigger value="products" className="flex items-center gap-1">
                    <ShoppingBag className="h-4 w-4" />
                    {t('search.products')} ({results.products.length})
                  </TabsTrigger>
                )}
                {results.blogs.length > 0 && (
                  <TabsTrigger value="blogs" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {t('search.blog_posts')} ({results.blogs.length})
                  </TabsTrigger>
                )}
                {results.categories.length > 0 && (
                  <TabsTrigger value="categories" className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {t('search.categories')} ({results.categories.length})
                  </TabsTrigger>
                )}
                {results.industries.length > 0 && (
                  <TabsTrigger value="industries" className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {t('search.industries')} ({results.industries.length})
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                {/* Products section */}
                {results.products.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      {t('search.products')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {results.products.map((product, idx) => (
                        <ProductCard
                          key={`all-product-${product.id}`}
                          id={product.id}
                          name={product.title}
                          description={product.description || ''}
                          image={product.image || ''}
                          category=""
                          price={99} // Mock price
                          inStock={true}
                          featured={false}
                          slug={product.slug}
                          specifications={{}}
                          technical={{}}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Blog posts section */}
                {results.blogs.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      {t('search.blog_posts')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {formattedBlogPosts.map((post, idx) => (
                        <BlogPostCard key={`all-blog-${post.id}`} post={post} />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Categories section */}
                {results.categories.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Tag className="h-5 w-5 mr-2" />
                      {t('search.categories')}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {results.categories.map((category) => (
                        <li key={`all-category-${category.id}`}>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left h-auto py-3"
                            asChild
                          >
                            <a href={`/categoria/${category.slug}`}>
                              <Tag className="h-4 w-4 mr-2" />
                              {category.title}
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Industries section */}
                {results.industries.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      {t('search.industries')}
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {results.industries.map((industry) => (
                        <li key={`all-industry-${industry.id}`}>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left h-auto py-3"
                            asChild
                          >
                            <a href={`/industria/${industry.slug}`}>
                              <Building className="h-4 w-4 mr-2" />
                              {industry.title}
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
              
              {/* Products tab */}
              <TabsContent value="products">
                {results.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.products.map((product) => (
                      <ProductCard
                        key={`tab-product-${product.id}`}
                        id={product.id}
                        name={product.title}
                        description={product.description || ''}
                        image={product.image || ''}
                        category=""
                        price={99} // Mock price
                        inStock={true}
                        featured={false}
                        slug={product.slug}
                        specifications={{}}
                        technical={{}}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-10">
                    {t('search.no_results_in_category')}
                  </p>
                )}
              </TabsContent>
              
              {/* Blog posts tab */}
              <TabsContent value="blogs">
                {formattedBlogPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formattedBlogPosts.map((post) => (
                      <BlogPostCard key={`tab-blog-${post.id}`} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-10">
                    {t('search.no_results_in_category')}
                  </p>
                )}
              </TabsContent>
              
              {/* Categories tab */}
              <TabsContent value="categories">
                {results.categories.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.categories.map((category) => (
                      <li key={`tab-category-${category.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto py-3"
                          asChild
                        >
                          <a href={`/categoria/${category.slug}`}>
                            <Tag className="h-4 w-4 mr-2" />
                            {category.title}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 py-10">
                    {t('search.no_results_in_category')}
                  </p>
                )}
              </TabsContent>
              
              {/* Industries tab */}
              <TabsContent value="industries">
                {results.industries.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.industries.map((industry) => (
                      <li key={`tab-industry-${industry.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto py-3"
                          asChild
                        >
                          <a href={`/industria/${industry.slug}`}>
                            <Building className="h-4 w-4 mr-2" />
                            {industry.title}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 py-10">
                    {t('search.no_results_in_category')}
                  </p>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {t('search.no_results_title')}
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {t('search.no_results_description')}
              </p>
              <div className="space-y-2">
                <p className="font-medium">{t('search.suggestions')}:</p>
                <ul className="text-gray-600 list-disc list-inside text-left max-w-md mx-auto">
                  <li>{t('search.suggestion_1')}</li>
                  <li>{t('search.suggestion_2')}</li>
                  <li>{t('search.suggestion_3')}</li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
