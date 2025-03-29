import {useState} from "react";

export const useSearch = (fetchAPI) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearch = async (searchText) => {
        if (!searchText) return; // Don't fetch if searchText is empty
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchAPI(searchText)
            const data = await response.json();
            setResults(data); // Assuming the API returns an array of objects
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fetchSearch,   // Expose the API call function
        results,
        isLoading,
        error,
    };
};

