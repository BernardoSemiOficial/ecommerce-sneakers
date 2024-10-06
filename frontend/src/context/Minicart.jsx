import { createContext, useState, useEffect } from "react";
import { instanceAxios } from "../services/axios";

export const ContextMinicart = createContext({});

export function ProviderMinicart({ children }) {

	const [productsStore, setProductsStore] = useState([]);
	const [openMinicart, setOpenMinicart] = useState(false);
	const [productsInCart, setProductsInCart] = useState([]);

	useEffect(() => {

		const requestGetProduct = async () => {
			const response = await instanceAxios.get('http://localhost:4000/products');
			const newStateProducts = response.data.products;
			setProductsStore(newStateProducts);
		}

		requestGetProduct();

	}, [])

	function handleAddProductInCart(newProduct) {
		setOpenMinicart(true);

		const newStateProducts = addProduct(productsInCart, newProduct, productsStore);
		setProductsInCart(newStateProducts);

		function addProduct(productsInCart, newProductInCart, productsStore) {
			const isNewProduct = productsInCart.findIndex(product => product.id_product === newProductInCart.id_product);

			if(isNewProduct === -1) {
				const newProductStore = 
					productsStore.find(product => product.id_product === newProductInCart.id_product);
				
				newProductStore.quantity = newProductInCart.quantity;

				return [...productsInCart, newProductStore];
			}
			else {				
				const newStateProducts = productsInCart.map(product => {

					if(product.id_product === newProductInCart.id_product) {
						const quantity = product.quantity;
						const addQuantity = newProductInCart.quantity;
						product.quantity = quantity + addQuantity;
					}

					return product;
				})
				return newStateProducts;
			}
		}
	}	
	
	function handleRemoveProductInCart(id) {
		setOpenMinicart(true);
		const newStateProducts = removeProduct(productsInCart, id);
		setProductsInCart(newStateProducts);

		function removeProduct(products, productId) {
			return products.filter(product => product.id !== productId);
		}
	}

	function handleOpenMinicart() {
		setOpenMinicart(true);
		document.body.classList.add("no-scroll");
	}
	
	function handleCloseMinicart() {
		setOpenMinicart(false);
		document.body.classList.remove("no-scroll");
	}

	return (
		<ContextMinicart.Provider value={{
			productsInCart,
			openMinicart,
			handleOpenMinicart,
			handleCloseMinicart,
			handleAddProductInCart,
			handleRemoveProductInCart
		}}>
			{children}
		</ContextMinicart.Provider>
	)
}