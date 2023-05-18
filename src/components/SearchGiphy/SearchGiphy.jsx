import { useState, useEffect } from "react";
import { API_KEY, LIMIT, SEARCH_DEFAULT } from "/src/api/config";
import { GiphyFeed } from "../GiphyFeed/GiphyFeed";

export const SearchGiphy = (initialData) => {
  const [searchGiphyResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(SEARCH_DEFAULT);
  const [formInputs, setFormInputs] = useState({});

  useEffect(() => {
    console.log(initialData);
    setSearchResults(initialData?.catGiphys?.data);
  }, [initialData]);

  return (
    <>
      {/* {isLoading && <div>Loading data ...</div>}
      {error && <div>An error has occurred.</div>}  */}
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

      {searchGiphyResults && <GiphyFeed giphys={searchGiphyResults.data} />}
    </>
  );
};

export async function getServerSideProps() {
  const catGiphys = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${SEARCH_DEFAULT}&api_key=${API_KEY}&limit=${LIMIT}`
  );

  const catGiphysData = await catGiphys.json();
  return { props: { catGiphys: catGiphysData } };
}
