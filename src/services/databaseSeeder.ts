
import { supabase } from "@/integrations/supabase/client";
import { SAMPLE_PRODUCTS as productData } from "@/data/productData";
import { generateSlug } from "@/utils/slugUtils";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface SeedStats {
  categories: number;
  products: number;
  specifications: number;
  mediaFiles: number;
  blogPosts: number;
}

// Convert the sample product data to the database format
const convertToDbFormat = (products: any[]) => {
  const categories = new Map<string, string>();
  const dbProducts = [];
  const productSpecifications = [];
  const mediaFiles = [];
  
  for (const product of products) {
    // Generate a slug for the category if it doesn't exist
    if (!categories.has(product.category)) {
      categories.set(product.category, generateSlug(product.category));
    }
    
    // Create a slug for the product
    const slug = generateSlug(product.name);
    
    // Process product image if available
    let imageUrl = product.image;
    if (imageUrl && !imageUrl.includes('supabase.co')) {
      // This is a sample image, we'll prepare it for upload to Supabase later
      const fileId = uuidv4();
      const fileName = `${fileId}-product-${slug}.jpg`;
      const filePath = `uploads/${fileName}`;
      
      // Add to media files for later processing
      mediaFiles.push({
        id: fileId,
        product_slug: slug,
        original_url: imageUrl,
        file_path: filePath,
        file_name: fileName,
        original_name: `product-${slug}.jpg`,
      });
      
      // Update the image URL to point to where it will be in Supabase
      imageUrl = `https://murxvnwhxvtfkajcwenw.supabase.co/storage/v1/object/public/media/${filePath}`;
    }
    
    // Create the database product object
    const dbProduct = {
      name: product.name,
      description: product.description || null,
      category: product.category,
      slug: slug,
      sku: product.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      price: product.price || 0,
      stock: product.stock || 0,
      weight: product.weight || 0.1,
      featured: product.featured || false,
      image: imageUrl || null
    };
    
    dbProducts.push(dbProduct);
    
    // Create specifications if available
    if (product.specifications || product.technical) {
      const spec = {
        product_slug: slug, // We'll use this to link to the product later
        medida: product.specifications?.medida || null,
        color: product.specifications?.color || null,
        calibre: product.specifications?.calibre || null,
        calidad: product.specifications?.calidad || null,
        tipo_camiseta: product.technical?.tipoCamiseta || false,
        suaje_reforzado: product.technical?.suajeReforzado || false,
        polipapel: product.technical?.polipapel || false,
        compostable: product.technical?.compostable || false
      };
      
      productSpecifications.push(spec);
    }
  }
  
  return {
    categories: Array.from(categories.entries()).map(([name, slug]) => ({ name, slug, description: null })),
    products: dbProducts,
    specifications: productSpecifications,
    mediaFiles
  };
};

