import { GameboyScreen } from 'components/gameboy';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  // const products = await getCollectionProducts({ collection: 'the-timeless-collection' })
  return (
    <>
      <Suspense>
        <GameboyScreen products={['1', '2']} ui="collection" />
      </Suspense>
    </>
  );
}
