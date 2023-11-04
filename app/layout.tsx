import { GamebodyBody, GameboyOverlay } from 'components/gameboy';
import Navbar from 'components/layout/navbar';
import { GeistSans } from 'geist/font';
import { ensureStartsWith } from 'lib/utils';
import Image from 'next/image';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className=" overflow-clip bg-black text-white selection:bg-pink-500 selection:text-white">
        {/* <Navbar /> */}
        <Suspense>
          <main>
            <Navbar />
            <Image
              alt="fuck"
              src="/../public/gameboy-handheld-grain02.png"
              height={100}
              width={100}
              className="absolute h-[200px] w-[200px]"
            />

            <GamebodyBody>
              <GameboyOverlay>{children}</GameboyOverlay>
            </GamebodyBody>
          </main>
        </Suspense>
      </body>
    </html>
  );
}
