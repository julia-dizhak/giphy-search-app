import { API_KEY, LIMIT } from "../../api/config";

export const FormSearchGiphy = ({
  searchTerm,
  setSearchTerm,
  formInputs,
  setFormInputs,
  setSearchResults,
}) => {
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=${API_KEY}&limit=${LIMIT}`
    );
    const giphysData = await giphys.json();
    setSearchResults(giphysData.data);
    setSearchTerm(formInputs.searchTerm);
  };

  return (
    <div className="mb-6 mt-12 bg-slate-300 p-6 rounded-sm">
      <form onSubmit={handleSearch} className="mb-6 rounded-sm">
        <input
          className="m-2 p-2"
          name="searchTerm"
          onChange={handleInputs}
          type="text"
          required
          value={formInputs.searchTerm}
        />
        <button
          className="bg-sky-500 hover:bg-sky-700 p-2 m-2 rounded-sm"
          type="submit"
        >
          Search
        </button>
      </form>

      <h2 className="mb-2 text-2xl font-semibold pb-2">
        Search results for: {searchTerm}
      </h2>
    </div>
  );
};
