import Image from "next/image";
import { API_KEY, LIMIT, SEARCH } from "./config";
import Link from "next/link";
import { Suspense } from "react";
import { GiphyFeed } from "@/src/components/GiphyFeed";

async function getData() {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${SEARCH}&api_key=${API_KEY}&limit=${LIMIT}`
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const catGiphys = await res.json();

  return { catGiphys: catGiphys };
}

const Home = async () => {
  const data = await getData();
  const giphys = data.catGiphys;

  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <nav className="fixed left-0 top-0 flex w-full border-b border-gray-400 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          <p className="pl-24 pr-24">Search app</p>
          <Link href="/about" className="text-sky-500 hover:text-sky-700">
            About
          </Link>
        </nav>

        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="mb-3 text-4xl font-semibold pt-6 pb-6">
            Giphy Search App
          </h1>
        </div>

        <Suspense fallback={<p>Loading giphys ...</p>}>
          <GiphyFeed giphys={giphys.data} />
        </Suspense>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
          <div>test 1</div>
          <div>test 2</div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 pl-24 pr-24 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
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

export default Home;
