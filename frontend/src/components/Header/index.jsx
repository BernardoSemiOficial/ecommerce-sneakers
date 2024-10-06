import { useContext } from "react";
import logoSneakers from "../../assets/logo.svg";
import iconUser from "../../assets/image-avatar.png";
import iconCart from "../../assets/icon-cart.svg";
import { ContextMinicart } from "../../context/Minicart";
import { Link } from "react-router-dom";

import "../../components/Header/styles.scss";

function Header() {

	const { productsInCart, handleOpenMinicart } = useContext(ContextMinicart);

	return (
		<header className="sn__header">

			<div className="sn__header-container">

				<div className="sn__header-content">

					<figure className="sn__header-logo">
						<Link to="/">
							<img src={logoSneakers} alt="Sneakers" title="Sneakers" />
						</Link>
					</figure>

					<nav className="sn__header-nav">
						<ul>
							<li><Link to="/collection" title="acessar collections">collections</Link></li>
							<li><Link to="/" title="acessar men">men</Link></li>
							<li><Link to="/" title="acessar women">women</Link></li>
							<li><Link to="/" title="acessar about">about</Link></li>
							<li><Link to="/" title="acessar contact">contact</Link></li>
						</ul>
					</nav>

				</div>

				<div className="sn__header-content">

					<button className="sn__header-cart" onClick={handleOpenMinicart}>
						<img 
							src={iconCart} 
							alt="abrir carrinho" 
							title="Abrir carrinho"
						/>
						<span className="sn__header-cart-quantity">{productsInCart.length}</span>
					</button>

					<button className="sn__header-user">
						<img src={iconUser} alt="Rodrigo" title="abrir lista" />

						<nav className="sn__header-user-nav">
							<ul>
								<li>
									<a href="/account">my account</a>
								</li>
							</ul>
						</nav>
					</button>

				</div>

			</div>

		</header>
	)
}

export default Header;