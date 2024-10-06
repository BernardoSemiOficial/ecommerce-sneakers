import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useCookies } from "react-cookie";

import { instanceAxios } from "../../../services/axios";

import "./styles.scss";

function Register() {

	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies([]);

	const initialValuesFields = {
		senha: '',
		email: '',
	}

	const configFormik = {
		initialValues: initialValuesFields,
		validate: handleValidateFields,
		onSubmit: handleSubmitCustomForm
	};

	function handleValidateFields(values) {
		const errors = {};
		
		if(!values.senha) { errors.senha = 'campo obrigatorio de ser preenchido' }
		else if (values.senha.length > 30) { errors.senha = 'insira menos de 30 caracteres' }
		
		if(!values.email) { errors.email = 'campo obrigatorio de ser preenchido' }
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { errors.email = 'e-mail invalido' }

		return errors;
	}

	const formik = useFormik(configFormik);

	async function handleSubmitCustomForm(values) {

		const bodyPayment = {
			email: values.email,
			password: values.senha,
		}

		try {
			const response = await instanceAxios.post('http://localhost:4000/token', bodyPayment);
			const data = response.data;
			console.log(data);
			toast.success("login feito com sucesso");
			formik.resetForm();

			setCookie("token-store-sneakers", data.token, { path: '/' });

			setTimeout(() => {
				// navigate('/account');
			}, 3000);

		} catch (error) {
			console.log(error);
		}

	}

	return (
		<main className="sn__account-login">

			<div className="sn__account-login-wrapper">
				
				<h1 className="sn__account-login-title">login</h1>

				<form method="POST" className="sn__account-login-form" onSubmit={formik.handleSubmit}>

					<div className="field">
						<label htmlFor="email">email</label>
						<input type="email" name="email" id="email" placeholder="ex: bernardo@gmail.com" required value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.email && formik.errors.email ? <span className="field-error-feedback">{formik.errors.email}</span> : null}
					</div>

					<div className="field">
						<label htmlFor="senha">senha</label>
						<input type="password" name="senha" id="senha" placeholder="ex: suasenha" required value={formik.values.senha} onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.senha && formik.errors.senha ? <span className="field-error-feedback">{formik.errors.senha}</span> : null}
					</div>

					<div className="field">
						<button 
							type="submit"
							title="entrar"
						>
							entrar
						</button>
					</div>
						
				</form>

			</div>

		</main>
	);
}

export default Register;