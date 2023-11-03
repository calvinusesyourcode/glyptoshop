import { Gameboy } from 'components/gameboy';
import Navbar from 'components/layout/navbar/index';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <div className="h-screen overflow-clip">
          <Navbar />
          <Gameboy />
        </div>
      </Suspense>
    </>
  );
}
