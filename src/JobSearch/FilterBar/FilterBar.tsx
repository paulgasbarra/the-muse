import React, { FC } from 'react'
import FilterChoice from '../FilterChoice/FilterChoice';
import styles from './styles.module.css'

// interface FilterBarProps {

// }
//company, level, location, and job category
const FilterBar: FC<any> = ({filterCriteria}) => {
    console.log({filterCriteria})
    return (
        <div className={styles.filter_bar}>
           <h2>Filters</h2>
           {filterCriteria.map((item:any) =>
                 <div key={item.name}>
                    <h3>{item.name}</h3>
                    {item.items.map((filter:any) => (<FilterChoice item={filter}/>))}
                </div>
           )}
        </div>
    )
}

export default FilterBar;