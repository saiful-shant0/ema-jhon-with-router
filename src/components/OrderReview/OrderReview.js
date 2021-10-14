import React from 'react';
import useProducts from '../../hooks/Useproduct';
import useCart from '../../hooks/useCart'
import Cart from '../Cart/Cart';
import './review.css'
import ReviewIteam from '../ReviewIteam/ReviewIteam';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';

import { useHistory } from 'react-router';



const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);

    const history = useHistory();

    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key)
    }

    const handlePlaceOrder = () => {
        setCart([]);
        clearTheCart()
        history.push('/placeorder');

    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewIteam
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}></ReviewIteam>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>

                    <button onClick={handlePlaceOrder} className="btn-regular"> Place Order</button>

                </Cart>
            </div>

        </div>
    );
};

export default OrderReview;