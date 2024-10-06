import { useContext } from "react";
import { ContextMinicart } from "../../context/Minicart";
import { useNavigate } from "react-router-dom";

import { ReactComponent as IconDelete } from "../../assets/icon-delete.svg";

import "../Minicart/styles.scss";

function Minicart() {
	const navigate = useNavigate();
	
	const { openMinicart, productsInCart, handleCloseMinicart, handleRemoveProductInCart } = useContext(ContextMinicart);

	function formatMoney(number) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
			.format(number);
	}

	function goCheckout() {
		handleCloseMinicart();
		navigate("/checkout");
	}

	function ProductsInCart() {

		return (
			<>
				{productsInCart.length > 0 ? (
					<ul>
						{productsInCart.length > 0 ? productsInCart.map(product => (
							<li className="sn__minicart-items-product">
								<div className="sn__minicart-items-product-image">
									<img src={product.url_images[0]} alt="Sneakers" />
								</div>

								<div className="sn__minicart-items-product-info">
									<p className="title">{product.name}</p>
									<p className="quantity">quantity: {product.quantity}</p>
									<p className="price">price: {formatMoney(product.price)}</p>
								</div>

								<div className="sn__minicart-items-product-delete">
									<button onClick={() => handleRemoveProductInCart(product.id)}>
										<IconDelete />
									</button>
								</div>

							</li>
						)) : null}
					</ul>
				) : (
					<p className="sn__minicart-items-product cart-is-empty">your cart is empty</p>
				)}
			</>
		)
	}

	return (
		<div className={`sn__minicart-container ${openMinicart ? "active" : ""}`}>

			<div className="sn__minicart-wrapper">

				<header className="sn__minicart-header">
					<h2>minicart</h2>
					<button
						className="close"
						onClick={handleCloseMinicart}
					>
						x
					</button>
				</header>

				<div className="sn__minicart-items">
					<ProductsInCart />
				</div>

				<footer className="sn__minicart-footer">
					<button
						onClick={goCheckout}
					>checkout
					</button>
				</footer>

			</div>

		</div>
	)
}

export default Minicart;