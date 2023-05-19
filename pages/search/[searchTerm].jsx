import Head from "next/head";
import { useRouter } from "next/router";
import { GiphyFeed } from "../../src/components/GiphyFeed/GiphyFeed";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Search(initialData) {
  const router = useRouter();

  const [searchGiphyResults, setSearchResults] = useState([]);
  useEffect(() => {
    setSearchResults(initialData?.giphys?.data);
  }, [initialData]);

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <Head>
        <title>Search results for: {router.query.searchTerm}</title>
        <meta
          name="description"
          content={searchGiphyResults.map((item, index) => item.title + " ")}
        ></meta>
      </Head>
      <h1>
        Search results for:<b>{router.query.searchTerm}</b>{" "}
      </h1>

      <div className="giphy-search-results-grid">
        <GiphyFeed giphys={searchGiphyResults} />
      </div>

      <p>
        Go{" "}
        <Link href="/" className="bg-sky-500 hover:bg-sky-700 rounded-sm p-2">
          <a>home</a>
        </Link>
      </p>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const searchTerm = context.query.searchTerm;

  const giphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`
  );

  const giphysData = await giphys.json();
  return { props: { giphys: giphysData } };
};
