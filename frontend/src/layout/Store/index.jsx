import { Outlet } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Minicart from "../../components/Minicart";
import Overlay from "../../components/Overlay";

import "./styles.scss";

function Store() {

	return (
		<>
			<Header/>
			<Minicart />

			<Outlet />

			<Footer />
			<Overlay />
		</>
	);
}

export default Store;