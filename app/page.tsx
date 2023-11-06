import { GameboyScreen } from 'components/gameboy';
import { getCollectionProducts } from 'lib/shopify';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'hidden-homepage-collection' });
  // console.log(JSON.stringify(products))
  return (
    <>
      <Suspense>
        <GameboyScreen products={products} ui="collection" />
      </Suspense>
    </>
  );
}
