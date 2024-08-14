import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

export function truncateString(str, num, title) {
  if (str.length <= num) {
    return str;
  }
  if (title.length >= 100){
  return str.slice(0, num) + "...";
  }
  if(title.length <100 && title.lenght >= 50){
    return str.slice(0, num+50) + "...";
  }
  if(title.length <50 ){
    return str.slice(0, num+100) + "...";
  }

}


const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, imageURL, paragraph, author, tags, publishDate, article, views} = blog;
  return (
    <>
      <div
        className="wow h-[640px] mt-10 fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 dark:bg-dark"
        data-wow-delay=".1s"
      >
        <Link
          href={`/blog/${blog.id}`}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {tags[0]}
          </span>
          <Image src={imageURL[0]} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={`/blog/${blog.id}`}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-6  pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          <div dangerouslySetInnerHTML={{ __html: truncateString(article, 170, title) }}/>
         
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              
             
            </div>
            
            <div className="border-t border-body-color border-opacity-10 absolute bottom-7">
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{publishDate}</p>
            </div>
           
            <div className="inline-block ml-10">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Views
              </h4>
              <p className="flex items-center text-base text-body-color">
                        <span className="mr-3">
                          <svg
                            width="18"
                            height="10"
                            viewBox="0 0 20 12"
                            className="fill-current"
                          >
                            <path d="M10.2559 3.8125C9.03711 3.8125 8.06836 4.8125 8.06836 6C8.06836 7.1875 9.06836 8.1875 10.2559 8.1875C11.4434 8.1875 12.4434 7.1875 12.4434 6C12.4434 4.8125 11.4746 3.8125 10.2559 3.8125ZM10.2559 7.09375C9.66211 7.09375 9.16211 6.59375 9.16211 6C9.16211 5.40625 9.66211 4.90625 10.2559 4.90625C10.8496 4.90625 11.3496 5.40625 11.3496 6C11.3496 6.59375 10.8496 7.09375 10.2559 7.09375Z" />
                            <path d="M19.7559 5.625C17.6934 2.375 14.1309 0.4375 10.2559 0.4375C6.38086 0.4375 2.81836 2.375 0.755859 5.625C0.630859 5.84375 0.630859 6.125 0.755859 6.34375C2.81836 9.59375 6.38086 11.5312 10.2559 11.5312C14.1309 11.5312 17.6934 9.59375 19.7559 6.34375C19.9121 6.125 19.9121 5.84375 19.7559 5.625ZM10.2559 10.4375C6.84961 10.4375 3.69336 8.78125 1.81836 5.96875C3.69336 3.1875 6.84961 1.53125 10.2559 1.53125C13.6621 1.53125 16.8184 3.1875 18.6934 5.96875C16.8184 8.78125 13.6621 10.4375 10.2559 10.4375Z" />
                          </svg>
                        </span>
                        {views}
                      </p>
              </div>
              </div>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
