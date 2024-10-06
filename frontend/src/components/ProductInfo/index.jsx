import { useContext, useState } from "react";
import { ReactComponent as IconAddCard } from "../../assets/icon-cart-btn.svg";

import "../../components/ProductInfo/styles.scss";
import { ContextMinicart } from "../../context/Minicart";

function ProductInfo({ product }) {

	const { handleAddProductInCart } = useContext(ContextMinicart);
	const [quantity, setQuantity] = useState(1);
	const descontComparePrice = (100 - (product.price / product.compare_at_price) * 100).toFixed(0);

	function handleMinusQuantity() {
		setQuantity(quantity => {
			if(quantity === 1) { return 1 }
			return quantity - 1;
		});
	}
	
	function handlePlusQuantity() {
		setQuantity(quantity => {
			if(quantity === 100) { return 100 }
			return quantity + 1;
		});
	}

	function formatMoney(number) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
			.format(number);
	}

	return (
		<section className="sn__product-info">
			
			<h4 className="sn__product-info-vendedor">SNEAKER COMPANY</h4>

			<h1 className="sn__product-info-title">{product.title}</h1>

			<p className="sn__product-info-description">{product.description}</p>

			<div className="sn__product-info-price">
				<p className="sn__product-info-price-current">{formatMoney(product.price)} <span className="flag">{descontComparePrice}% OFF</span></p>
				<del className="sn__product-info-price-compare">{formatMoney(product.compare_at_price)}</del>
			</div>

			<div className="sn__product-buy">

				<div className="sn__product-buy-quantity">
					<button onClick={handleMinusQuantity}>-</button>
					<input type="text" pattern="^[\d]+$" value={quantity}/>
					<button onClick={handlePlusQuantity}>+</button>
				</div>

				<button
					type="button"
					className="sn__product-buy-btn"
					onClick={() => handleAddProductInCart({ id_product: product.id_product, quantity })}
				>
					<IconAddCard />
					add to cart
				</button>

			</div>

		</section>
	);
}

export default ProductInfo;