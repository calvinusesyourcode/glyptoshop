import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative top-0 my-0 h-[8vw] w-full pt-0 leading-none">
      <div className="flex w-full items-center justify-between">
        <div className="flex">
          <MobileMenu menu={menu} />
        </div>
        {/* <div className="flex w-full">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex flex-1 md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div> */}
        <div className="flex">
          {/* <Search /> */}
          <span className="bg-gradient-to-r from-orange-300 to-purple-400 bg-clip-text py-[1vw] font-redaction text-[6vw] text-transparent">
            glyptoshop
          </span>
        </div>
        <div className="flex">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
