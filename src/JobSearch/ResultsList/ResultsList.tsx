import React, { FC }  from 'react';
import styles from './styles.module.css';
import JobListing from '../JobListing/JobListing';

interface ResultsListProps {
    filteredSearchResults: any
}

const ResultsList: FC<ResultsListProps> = ({filteredSearchResults}) => {
    //console.log(filteredSearchResults)
    return (
        <div className={styles.results_list}>
        {filteredSearchResults && filteredSearchResults.map((result:any) => 
            <JobListing 
                key = {result.id}
                id = {result.id}
                company={result.company.name} 
                title={result.name} 
                locations={result.locations} 
                description={result.contents} 
            />
        )
        }
        </div>
    )
}

export default ResultsList