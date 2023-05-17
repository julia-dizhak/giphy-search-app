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
  const [searchGiphyResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(SEARCH);
  const [formInputs, setFormInputs] = useState({});

  const { data, error, isLoading } = useSWR(
    `https://api.giphy.com/v1/gifs/search?q=${SEARCH}&api_key=${API_KEY}&limit=${LIMIT}`,
    fetcher
  );

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  return (
    <>
      {isLoading && <div>Loading data ...</div>}
      {error && <div>An error has occurred.</div>}
      {searchGiphyResults && searchGiphyResults.data && (
        <FormSearchGiphy
          giphys={searchGiphyResults.data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
          setSearchResults={setSearchResults}
        />
      )}

      <Suspense fallback={<p>Loading giphys ...</p>}>
        {searchGiphyResults && <GiphyFeed giphys={searchGiphyResults.data} />}
      </Suspense>
    </>
  );
};
