import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar'
import ResultsList from '../ResultsList/ResultsList';
import styles from './styles.module.css'

const JobSearchContainer: FC = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredSearchResults, setFilteredSearchResults] = useState([])
    
    const runSearch = (searchTerm: string) => {
        const apiKey = 'cb00038c45ba64fa1b75b82dfd713cfe41684bec8b4595044266496bc4edd2c0';
        axios.get('https://www.themuse.com/api/public/jobs?page=1')
                .then((res) => {
                setSearchResults(res.data.results)
                setFilteredSearchResults(res.data.results)
                    console.log(res.data.results)
            })
                .catch((error) => {
                console.error(error)
        })

    }

    useEffect(()=> {
       // const locations = searchResults.map(result => result);
        //setLocations(locations)
    }, [searchResults])

    return (
        <div className={styles.container} >
            <h1>Job Search</h1>
            <SearchBar runSearch={runSearch} />
            <FilterBar filterResults={searchResults} />
            <ResultsList filteredSearchResults={filteredSearchResults} />
        </div>
    )
}

export default JobSearchContainer