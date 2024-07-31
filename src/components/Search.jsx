import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../redux/actions/actions';
import { MdOutlineCancel } from "react-icons/md";
import History from './History';

const Search = () => {
    // State for the search query input
    const [query, setQuery] = useState('');
    // State for storing the search history
    const [history, setHistory] = useState([]);
    // Hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Accessing the search results, loading status, and error from the Redux store
    const { results, loading, error } = useSelector(state => state.search);

    const [temp, setTemp] = useState(false);

    // Function to handle search input changes
    const handleSearch = (e) => {
        setQuery(e.target.value);

        //If the input is empty nothing shows
        if (e.target.value === '') {
            setTemp(false)
        }

        // Dispatch search action if input length is greater than 2
        if (e.target.value.length) {
            setTemp(true)
            dispatch(fetchSearchResults(e.target.value));
        }
    };

    // Function to handle selection of a search result
    const handleSelectResult = (result) => {
        const timestamp = new Date().toLocaleString();
        // Update search history with the selected result and timestamp
        setHistory([...history, { ...result, timestamp }]);
    };

    // Function to handle deletion of a history item
    const handleDeleteResult = (index) => {
        const newHistory = [...history];
        // Remove the item at the specified index
        newHistory.splice(index, 1);
        // Update the history state
        setHistory(newHistory);
    };

    // Function to clear the entire search history
    const handleClearHistory = () => {
        setHistory([]);
    };


    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? <p key={index}
                        style={{ fontWeight: '700', fontSize: '18px', display: 'inline-block' }}>
                        {part}</p> : part
                )}
            </span>
        );
    };

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <h1>SEARCH FORM</h1>


            <div className='container'>
                {/* Search input field */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input type="text" value={query} onChange={handleSearch} placeholder="Search for titles..." style={{ border: '0', outline: '0' }} />
                    <MdOutlineCancel size='1.7rem' style={{
                        padding: '0', border: '0', cursor: 'pointer'
                    }} onClick={() => {
                        setTemp(false);
                        setQuery('')
                    }} />
                </div>
                {/* Display loading and error messages */}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {/* List of search results */}
                <ul style={{ maxHeight: '50vh', overflowY: 'scroll', marginBottom: '1rem', border: '1px solid gray' }}>
                    {temp ? results.map(result => (
                        <li key={result.id} onClick={() => handleSelectResult(result)}>
                            {highlightText(result.title, query)}
                        </li>
                    )) : null}
                </ul>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Search History</h3>
                    {/* Button to clear search history */}
                    <button onClick={handleClearHistory} style={{
                        border: '0', borderBottom: '1px solid black', backgroundColor: 'transparent', padding: '0', fontWeight: '600',
                        maxWidth: '30%', cursor: 'pointer'

                    }}>Clear search history</button>
                </div>

                {/* List of search history items */}
                <History history={history} handleDeleteResult={handleDeleteResult} />
            </div>
        </div >
    );
};

export default Search;
