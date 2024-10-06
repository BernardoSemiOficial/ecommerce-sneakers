import { BrowserRouter, Routes, Route } from "react-router-dom";

// LAYOUTS
import Store from "./layout/Store";
import Checkout from "./layout/Checkout";

// PAGES
import Home from "./pages/Home";
import Product from "./pages/Product";
import Collection from "./pages/Collection";
import Account from "./pages/Account";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";

import { ProviderMinicart } from "./context/Minicart";
import { ProviderCheckout } from "./context/Checkout";

import { ToastContainer } from 'react-toastify';

function App() {

    return (
		<div className="App">
			<ProviderMinicart>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Store />}>
							<Route index element={<Home />} />
							<Route path="product/:id" element={<Product />} />
							<Route path="collection" element={<Collection />} />

							<Route path="account">
								<Route index element={<Account />} />
								<Route path="login" element={<Login />} />
								<Route path="register" element={<Register />} />
							</Route>

							<Route path="*" element={<div>pagina na loja nao encontrada</div>} />
						</Route>
						<Route path="/checkout" element={<ProviderCheckout><Checkout /></ProviderCheckout>}>
							<Route path="*" element={<div>checkout não encontrado</div>} />
						</Route>
						
					</Routes>
				</BrowserRouter>
			</ProviderMinicart>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
        </div>
    );
}

export default App;