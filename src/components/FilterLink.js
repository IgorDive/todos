import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({filter, children}) => {
    if (filter === "all") return (
        <NavLink exact to={""}
        activeStyle={{
            textDecoration: 'none',
            color: 'black'
        }}
        >
        {children}
        </NavLink>
    );
    
    return (
        <NavLink to={"/"+filter}
            activeStyle={{
                textDecoration: 'none',
                color: 'black'
            }}
        >
        {children}
        </NavLink>
    )
};

export default FilterLink;