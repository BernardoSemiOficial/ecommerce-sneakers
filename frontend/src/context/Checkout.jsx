import { createContext, useContext, useEffect, useState } from "react";

import { ContextMinicart } from "./Minicart";

export const ContextCheckout = createContext({});

const mercadoPago = new window.MercadoPago(
	process.env.REACT_APP_MP_PUBLIC_TOKEN
);

export function ProviderCheckout({ children }) {
	const { productsInCart } = useContext(ContextMinicart);

	const [loadingCheckout, setLoadingCheckout] = useState(false);
	const [totalProducts, setTotalProducts] = useState(0);
	const [totalShipping, setTotalShipping] = useState(10);
	const [totalFinished, setTotalFinished] = useState(0);

	const [parcelas, setParcelas] = useState([]);

	useEffect(() => {
		const newTotalProducts = productsInCart.reduce((accTotal, product) => {
			accTotal += Number(product.quantity) * Number(product.price);
			return accTotal;
		}, 0);

		setTotalProducts(newTotalProducts);
	}, [productsInCart]);

	useEffect(() => {
		setTotalFinished(totalProducts + totalShipping);
	}, [totalProducts, totalShipping]);

	function newInstallmentsCard(installments) {
		setParcelas(installments);
	}

	function updadeShipping() {
		setTotalShipping();
	}

	function handleLoadingCheckout({ isLoading }) {
		if (isLoading) setLoadingCheckout(true);
		else {
			setTimeout(() => {
				setLoadingCheckout(false);
			}, 500);
		}
	}

	return (
		<ContextCheckout.Provider
			value={{
				productsInCart,
				totalProducts,
				totalShipping,
				totalFinished,
				mercadoPago,
				parcelas,
				loadingCheckout,
				newInstallmentsCard,
				updadeShipping,
				handleLoadingCheckout,
			}}
		>
			{children}
		</ContextCheckout.Provider>
	);
}
