import type { APIRoute } from 'astro';

// Páginas que no deben aparecer en el sitemap: el 404 y la redirección a #beneficios.
const excluded = new Set(['404', 'beneficios']);

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://grupocastaneda.com.pe');

  const urls = Object.keys(import.meta.glob('./*.astro'))
    .map((file) => file.replace('./', '').replace('.astro', ''))
    .filter((name) => !excluded.has(name))
    .sort()
    .map((name) => new URL(name === 'index' ? '/' : `/${name}/`, base).href);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((loc) => `  <url><loc>${loc}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
