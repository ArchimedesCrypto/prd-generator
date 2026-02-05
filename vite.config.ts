import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// Fetch blog routes from SEObot for sitemap generation
async function getBlogRoutes(apiKey: string | undefined) {
  console.log('🔑 API Key found:', apiKey ? 'Yes' : 'No');
  
  if (!apiKey) {
    console.warn('⚠️ VITE_SEOBOT_API_KEY not found, sitemap will only include static routes');
    return [];
  }

  try {
    const url = `https://app.seobotai.com/api/sitemap?key=${apiKey}`;
    console.log('📡 Fetching blog routes from SEObot...');
    
    const response = await fetch(url);
    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      console.warn('❌ Failed to fetch SEObot sitemap, status:', response.status);
      const errorText = await response.text();
      console.warn('Error response:', errorText);
      return [];
    }
    
    const result: any = await response.json();
    console.log('📦 API Response structure:', JSON.stringify(result, null, 2));
    
    const data = result?.data || {};
    console.log('📄 Data keys:', Object.keys(data));
    
    const routes = [
      ...(data.articles || []).map((article: any) => `/blog/${article.slug}`),
      ...(data.categories || []).map((cat: any) => `/blog/category/${cat.slug}`),
      ...(data.tags || []).map((tag: any) => `/blog/tag/${tag.slug}`),
    ];
    
    console.log(`✅ Generated ${routes.length} blog routes for sitemap`);
    console.log('Sample routes:', routes.slice(0, 5));
    return routes;
  } catch (error) {
    console.error('💥 Error fetching blog routes:', error);
    return [];
  }
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const dynamicRoutes = mode === 'production' ? await getBlogRoutes(env.VITE_SEOBOT_API_KEY) : [];
  
  // All static routes that exist in the app
  const staticRoutes = [
    '/auth',
    '/app',
    '/history',
    '/blog',
  ];
  
  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "production" && Sitemap({
        hostname: 'https://yourdomain.com',
        dynamicRoutes: allRoutes,
        changefreq: 'daily',
        priority: {
          '/': 1.0,
          '/blog': 0.9,
          '/blog/*': 0.8,
          '/app': 0.7,
          '/auth': 0.5,
          '/history': 0.7,
        },
        lastmod: new Date(),
        readable: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
