import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
	const [state, dispatch] = useStoreContext();

	const {
		image,
		name,
		_id,
		price,
		size
	} = item;

	const { cart } = state

	const addToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === _id)
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
			});
			idbPromise('cart', 'put', {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 }
			});
			idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
		}
	}

	return (
		<div className="flip-card px-1 py-1">
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<Link to={`/products/${_id}`}>
						<img
							className="productImg"
							alt={name}
							src={`/images/${image}`}
						/>
					</Link>
				</div>
				<div className="flip-card-back">
					<div className="card cardBack">
					<Link to={`/products/${_id}`}>
						<p>{name}</p>
					</Link>
					<div>{size}</div>
					<div>${price}</div>
					<button onClick={addToCart}>Add to cart</button>
					</div>
				</div>
			</div>
			<div>
			</div>
		</div>
	);
}

export default ProductItem;
