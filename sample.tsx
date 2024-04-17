import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import "./SearchBar.css";

export const SearchBar = ({ setResults, data }) => {
    const [input, setInput] = useState("");

    useEffect(()=>{
        setInput(data)
    },[data])

    const fetchData = async (value, shouldappend) => {
        try {
            await axios.post("http://localhost:5000/search", {
                query: value,
                shouldappend: shouldappend
            })
                .then((response) => setResults(response.data))
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value, false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(input, true);
    };

    const handleSearch = () => {
        fetchData(input, true);
    };

    return (
        <form className="input-wrapper" onSubmit={handleSubmit}>
            <div className="search-icon-wrapper" onClick={handleSearch}>
                <FaSearch id="search-icon" />
            </div>
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </form>
    );
};


import React from "react";

import "./SearchResult.css";

export const SearchResult = ({ result, handleClick }) => {
    return (
        <div className="search-result"
            onClick={()=>handleClick(result)}
        >
            {result}
        </div>
    );
};

import React from "react";

import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, setData }) => {
    useEffect(()=>{
        console.log("Yea")
    },[results])

    const handleClick = (s)=>{
        setData(s);
    }

    return (
        <div className="results-list">
            {results.map((result, id) => {
                return <SearchResult key={id} result={result} handleClick={handleClick} />;
            })}
        </div>
    );
};

import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

function App() {
    const [results, setResults] = useState([]);
    const [data, setData] =useState("")
    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar setResults={setResults} data={data}/>
                {/* {results && results.length > 0 && <SearchResultsList results={results} />} */}
                <SearchResultsList results={results} setData={setData}/>
            </div>
        </div>
    );
}

export default App;