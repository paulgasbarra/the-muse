import React, { FC }  from 'react';
import JobListing from '../JobListing/JobListing';

interface ResultsListProps {
    filteredSearchResults: any
}

const ResultsList: FC<ResultsListProps> = ({filteredSearchResults}) => {
    console.log(filteredSearchResults)
    return (
        <>
        {filteredSearchResults && filteredSearchResults.map((result:any) => 
            <JobListing 
                company={result.company.name} 
                title={result.name} 
                locations={result.locations} 
                description={result.contents} 
            />
        )
        }
        </>
    )
}

export default ResultsList