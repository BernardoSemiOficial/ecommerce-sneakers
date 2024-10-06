import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { instanceAxios } from "../../services/axios";

import "./styles.scss";

function Collection() {

	const navigate = useNavigate();

	const [products, setProducts] = useState([]);

	useEffect(() => {

		const requestGetProducts = async () => {
			const response = await instanceAxios.get('http://localhost:4000/products');
			const newStateProducts = response.data.products;
			setProducts(newStateProducts);
		}

		requestGetProducts();

	}, [])

	function formatMoney(number) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
			.format(number);
	}

	return (
		<main className="sn__collection">

			<div className="sn__collection-wrapper">
				
				<h1 className="sn__collection-title">Sneakers</h1>

				<ul className="sn__collection-products">

					{products.map(product => (
						<li className="sn__collection-product" key={product.id_product}>
							<figure className="sn__collection-product-image">
								<img
									src={product.url_images[0]}
									alt={product.title}
									title={product.title}
								/>
							</figure>
							<div className="sn__collection-product-info">
								<p className="title">
									{product.title}
									<span className="review">4.6</span>
								</p>
								<p className="price">{formatMoney(product.price)}</p>
							</div>
							<div className="sn__collection-product-visited">
								<button
									onClick={() => navigate(`/product/${product.id_product}`)}
								>
									comprar
								</button>
							</div>
						</li>
					))}

				</ul>

			</div>

		</main>
	);
}

export default Collection;