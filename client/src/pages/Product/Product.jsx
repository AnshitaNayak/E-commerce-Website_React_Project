import React, { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import './Product.scss';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart, reduceQuantity } from '../../redux/cartReducer';

export function Product({ cartvalue, setCartValue }) {

    const id = useParams().id;
    const [index, setIndex] = useState("img");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

    useEffect(() => {
        console.log("Updated quantity:", quantity);
    }, [quantity]); // This effect runs whenever 'quantity' changes

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1; // Calculate the new quantity
        setQuantity(newQuantity); // Update the state with the new quantity
        dispatch(
            addToCart({
                id: data.id,
                title: data.attributes.title,
                desc: data.attributes.desc,
                price: data.attributes.price,
                img: data.attributes.img.data.attributes.url,
                quantity: newQuantity,
            })
        );
    };

    const handleReduceQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1; // Calculate the new quantity
            setQuantity(newQuantity); // Update the state with the new quantity
            dispatch(
                reduceQuantity({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity: newQuantity,
                })
            );
        }
    };

    return (
        <>
            <div className="product">
                {loading ? "loading" : (
                    <>
                        <div className='left'>
                            <div className='images'>
                                <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} alt="" onClick={e => setIndex("img")} />
                                <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} alt="" onClick={e => setIndex("img2")} />
                            </div>
                            <div className='mainImg'>
                                <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes[index]?.data?.attributes?.url} alt="" />
                            </div>
                        </div>
                        <div className='right'>
                            <h1>{data?.attributes?.title}</h1>
                            <span className='price'>${data?.attributes?.price}</span>
                            <p>{data?.attributes?.desc}</p>
                            <div className='quantity'>
                                <button onClick={handleReduceQuantity}>-</button>
                                {quantity}
                                <button onClick={handleIncreaseQuantity}>+</button>
                            </div>
                            <button className='add' onClick={() =>
                                dispatch(
                                    addToCart({
                                        id: data.id,
                                        title: data.attributes.title,
                                        desc: data.attributes.desc,
                                        price: data.attributes.price,
                                        img: data.attributes.img.data.attributes.url,
                                        quantity,
                                    })
                                )
                            }>
                                <AddShoppingCartIcon />
                                ADD TO CART
                            </button>
                            <div className='links'>
                                <div className='item'>
                                    <FavoriteBorderIcon />ADD TO WISH LIST
                                </div>
                                <div className='item'>
                                    <BalanceIcon /> ADD TO COMPARE
                                </div>
                            </div>
                            <div className='info'>
                                <span>Vendor: Polo</span>
                                <span>Product Type: {data?.attributes?.title}</span>
                                <span>Tag: T-Shirt, Women, Top</span>
                            </div>
                            <hr />
                            <div className='info'>
                                <span>DESCRIPTION</span>
                                <hr />
                                <span>ADDITIONAL INFORMATION</span>
                                <hr />
                                <span>FAQ</span>
                            </div>
                        </div>
                    </>
                )}
            </div >
        </>
    )
};