import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
<section className="pt-16">
  <div className="container">
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <div
          className="wow fadeInUp bg-gray-light dark:bg-gray-dark flex items-center justify-center rounded-sm px-8 py-8 sm:px-10 md:px-12 md:py-12 xl:p-14 2xl:px-16 2xl:py-14"
          data-wow-delay=".1s"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {brandsData.map((brand) => (
              <div key={brand.id} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44">
                <SingleBrand brand={brand} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



  
  
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="mx-3 flex w-full h-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image src={image} alt={name} fill />
      </a>
    </div>
  );
};
