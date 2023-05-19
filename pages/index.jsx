import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormSearchGiphy } from "../src/components/FormSearchGiphy/FormSearchGiphy";
import { GiphyFeed } from "../src/components/GiphyFeed/GiphyFeed";
import { SEARCH_DEFAULT, API_KEY, LIMIT } from "../src/api/config";

const SearchGiphyAppHome = (initialData) => {
  const [searchGiphyResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(SEARCH_DEFAULT);
  const [formInputs, setFormInputs] = useState({});

  useEffect(() => {
    setSearchResults(initialData?.giphys?.data);
  }, [initialData]);

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <nav className="fixed left-0 top-0 flex w-full border-b border-gray-400 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          <p className="pl-24 pr-24">You can Search Giphy here</p>
          <Link href="/about" className="text-sky-500 hover:text-sky-700">
            About
          </Link>{" "}
          &nbsp;
          <Link href="/search" className="text-sky-500 hover:text-sky-700">
            Search
          </Link>
          &nbsp;
          <Link href="/search/cats">
            <a>View some cat giphys</a>
          </Link>
          &nbsp;
          <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}>
              <a> 
                {`http://localhost:3000/search/${searchTerm}`}
              </a>
      </Link>
        </nav>

        <div className="mb-6 z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="mb-1 text-4xl font-semibold pt-6 pb-6">
            Giphy Search App
          </h1>
        </div>

        {searchGiphyResults && (
          <FormSearchGiphy
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            formInputs={formInputs}
            setFormInputs={setFormInputs}
            setSearchResults={setSearchResults}
          />
        )}

        {searchGiphyResults && <GiphyFeed giphys={searchGiphyResults} />}

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Link
              href="/about"
              className="mb-3 text-2xl font-semibold text-sky-500 hover:text-sky-700"
            >
              About
            </Link>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>

            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about giphy
            </p>
          </div>
        </div>
      </main>

      <footer className="fixed text-color-white bottom-0 left-0 pl-24 pr-24 flex h-48 w-full items-end justify-center bg-color-blue from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          built by &nbsp;
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={22}
            priority
          />
        </a>

        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          deployed by &nbsp;
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>
      </footer>
    </>
  );
};

export default SearchGiphyAppHome;

export async function getServerSideProps() {
  const giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${SEARCH_DEFAULT}&api_key=${API_KEY}&limit=${LIMIT}`
  );

  const giphysData = await giphys.json();
  return { props: { giphys: giphysData } };
}
