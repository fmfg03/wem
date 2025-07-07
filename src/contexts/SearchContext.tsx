
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data - in a real app, you would fetch this from an API
import { blogPosts } from '@/data/blogPosts';

// Types
export type SearchItemType = 'product' | 'blog' | 'category' | 'industry';

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: SearchItemType;
  slug: string;
  image?: string;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: SearchItem[];
  isSearching: boolean;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  performSearch: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // This is a mock implementation - in a real app, you would fetch from an API
  const performSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(true);

    // Mock search implementation - in a real app, this would be an API call
    if (!term.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Search in product mock data
    // In a real implementation, you would search in your product data source
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
      // Add more mock products here
    ].filter(product => 
      product.title.toLowerCase().includes(lowerTerm) || 
      (product.description && product.description.toLowerCase().includes(lowerTerm))
    );

    // Search in blog posts
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

    // Search in categories
    const categoryResults: SearchItem[] = [
      { id: "cat1", title: "Bolsas para Basura", type: "category" as SearchItemType, slug: "bolsas-para-basura" },
      { id: "cat2", title: "Bolsas de Plástico", type: "category" as SearchItemType, slug: "bolsas-de-plastico" },
      { id: "cat3", title: "Polietileno en Rollo", type: "category" as SearchItemType, slug: "polietileno-en-rollo" },
      { id: "cat4", title: "Playo y Stretch", type: "category" as SearchItemType, slug: "playo-y-stretch" },
      { id: "cat5", title: "Material de Empaque", type: "category" as SearchItemType, slug: "material-de-empaque" }
    ].filter(category => 
      category.title.toLowerCase().includes(lowerTerm)
    );

    // Search in industries
    const industryResults: SearchItem[] = [
      { id: "ind1", title: "Restaurantes & Food Service", type: "industry" as SearchItemType, slug: "restaurantes" },
      { id: "ind2", title: "Construcción & Manufactura", type: "industry" as SearchItemType, slug: "construccion" },
      { id: "ind3", title: "Retail & Comercio", type: "industry" as SearchItemType, slug: "retail" },
      { id: "ind4", title: "Gobierno & Salud", type: "industry" as SearchItemType, slug: "gobierno" }
    ].filter(industry => 
      industry.title.toLowerCase().includes(lowerTerm)
    );

    // Combine and limit results
    const combined = [
      ...productResults, 
      ...blogResults, 
      ...categoryResults, 
      ...industryResults
    ].slice(0, 10);
    
    setTimeout(() => {
      setSearchResults(combined);
      setIsSearching(false);
    }, 300); // Simulate API delay
  };

  // Navigate to search results page for more comprehensive results
  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      closeSearch();
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isSearching,
        isSearchOpen,
        openSearch,
        closeSearch,
        performSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
