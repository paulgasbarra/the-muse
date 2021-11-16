import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar'
import ResultsList from '../ResultsList/ResultsList';

interface JobListing {
    id: string;
    company: {id:string, name: string, };
}

interface filterCriteriaInterface {
    name: string; items: { name: string; id: string; }[];
}

interface JobListings extends Array<JobListing>{}

interface filterInterface {
    category: string;
    filter_property: string;
    value: any;
}

const JobSearchContainer: FC = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredSearchResults, setFilteredSearchResults] = useState([])
    const [filterCriteria, setFilterCriteria] = useState<Array<filterCriteriaInterface>>([])
    const [filters, setFilters] = useState<Array<filterInterface>>([])

    useEffect(() => {
        const filteredResults = searchResults.map(jobListing => {
            return filters.forEach(filter => jobListing[filter.category][filter.filter_property] === parseInt(filter.value))
        })
        //setFilteredSearchResults(filteredResults)
    }, [filters, searchResults])
    
    const runSearch = (searchTerm: string) => {
        setFilterCriteria([])
        //search by string
        axios.get(`https://www.themuse.com/api/public/jobs?page=1`)
                .then((res) => {
                setSearchResults(res.data.results)
                setFilteredSearchResults(res.data.results)
                buildFilters(res.data.results)  
            })
                .catch((error) => {
                console.error(error)
        })

    }

    const updateFilters = (filter: filterInterface) => {
        setFilters([...filters, filter]);
    }

    const buildFilters = (jobListings:JobListings) => {
        const companies = jobListings.map(listing => {
            return {'name': listing.company.name, 'id':listing.company.id, 'category': 'company', "updateFilter" : updateFilters}
        })
        const uniqueCompanies = companies.filter((company, index, self) => index === self.findIndex((c) => c.id === company.id)).sort((a: any,b: any) => {return a.name - b.name})
        const sortedCompanies = uniqueCompanies.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFilterCriteria([ {name: 'by Company', items: sortedCompanies}])
    };

    return (
        <div className={styles.job_container}>
            <h1>Job Search</h1>
            <SearchBar runSearch={runSearch} />
            <div className={styles.search_body}>
                <FilterBar filterCriteria={filterCriteria} />
                <ResultsList filteredSearchResults={filteredSearchResults} />
            </div>
        </div>
    )
}

export default JobSearchContainer