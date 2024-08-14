import React, { useState } from 'react';
import { Card } from '../Card/Card.jsx';
import './List.scss';
import { useFetch } from '../../hooks/useFetch.js';

export function List({ catId, maxPrice, sort, subCats }) {

    // Construct the query string
    const queryParams = `/products?populate=*&[filters][categories][id]=${catId}`
        + subCats.map((item) => `&[filters][sub_categories][id][$eq]=${item}`).join('')
        + `&[filters][price][$lte]=${maxPrice}`
        + `&sort=price:${sort}`;

    // Fetch data using the constructed query string
    const { data, loading, error } = useFetch(queryParams);

    console.log(data);

    return (
        <>
            <div className="list">
                {loading ?
                    "loading" :
                    data?.map((item) =>
                        <Card item={item} key={item.id} />
                    )}
            </div>
        </>
    )
}