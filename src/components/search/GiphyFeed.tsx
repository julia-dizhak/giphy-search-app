import Image from "next/image";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  PromiseLikeOfReactNode,
} from "react";

export const GiphyFeed = ({ giphys }) => {

  return (
    <div className="mb-24">
      {!giphys && <div>No giphys</div>}

      <ul className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {giphys &&
          giphys.length > 0 &&
          giphys.map(
            (
              item: {
                title:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                images: { original: { url: string | undefined } };
                id: string
              },
              index: number
            ) => {
              return (
                <li key={item.id} className="p-6">
                  <h3>{item.title}</h3>
                  <img src={item.images.original.url} alt={item.title} />
                  {/* <Image src={item.images.original.url} alt={item.title} priority /> */}
                </li>
              );
            }
          )}
      </ul>
    </div>
  );
};
