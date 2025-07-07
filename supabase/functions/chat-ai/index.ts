
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable not set');
    }

    const { messages, language } = await req.json();

    // Fetch product information
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        categories:category_id (name, description),
        product_specifications:product_specifications(*)
      `)
      .limit(50);

    if (productsError) {
      console.error('Error fetching products:', productsError);
    }

    // Prepare product information for the AI
    const productInfo = products ? products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || 'Sin descripción',
      category: product.categories?.name || 'Sin categoría',
      price: `$${product.price}`,
      specifications: product.product_specifications?.[0] || {},
      stock: product.stock,
      sku: product.sku
    })) : [];

    // Prepare company information
    const companyInfo = {
      name: "WEM México",
      description: "Especialistas en productos de Instrumentación, Automatización y Control Industrial.",
      shipping: "Envíos a toda la República Mexicana. Tiempo estimado de entrega: 3-5 días hábiles.",
      returns: "Política de devoluciones: 30 días para productos no utilizados en su empaque original.",
      payment: "Métodos de pago: Tarjeta de crédito, transferencia bancaria, PayPal.",
      contact: "Teléfono: +52 555 123 4567, Email: info@wemmexico.com",
      address: "Av. Insurgentes Sur 1234, Col. Del Valle, Ciudad de México, CP 03100"
    };

    // Create enhanced system message based on language
    const baseMessage = language === 'es' 
      ? "Eres un asistente de WEM México, una empresa especializada en productos de Instrumentación, Automatización y Control Industrial. Responde de manera profesional, breve y cordial en español. Ofrece ayuda técnica o información sobre productos, pero siempre sugiere contactar a un representante para consultas específicas."
      : "You are an assistant for WEM Mexico, a company specializing in Instrumentation, Automation, and Industrial Control products. Respond professionally, briefly, and politely in English. Offer technical help or product information, but always suggest contacting a representative for specific inquiries.";

    // Add product and company information to the system message
    const enhancedSystemMessage = `${baseMessage}\n\nInformación de la Empresa:\n${JSON.stringify(companyInfo, null, 2)}\n\nCatálogo de Productos (muestra):\n${JSON.stringify(productInfo, null, 2)}`;

    console.log('System message length:', enhancedSystemMessage.length);

    // Add system message at the beginning if not already included
    const formattedMessages = messages.some(msg => msg.role === 'system') 
      ? messages 
      : [{ role: 'system', content: enhancedSystemMessage }, ...messages];

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: formattedMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message;

    console.log('Received response from OpenAI');

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
