import React, { FC, useState } from 'react';
import styles from './styles.module.css'

interface SearchBarProps {
  runSearch: any;
}

const SearchBar: FC<SearchBarProps> = ({runSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setSearchTerm(event.target.value);
     };

    const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        runSearch(searchTerm)
    }

    return (
        <>
          <form onSubmit={submitSearch}>
            <input
            className={styles.searchBar}
            type="text"
            placeholder="Enter a job title..."
            value={searchTerm}
            onChange={handleChange}
            />
          </form>
      </>
    )

}

export default SearchBar;