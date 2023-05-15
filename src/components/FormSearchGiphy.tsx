"use client";

import { SEARCH } from "@/app/config";
import { useState } from "react";

export const FormSearchGiphy = ({ giphys }) => {
  console.log({ giphys });
  const [searchTerm, setSearchTerm] = useState(SEARCH);
  const [formInputs, setFormInputs] = useState({});

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(formInputs.searchTerm);
  };

  return (
    <div className="mb-6 mt-12 pb-12">
      <form onSubmit={handleSearch} className="mb-6">
        <input
          name="searchTerm"
          onChange={handleInputs}
          type="text"
          required
        />
        <button className="bg-sky-500 hover:bg-sky-700 p-6" type="submit">
          Search
        </button>
      </form>

      <h2 className="mb-12 text-2xl font-semibold pb-12">Search results for: {searchTerm}</h2>
    </div>
  );
};
