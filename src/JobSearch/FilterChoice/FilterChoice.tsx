import React, { FC } from 'react';

interface filterChoice {
        item: {
                name: string;
                id: number;
        }
       
}

const FilterChoice: FC<filterChoice> = ({item}) => {
    const updateFilter = (item: any) => {
            console.log(item)
    }
    return (<div key={item.id}>
                <label><input type='checkbox' name={item.name} key={item.id} onChange={()=> updateFilter(item)} />{item.name}</label>
        </div>)
}

export default FilterChoice;