import Image from "next/image";

export const GiphyFeed = ({ giphys }) => {

  return (
    <ul className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      {giphys.length > 0 &&
        giphys.map((item, index) => {
          return (
            <li key="index" className="p-6">
              <h3>{item.title}</h3>
              <img src={item.images.original.url} alt={item.title} />
              {/* <Image src={item.images.original.url} alt={item.title} priority /> */}
            </li>
          );
        })}
    </ul>
  );
};
