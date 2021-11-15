import React, { FC } from 'react'
import styles from './styles.module.css'

interface JobListingProps {
    id: number;
    company: string,
    title: string,
    locations: {name: string}[],
    description: string,
}

const JobListing: FC<JobListingProps> = ({id, company, title, locations, description}) => {
    return (
        <div className={styles.job_listing_container} key={id}>
            <h3>{company}</h3>
            <div>{title}</div>
            <div>{locations.length > 1 ? 'Locations' : 'Location'}:</div>

            <div>{locations.map((location) => <div key={location.name}>{location.name}</div>)}</div>
           
           <div dangerouslySetInnerHTML={{__html: description.substring(0,100)}} />
        </div>
    )
}

export default JobListing