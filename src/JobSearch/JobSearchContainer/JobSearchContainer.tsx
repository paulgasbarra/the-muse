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
            filters.forEach(filter => jobListing[filter.category][filter.filter_property] == filter.value)
        })
        console.log('filteredResults', filteredResults)
        // setFilteredSearchResults(filteredResults)
    }, [filters])
    
    const runSearch = (searchTerm: string) => {
        const apiKey = 'cb00038c45ba64fa1b75b82dfd713cfe41684bec8b4595044266496bc4edd2c0';
        //search by string
        axios.get('https://www.themuse.com/api/public/jobs?page=1')
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
        setFilters([...filters, {category: 'company', filter_property: 'id', value: '11802'}])
        const companies = jobListings.map(listing => {
            return {'name': listing.company.name, 'id':listing.company.id, 'category': 'company', "updateFilter" : updateFilters}
        })
        const uniqueCompanies = companies.filter((company, index, self) => index === self.findIndex((c) => c.id === company.id)).sort((a: any,b: any) => {return a.name - b.name})
        const sortedCompanies = uniqueCompanies.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFilterCriteria([...filterCriteria, {name: 'by Company', items: sortedCompanies}])
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