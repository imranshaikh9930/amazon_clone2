import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function Product({id, title, image, price, rating}) {

    const [{basket},dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                image: image,
                price: price,
                rating: rating,
                title:title,
            },
        });
        toast.success("Product Added To Cart !", {
            position: toast.POSITION.BOTTOM_RIGHT
          });

    };

    return (
        <div className="product">
             <ToastContainer
          autoClose={1000}
             />
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </div>
            </div>

            <img src={image} alt="img2" />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
