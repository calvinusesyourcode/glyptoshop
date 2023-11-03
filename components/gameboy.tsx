import { getCollectionProducts } from 'lib/shopify';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Gameboy() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'the-timeless-collection' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products, ...products, ...products];

  return (
    <div className=" no-scrollbar relative w-full pb-6 pt-1">
      <svg
        id="gameboy-layer-zero"
        className="absolute top-0 z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1822 914"
      >
        <defs>
          <linearGradient id="b" x1="71" y1="529" x2="1753" y2="529" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#30302e" />
            <stop offset=".004" stopColor="#3d3e3b" />
            <stop offset=".012" stopColor="#62625f" />
            <stop offset=".023" stopColor="#9d9e98" />
            <stop offset=".03" stopColor="#c5c6bf" />
            <stop offset=".202" stopColor="#bcbdb6" />
            <stop offset=".482" stopColor="#a4a49f" />
            <stop offset=".5" stopColor="#a3a39e" />
            <stop offset=".744" stopColor="#b6b7b0" />
            <stop offset=".97" stopColor="#c4c5be" />
            <stop offset=".974" stopColor="#bfc0b9" />
            <stop offset=".979" stopColor="#b1b2ac" />
            <stop offset=".985" stopColor="#9a9b95" />
            <stop offset=".99" stopColor="#7a7b76" />
            <stop offset=".996" stopColor="#52524f" />
            <stop offset="1" stopColor="#30302e" />
          </linearGradient>
          <linearGradient
            id="c"
            x1="172"
            y1="293.5"
            x2="1654"
            y2="293.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".013" stopColor="#565c66" />
            <stop offset="1" stopColor="#686471" />
          </linearGradient>
        </defs>
        <rect
          x="71"
          y="26"
          width="1682"
          height="1006"
          rx="44.729"
          ry="44.729"
          fill="url(#b)"
          strokeWidth="0"
        />
        <path
          d="m189.257,62h1447.487c9.524,0,17.257,7.732,17.257,17.257v334.778c0,61.243-49.722,110.965-110.965,110.965H189.257c-9.524,0-17.257-7.732-17.257-17.257V79.257c0-9.524,7.732-17.257,17.257-17.257Z"
          fill="url(#c)"
          strokeWidth="0"
        />
      </svg>

      <div className="absolute left-[15vw] top-[12vh] z-20 h-[40vh] w-[70vw] overflow-clip bg-gradient-to-br from-from to-to">
        <div className="flex h-full flex-col items-center justify-center">
          <ul className="flex h-fit animate-carousel gap-4">
            {carouselProducts.map((product, i) => (
              <li
                key={`${product.handle}${i}`}
                className="relative aspect-square h-[30vh] max-h-[275px] w-fit max-w-[475px] flex-none md:w-1/3"
              >
                <Link href={`/product/${product.handle}`} className="relative h-fit w-fit">
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode: product.priceRange.maxVariantPrice.currencyCode
                    }}
                    src={product.featuredImage?.url}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
