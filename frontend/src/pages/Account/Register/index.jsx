import { useFormik } from "formik";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { unFormat, validCPF } from "../../../utils/index";
import { instanceAxios } from "../../../services/axios";

import "./styles.scss";

function Register() {

	const navigate = useNavigate();

	const initialValuesFields = {
		// DADOS PESSOAIS
		nome: '',
		sobrenome: '',
		senha: '',
		email: '',
		cpf: '',
		'data-nasc': '',
	}

	const configFormik = {
		initialValues: initialValuesFields,
		validate: handleValidateFields,
		onSubmit: handleSubmitCustomForm
	};

	function handleValidateFields(values) {
		const errors = {};
		
		if(!values.nome) { errors.nome = 'campo obrigatorio de ser preenchido' } 
		else if (values.nome.length > 30) { errors.nome = 'insira menos de 30 caracteres' }
		
		if(!values.sobrenome) { errors.sobrenome = 'campo obrigatorio de ser preenchido' }
		else if (values.sobrenome.length > 40) { errors.sobrenome = 'insira menos de 40 caracteres' }
		
		if(!values.senha) { errors.senha = 'campo obrigatorio de ser preenchido' }
		else if (values.senha.length > 30) { errors.senha = 'insira menos de 30 caracteres' }
		
		if(!values.email) { errors.email = 'campo obrigatorio de ser preenchido' }
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { errors.email = 'e-mail invalido' }
		
		if(!values.cpf) { errors.cpf = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/i.test(values.cpf)) { errors.cpf = 'CPF invalido' }
		else if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/i.test(values.cpf) && !isValidCpf(values.cpf)) { errors.cpf = 'Este não é um CPF válido' }
		
		if(!values['data-nasc']) { errors['data-nasc'] = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{4}-\d{2}-\d{2}$/i.test(values['data-nasc'])) { errors['data-nasc'] = 'data invalida' }

		return errors;
	}

	const formik = useFormik(configFormik);

	function isValidCpf(value) {
		const cpfUnformat = value.replace(/[-.]+/gi, '');
		if(cpfUnformat.length !== 11) { return false }
		
		const result = validCPF(cpfUnformat);
		const messageErro = "Este não é um CPF válido";
		if(result === messageErro) { return false }
		else { return true }
	}

	async function handleSubmitCustomForm(values) {

		const bodyPayment = {
			email: values.email,
			cpf: unFormat(values.cpf, "CPF"),
			password: values.senha,
			first_name: values.nome,
			last_name: values.sobrenome,
			date_birth: values['data-nasc'],
		}

		console.log(bodyPayment);

		try {
			const response = await instanceAxios.post('http://localhost:4000/customers', bodyPayment);
			const data = response.data;
			console.log(data);	
			toast.success("conta criado com sucesso");
			formik.resetForm();

			setTimeout(() => {
				navigate('/account/login');
			}, 3000);

		} catch (error) {
			console.log(error);
		}

	}

	return (
		<main className="sn__account-register">

			<div className="sn__account-register-wrapper">
				
				<h1 className="sn__account-register-title">register</h1>

				<form method="POST" className="sn__account-register-form" onSubmit={formik.handleSubmit}>
								
					<div className="field">
						<label htmlFor="nome">nome</label>
						<input type="text" name="nome" id="nome" placeholder="ex: Bernardo" required value={formik.values.nome} onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.nome && formik.errors.nome ? <span className="field-error-feedback">{formik.errors.nome}</span> : null}
					</div>

					<div className="field">
						<label htmlFor="sobrenome">sobrenome</label>
						<input type="text" name="sobrenome" id="sobrenome" placeholder="ex: Pereira Oliveira" required value={formik.values.sobrenome} onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched.sobrenome && formik.errors.sobrenome ? <span className="field-error-feedback">{formik.errors.sobrenome}</span> : null}
					</div>

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
						<label htmlFor="cpf">CPF</label>
						<InputMask type="text" name="cpf" id="cpf" placeholder="000.000.000-00" required value={formik.values.cpf} onBlur={formik.handleBlur} onChange={formik.handleChange} mask="999.999.999-99" maskChar="" />
						{formik.touched.cpf && formik.errors.cpf ? <span className="field-error-feedback">{formik.errors.cpf}</span> : null}
					</div>

					<div className="field">
						<label htmlFor="data-nasc">data de nasc.</label>
						<input type="date" name="data-nasc" id="data-nasc" required value={formik.values['data-nasc']} onChange={formik.handleChange} onBlur={formik.handleBlur} />
						{formik.touched['data-nasc'] && formik.errors['data-nasc'] ? <span className="field-error-feedback">{formik.errors['data-nasc']}</span> : null}
					</div>

					<div className="field">
						<button 
							type="submit"
							title="criar conta"
						>
							criar conta
						</button>
					</div>
						
				</form>

			</div>

		</main>
	);
}

export default Register;