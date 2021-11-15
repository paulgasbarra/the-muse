import React, { FC } from 'react';

const FilterChoice: FC<any> = ({item}) => {
    return (<div key={item.id}>
                <label><input type='checkbox' name={item.name} key={item.id} />{item.name}</label>
        </div>)
}

export default FilterChoice;