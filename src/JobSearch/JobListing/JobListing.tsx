import React, { FC } from 'react'
import styles from './styles.module.css'

interface JobListingProps {
    company: string,
    title: string,
    locations: {name: string}[],
    description: string,
}

const JobListing: FC<JobListingProps> = ({company, title, locations, description}) => {
    return (
        <div className={styles.container}>
            <h3>{company}</h3>
            <div>{title}</div>
            <div>{locations.length > 1 ? 'Locations' : 'Location'}:</div>

            <div>{locations.map((location) => <div>{location.name}</div>)}</div>
           
           <div dangerouslySetInnerHTML={{__html: description.substring(0,100)}} />
        </div>
    )
}

export default JobListing