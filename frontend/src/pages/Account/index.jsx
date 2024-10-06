import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { instanceAxios } from "../../services/axios";

import "./styles.scss";

function Account() {

	const [cookies] = useCookies(['token-store-sneakers']);
	const [customers, setCustomers] = useState([]);
	const customer = customers[0];

	useEffect(() => {
		
		async function getInfoCustomer() {
			const headers = {
				"authorization": 'Bearer ' + cookies["token-store-sneakers"]
			}
			const response = await instanceAxios.get('http://localhost:4000/customer', { headers });
			setCustomers(response.data.customers);
		}

		if(cookies["token-store-sneakers"]) { getInfoCustomer() }
		
	}, [cookies]);

	if(!cookies["token-store-sneakers"]) {
		return (
			<main className="sn__account">
	
				<div className="sn__account-wrapper sn__account-wrapper-no-login">
					
					<h1 className="sn__account-title">my account</h1>

					<p className="sn__account-info">faça login para conseguir acessar a página do cliente ou crie uma conta se ainda não possuir.</p>

					<div className="sn__account-container-links">
						<Link to="login" className="sn__account-link">login</Link>
						<Link to="register" className="sn__account-link">register</Link>
					</div>
	
				</div>
	
			</main>
		)
	}

	return (
		<main className="sn__account">

			<div className="sn__account-wrapper">
				
				<h1 className="sn__account-title">my account</h1>

				{customer ? (
					<p className="sn__account-thankyou">Thank you, {customer.first_name}!</p>
				) : (<p className="sn__account-loading">loading...</p>)}

			</div>

		</main>
	);
}

export default Account;