"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { FormSearchGiphy } from "./FormSearchGiphy";
import { GiphyFeed } from "./GiphyFeed";
import { API_KEY, LIMIT, SEARCH } from "@/src/components/config";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export const SearchGiphy = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.giphy.com/v1/gifs/search?q=${SEARCH}&api_key=${API_KEY}&limit=${LIMIT}`,
    fetcher
  );

  const [searchGiphyResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  console.log({ searchGiphyResults });

  return (
    <>
      {isLoading && <div>Loading data ...</div>}
      {error && <div>An error has occurred.</div>}
      {searchGiphyResults && (
        <FormSearchGiphy giphys={searchGiphyResults.data} />
      )}

      <Suspense fallback={<p>Loading giphys ...</p>}>
        {searchGiphyResults && <GiphyFeed giphys={searchGiphyResults.data} />}
      </Suspense>
    </>
  );
};
