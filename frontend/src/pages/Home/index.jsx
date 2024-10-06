import { useNavigate } from "react-router-dom";
import bannerHome from "../../assets/banner-home.jpg";
import "./styles.scss";

function Home() {
	const navigate = useNavigate();

	function goProduct() {
		navigate("collection");
	}

	return (
		<main className="sn__home">
			<figure className="sn__home-banner">
				<div className="sn__home-overlay"></div>
				<img src={bannerHome} alt="Sneakers" />

				<button
					className="sn__home-banner-btn"
					onClick={goProduct}
				>
					comprar
				</button>
			</figure>
		</main>
	);
}

export default Home;