import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductInfo from "../../components/ProductInfo";
import ProductThumb from "../../components/ProductThumb";

import { instanceAxios } from "../../services/axios";

import "../../pages/Product/styles.scss";

function Product() {

	const { id: productId} = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {

		const requestGetProduct = async () => {
			const response = await instanceAxios.get('http://localhost:4000/products');
			const data = response.data;

			const [newStateProduct] = data.products.filter(product => {
				return product.id_product === Number(productId);
			})

			setProduct(newStateProduct);
		}

		requestGetProduct();

	}, [productId])

	return (
		<main className="sn__product">

			{product.id_product != null ? (
				<div className="sn__product-introdution">
					<ProductThumb product={product} />
					<ProductInfo product={product} />
				</div>
			) : null }

		</main>
	);
}

export default Product;