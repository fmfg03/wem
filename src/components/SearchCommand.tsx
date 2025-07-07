
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import { Loader2, Search, ShoppingBag, FileText, Tag, Building } from 'lucide-react';
import { useSearch, SearchItem } from '@/contexts/SearchContext';
import { useLocale } from '@/contexts/LocaleContext';

export function SearchCommand() {
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    isSearching, 
    isSearchOpen, 
    closeSearch, 
    performSearch 
  } = useSearch();
  
  const navigate = useNavigate();
  const { t } = useLocale();
  const [isMounted, setIsMounted] = useState(false);

  // Only initialize in the browser to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isSearchOpen ? closeSearch() : isSearchOpen;
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isSearchOpen, closeSearch]);

  const handleSelect = (item: SearchItem) => {
    closeSearch();
    
    // Navigate based on the item type
    switch (item.type) {
      case 'product':
        navigate(`/producto/${item.slug}`);
        break;
      case 'blog':
        navigate(`/blog/${item.slug}`);
        break;
      case 'category':
        navigate(`/categoria/${item.slug}`);
        break;
      case 'industry':
        navigate(`/industria/${item.slug}`);
        break;
      default:
        navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    performSearch(value);
  };

  const handleViewAll = () => {
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
      closeSearch();
    }
  };

  if (!isMounted) return null;

  // Group results by type
  const productResults = searchResults.filter(item => item.type === 'product');
  const blogResults = searchResults.filter(item => item.type === 'blog');
  const categoryResults = searchResults.filter(item => item.type === 'category');
  const industryResults = searchResults.filter(item => item.type === 'industry');

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={closeSearch}>
      <CommandInput 
        placeholder={t('search.placeholder')}
        value={searchTerm}
        onValueChange={handleSearch}
      />
      <CommandList>
        {isSearching ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-wem-blue" />
          </div>
        ) : (
          <>
            <CommandEmpty>
              <p className="text-center py-4 text-sm text-muted-foreground">
                {t('search.no_results')}
              </p>
            </CommandEmpty>
            
            {productResults.length > 0 && (
              <CommandGroup heading={t('search.products')}>
                {productResults.map((item) => (
                  <CommandItem 
                    key={`product-${item.id}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <ShoppingBag className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {blogResults.length > 0 && (
              <CommandGroup heading={t('search.blog_posts')}>
                {blogResults.map((item) => (
                  <CommandItem 
                    key={`blog-${item.id}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <FileText className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {categoryResults.length > 0 && (
              <CommandGroup heading={t('search.categories')}>
                {categoryResults.map((item) => (
                  <CommandItem 
                    key={`category-${item.id}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {industryResults.length > 0 && (
              <CommandGroup heading={t('search.industries')}>
                {industryResults.map((item) => (
                  <CommandItem 
                    key={`industry-${item.id}`}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {searchResults.length > 0 && (
              <>
                <CommandSeparator />
                <CommandItem 
                  onSelect={handleViewAll}
                  className="justify-center text-center text-sm text-wem-blue hover:text-wem-darkblue font-medium"
                >
                  {t('search.view_all_results')}
                </CommandItem>
              </>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