// Function to seed the database
export const seedDatabase = async (): Promise<SeedStats> => {
  const stats: SeedStats = {
    categories: 0,
    products: 0,
    specifications: 0,
    mediaFiles: 0,
    blogPosts: 0
  };
  
  try {
    // Convert sample data to database format
    const { categories, products, specifications, mediaFiles } = convertToDbFormat(productData);
    
    // Ensure the media bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error("Error checking buckets:", bucketsError);
    } else if (!buckets.some(b => b.name === 'media')) {
      const { error } = await supabase.storage.createBucket('media', { public: true });
      if (error) console.error("Error creating media bucket:", error);
      else console.log("Created media bucket");
    }
    
    // Insert categories
    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .insert(category)
        .select();
        
      if (!error) {
        stats.categories++;
      }
    }
    
    // Get all categories to map names to IDs
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id, name');
      
    const categoryMap = new Map<string, string>();
    if (categoryData) {
      categoryData.forEach(cat => categoryMap.set(cat.name, cat.id));
    }
    
    // Insert products
    for (const product of products) {
      const categoryId = categoryMap.get(product.category);
      
      if (categoryId) {
        const { data, error } = await supabase
          .from('products')
          .insert({
            name: product.name,
            description: product.description,
            category_id: categoryId,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            weight: product.weight,
            featured: product.featured,
            image: product.image,
            slug: product.slug
          })
          .select();
          
        if (!error && data) {
          stats.products++;
          
          // Find the corresponding specifications
          const spec = specifications.find(s => s.product_slug === product.slug);
          if (spec && data[0].id) {
            // Insert specifications
            const { error: specError } = await supabase
              .from('product_specifications')
              .insert({
                product_id: data[0].id,
                medida: spec.medida,
                color: spec.color,
                calibre: spec.calibre,
                calidad: spec.calidad,
                tipo_camiseta: spec.tipo_camiseta,
                suaje_reforzado: spec.suaje_reforzado,
                polipapel: spec.polipapel,
                compostable: spec.compostable
              });
              
            if (!specError) {
              stats.specifications++;
            }
          }
        }
      }
    }
    
    // Process media files for the products
    // This implementation doesn't fetch and upload external images yet
    // In a real app, you would download the images and upload them to Supabase Storage
    // But for this example, we'll just create the metadata entries
    for (const media of mediaFiles) {
      const { error } = await supabase
        .from('media_files')
        .insert({
          id: media.id,
          filename: media.file_name,
          original_name: media.original_name,
          file_path: media.file_path,
          file_type: 'image/jpeg', // Assumed for sample data
          file_size: 100000, // Placeholder size
          public_url: media.original_url // Use original URL for now
        });
        
      if (!error) {
        stats.mediaFiles++;
      }
    }
    
    // Seed some sample blog posts if the blog_posts table exists
    const sampleBlogPosts = [
      {
        title: "Innovaciones en empaques sustentables",
        slug: "innovaciones-empaques-sustentables",
        content: "<p>Los empaques sustentables están revolucionando la industria...</p>",
        excerpt: "Descubre las últimas innovaciones en empaques ecológicos para reducir el impacto ambiental.",
        author: "María Rodríguez",
        category: "Sustentabilidad",
        tags: ["ecológico", "biodegradable", "innovación"],
        status: "published",
        featured_image: "https://source.unsplash.com/random/1200x800/?sustainable-packaging",
        thumbnailCard: "https://source.unsplash.com/random/600x400/?sustainable-packaging",
        thumbnailFeatured: "https://source.unsplash.com/random/800x500/?sustainable-packaging",
        is_featured: true,
        team: "Sustentabilidad",
        published_at: new Date().toISOString()
      },
      {
        title: "Guía para seleccionar el empaque adecuado",
        slug: "guia-seleccion-empaque-adecuado",
        content: "<p>Elegir el empaque correcto es esencial para proteger tus productos...</p>",
        excerpt: "Aprende a seleccionar el empaque ideal para tus productos según tus necesidades específicas.",
        author: "Carlos González",
        category: "Guías",
        tags: ["selección", "optimización", "protección"],
        status: "published",
        featured_image: "https://source.unsplash.com/random/1200x800/?packaging-guide",
        thumbnailCard: "https://source.unsplash.com/random/600x400/?packaging-guide",
        thumbnailFeatured: "https://source.unsplash.com/random/800x500/?packaging-guide",
        is_featured: false,
        team: "Ventas",
        published_at: new Date().toISOString()
      }
    ];

    for (const blogPost of sampleBlogPosts) {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: blogPost.title,
          slug: blogPost.slug,
          content: blogPost.content,
          excerpt: blogPost.excerpt,
          author: blogPost.author,
          category: blogPost.category,
          tags: blogPost.tags,
          status: blogPost.status,
          featured_image: blogPost.featured_image,
          published_at: blogPost.published_at
        });
        
      if (!error) {
        stats.blogPosts++;
      }
    }
    
    return stats;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

// Function to check if the database is empty
export const isDatabaseEmpty = async (): Promise<boolean> => {
  try {
    // Check if there are any products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (productsError) throw productsError;
    
    // If there are no products, the database is considered empty
    return !products || products.length === 0;
  } catch (error) {
    console.error("Error checking if database is empty:", error);
    return false; // Assume not empty if there's an error
  }
};
