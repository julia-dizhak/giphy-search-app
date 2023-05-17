
import { API_KEY, LIMIT } from "@/src/components/config";

export const FormSearchGiphy = ({
  giphys,
  searchTerm,
  setSearchTerm,
  formInputs,
  setFormInputs,
  setSearchResults,
}) => {
  const handleInputs = (event: { target: { name: string; value: string } }) => {

    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSearch = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSearchTerm(formInputs.searchTerm);

    const giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${API_KEY}&limit=${LIMIT}`
    );
    const giphysData = await giphys.json();
    setSearchResults(giphysData.data);
  };

  return (
    <div className="mb-6 mt-12 pb-12">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          className="m-2 p-2"
          name="searchTerm"
          onChange={handleInputs}
          type="text"
          required
          value={formInputs.searchTerm}
        
        />
        <button className="bg-sky-500 hover:bg-sky-700 p-6 m-2" type="submit">
          Search
        </button>
      </form>

      <h2 className="mb-12 text-2xl font-semibold pb-12">
        Search results for: {searchTerm}
      </h2>
    </div>
  );
};
