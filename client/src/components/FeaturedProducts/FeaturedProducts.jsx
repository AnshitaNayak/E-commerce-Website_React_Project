import React from "react";
import './FeaturedProducts.scss';
import { Card } from "../Card/Card.jsx";
import { useFetch } from "../../hooks/useFetch.js";

export function FeaturedProducts({ type }) {

    const { data, loading, error } = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`);

    return (
        <>
            <div className="featuredProducts">
                <div className="top">
                    <h1>{type} Products</h1>
                    <p>
                        Aliqua est dolor adipisicing veniam sint veniam consequat tempor laborum sunt mollit. Laboris ad magna consectetur nulla quis irure mollit. Commodo cillum eu consectetur eu consequat ad sunt ullamco cillum eiusmod aliqua ipsum. Enim consequat in pariatur ea do. Ullamco ullamco veniam cillum eu sint magna eu est non id tempor. Velit ut incididunt proident culpa.
                        Magna excepteur veniam exercitation ipsum eiusmod. Dolor culpa minim velit Lorem qui qui do consectetur veniam non sit aliqua. Est eiusmod consectetur aliquip ea laborum laboris qui dolor incididunt culpa culpa incididunt. Deserunt esse esse incididunt ullamco laboris anim occaecat ea ex exercitation cillum id. Ad consectetur enim pariatur ut veniam. Veniam minim non amet consequat enim. Irure ea fugiat fugiat aliquip nulla sint commodo.
                    </p>
                </div>

                <div className="bottom">
                    {
                        error ? "Something went wrong!" :
                            loading ? "loading" :
                                data?.map((item) => <Card item={item} key={item.id} />)
                    }
                </div>
            </div>

        </>
    )
}