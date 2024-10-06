import { useContext } from "react";
import { ContextMinicart } from "../../context/Minicart";

import "../../components/Overlay/styles.scss";

function Overlay() {

	const { openMinicart, handleCloseMinicart } = useContext(ContextMinicart);

	return (
		openMinicart ? (
			<div
				className={`sn__overlay ${openMinicart ? "active" : ""}`}
				onClick={handleCloseMinicart}
			></div>
		) : null
	)
}

export default Overlay;