import { instanceAxios } from "../../services/axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useFormik } from "formik";
import InputMask from 'react-input-mask';

import { ContextCheckout } from "../../context/Checkout";
import { formatMoney, unFormat, validCPF } from "../../utils/index";

import logoSneakers from "../../assets/logo.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";

/*
	PARA FAZER O SLIDER SE ATIVO OU NÃO PRECISAMOS VALIDAR O SEGUINTE
	MULTIPLICAR A QUANTIDADE DE ITENS NO CARRINHO POR 230 (LARGURA DA DIV DE CADA PRODUTO)
	E VERIFICAR SE ESSE RESULTADO É MENOR QUE A LARGURA
	SE FOR NÃO DEVEMOS TER SLIDE
	SE FOR MAIOR DEVEMOS TER SLIDE, POIS TEMOS QUE O RESULTADO É MAIOR QUE A LARGURA DA TELA
	ENTÃO TEMOS QUE TER O SLIDE PARA EXIBIR O RESTANTE DOS ITENS
*/


function Checkout() {

	const { productsInCart, totalProducts, totalShipping, totalFinished, mercadoPago, parcelas, newInstallmentsCard } = useContext(ContextCheckout);

	const initialValuesFields = {
		// DADOS PESSOAIS
		nome: '',
		sobrenome: '',
		email: '',
		cpf: '',
		celular: '',

		// DADOS DE ENTREGA
		cep: '',
		endereco: '',
		numero: '',
		bairro: '',
		complemento: '',
		estado: '',
		cidade: '',

		// DADOS DO CARTÃO
		'num-cartao': '',
		'validade-cartao': '',
		'cod-seguranca-cartao': '',
		'nome-cartao': '',
		'cpf-cartao': '',
		'num-parcelas-cartao': '1',
		'id-bandeira-cartao': '',
		'bandeira-cartao': '',
	}

	const configFormik = {
		initialValues: initialValuesFields,
		validate: handleValidateFields,
		onSubmit: handleSubmitCustomForm
	};

	const formik = useFormik(configFormik);

	function ProductsInCart() {

		return (
			<>
				{productsInCart.length > 0 ? (
					<div className="sn__checkout-resume">

						<div className="sn__checkout-resume-products">
	
							<h2 className="sn__checkout-resume-products-title">resumo do pedido</h2>
	
							<div className="sn__checkout-resume-products-carousel">
	
								<ul className="sn__checkout-resume-products-list">
	
									{productsInCart.map(product => (
										<li>
											<div className="sn__checkout-resume-products-list-product">
												<figure className="sn__checkout-resume-products-list-product-image">
													<img
														src={product.url_images[0]}
														alt="sneakears"
													/>
												</figure>
												<div className="sn__checkout-resume-products-list-info">
													<p className="title">{product.title}</p>
													<p className="quantity">qtda: {product.quantity}</p>
													<p className="price">{formatMoney(product.price)}</p>
												</div>
											</div>
										</li>
									))}
	
								</ul>
	
							</div>
	
						</div>
						
						<div className="sn__checkout-resume-payment">
							<p className="sn__checkout-resume-payment-products">
								<span>produtos:</span> <span>{formatMoney(totalProducts)}</span>
							</p>
							<p className="sn__checkout-resume-payment-shipping">
								<span>frete:</span> <span>{formatMoney(totalShipping)}</span>
							</p>
							<p className="sn__checkout-resume-payment-total">
								<span>total:</span> <span>{formatMoney(totalFinished)}</span>
							</p>
						</div>
	
					</div>
				) : (
					<p className="sn__checkout-cart-is-empty">your cart is empty</p>
				)}
			</>
		)
	}

	async function handleChangeCep(event) {
		const currentValue = event.target.value;
		const cepUnformat = currentValue.replace(/[-]+/gi, '');

		if(cepUnformat.length !== 8) { return }
		const response = await instanceAxios.get(`https://viacep.com.br/ws/${cepUnformat}/json/`);
		const data = response.data;

		const estadosBrasileiros = {
            "AC": "Acre",
            "AL": "Alagoas",
            "AP": "Amapa",
            "AM": "Amazonas",
            "BA": "Bahia",
            "CE": "Ceara",
            "DF": "Distrito Federal",
            "ES": "Espirito Santo",
            "GO": "Goias",
            "MA": "Maranhao",
            "MT": "Mato Grosso",
            "MS": "Mato Grosso do Sul",
            "MG": "Minas Gerais",
            "PA": "Para",
            "PB": "Paraiba",
            "PR": "Parana",
            "PE": "Pernambuco",
            "PI": "Piaui",
            "RJ": "Rio de Janeiro",
            "RN": "Rio Grande do Norte",
            "RS": "Rio Grande do Sul",
            "RO": "Rondonia",
            "RR": "Roraima",
            "SC": "Santa Catarina",
            "SP": "Sao Paulo",
            "SE": "Sergipe",
            "TO": "Tocantins",
        }

		formik.setFieldValue('endereco', especialCharMask(data.logradouro), true);
		formik.setFieldValue('bairro', especialCharMask(data.bairro), true);
		formik.setFieldValue('cidade', especialCharMask(data.localidade), true);
		formik.setFieldValue('estado', estadosBrasileiros[data.uf], true);

		function especialCharMask(string) {
			string = string.replace(/[áàãâä]/i, 'a');
			string = string.replace(/[éèêë]/i, 'e');
			string = string.replace(/[íìîï]/i, 'i');
			string = string.replace(/[óòõôö]/i, 'o');
			string = string.replace(/[úùûü]/i, 'u');
			string = string.replace(/[ýÿ]/i, 'y');
			string = string.replace(/[ç]/i, 'c');
			return string;
		}
	}

	function handleChangeCpf(event) {
		const currentValue = event.target.value;
		const cpfUnformat = currentValue.replace(/[-.]+/gi, '');
		if(cpfUnformat.length !== 11) { return }
		
		const result = validCPF(cpfUnformat);
		const messageErro = "Este não é um CPF válido";
		if(result === messageErro) { formik.setFieldError("cpf", messageErro) }
	}
	
	function handleChangeCpfCard(event) {
		const currentValue = event.target.value;
		const cpfUnformat = currentValue.replace(/[-.]+/gi, '');
		if(cpfUnformat.length !== 11) { return }
		
		const result = validCPF(cpfUnformat);
		const messageErro = "Este não é um CPF válido";
		if(result === messageErro) { formik.setFieldError("cpf", messageErro) }
	}
	
	async function handleChangeNumberCard(event) {
		const currentValue = event.target.value;
		const numberCardUnformat = currentValue.replace(/[\s]+/gi, '');
		if(numberCardUnformat.length !== 16) { return }
		const binCard = numberCardUnformat.slice(0, 6);
		console.log(binCard);

		const installments = await mercadoPago.getInstallments({
			amount: String(totalFinished),
			bin: binCard,
			locale: 'pt-BR',
			processingMode: 'gateway'
		})

		console.log(installments);
		newInstallmentsCard(installments[0].payer_costs);
		formik.setFieldValue('bandeira-cartao', installments[0].payment_method_id);
		formik.setFieldValue('id-bandeira-cartao', installments[0].issuer.id);

	}

	function handleValidateFields(values) {
		const errors = {};
		
		if(!values.nome) { errors.nome = 'campo obrigatorio de ser preenchido' } 
		else if (values.nome.length > 30) { errors.nome = 'insira menos de 30 caracteres' }
		
		if(!values.sobrenome) { errors.sobrenome = 'campo obrigatorio de ser preenchido' }
		else if (values.sobrenome.length > 40) { errors.sobrenome = 'insira menos de 40 caracteres' }
		
		if(!values.email) { errors.email = 'campo obrigatorio de ser preenchido' }
		else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { errors.email = 'e-mail invalido' }
		
		if(!values.cpf) { errors.cpf = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/i.test(values.cpf)) { errors.cpf = 'CPF invalido' }
		
		if(!values.celular) { errors.celular = 'campo obrigatorio de ser preenchido' }
		else if (!/^\(\d{2}\)\s{1}[9]{1}\d{4}-\d{4}$/i.test(values.celular)) { errors.celular = 'telefone invalido' }
		
		if(!values.cep) { errors.cep = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{5}-\d{3}$/i.test(values.cep)) { errors.cep = 'CEP invalido' }

		if(!values.endereco) { errors.endereco = 'campo obrigatorio de ser preenchido' }
		else if (values.endereco.length > 50) { errors.endereco = 'insira menos de 50 caracteres' }
		
		if(!values.numero) { errors.numero = 'campo obrigatorio de ser preenchido' }
		else if (values.numero.length > 30) { errors.numero = 'insira menos de 30 caracteres' }
		
		if(!values.bairro) { errors.bairro = 'campo obrigatorio de ser preenchido' }
		else if (values.bairro.length > 45) { errors.bairro = 'insira menos de 45 caracteres' }
		
		if(!values.complemento) { errors.complemento = 'campo obrigatorio de ser preenchido' }
		else if (values.complemento.length > 60) { errors.complemento = 'insira menos de 60 caracteres' }
		
		if(!values.cidade) { errors.cidade = 'campo obrigatorio de ser preenchido' }
		else if (values.cidade.length > 30) { errors.cidade = 'insira menos de 30 caracteres' }
		
		if(!values.estado) { errors.estado = 'campo obrigatorio de ser preenchido' }
		else if (values.estado.length > 30) { errors.estado = 'insira menos de 30 caracteres' }
		
		if(!values['num-cartao']) { errors['num-cartao'] = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{4}\s{1}\d{4}\s{1}\d{4}\s{1}\d{4}$/i.test(values['num-cartao'])) { errors['num-cartao'] = 'número do cartão invalido' }
		
		if(!values['validade-cartao']) { errors['validade-cartao'] = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{2}\/\d{4}$/i.test(values['validade-cartao'])) { errors['validade-cartao'] = 'validade do cartão invalido' }
		
		if(!values['cod-seguranca-cartao']) { errors['cod-seguranca-cartao'] = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{1,4}$/i.test(values['cod-seguranca-cartao'])) { errors['cod-seguranca-cartao'] = 'codigo de segurancao do cartão invalido' }
		
		if(!values['nome-cartao']) { errors['nome-cartao'] = 'campo obrigatorio de ser preenchido' }
		else if (values['nome-cartao'].length > 60) { errors['nome-cartao'] = 'insira menos de 60 caracteres' }
		
		if(!values['cpf-cartao']) { errors['cpf-cartao'] = 'campo obrigatorio de ser preenchido' }
		else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/i.test(values['cpf-cartao'])) { errors['cpf-cartao'] = 'CPF do cartão invalido' }
		
		if(!values['num-parcelas-cartao']) { errors['num-parcelas-cartao'] = 'campo obrigatorio de ser preenchido' }
		
		return errors;
	}

	async function handleSubmitCustomForm(values) {
		console.log(values);

		const [monthExpiration, yearExpiration] = values['validade-cartao'].split("/");

		const cardToken = await mercadoPago.createCardToken({
			cardNumber: unFormat(values['num-cartao'], "NUM-CARTAO"),
			cardholderName: 'APRO' || values['nome-cartao'],
			cardExpirationMonth: '11' || monthExpiration,
			cardExpirationYear: '2025' || yearExpiration,
			securityCode: '123' || values['cod-seguranca-cartao'],
			identificationType: 'CPF',
			identificationNumber: unFormat(values['cpf-cartao'], "CPF"),
		});

		console.log(cardToken);

		const bodyPayment = {
			token: cardToken.id,
			transaction_amount: totalFinished,
			installments: Number(values['num-parcelas-cartao']),
			payment_method_id: values['bandeira-cartao'],
			issuer_id: values['id-bandeira-cartao'],
			description: 'Store Skeakers',
			payer: {
				email: values.email,
				identification: {
					type: "CPF",
					number: unFormat(values['cpf-cartao'], "CPF")
				}
			}
		}

		console.log(bodyPayment);

		const response = await instanceAxios.post('http://localhost:4000/payment', bodyPayment);
		const data = response.data;
		console.log(data);

	}

	return (
		<section className="sn__checkout-container">

			<div className="sn__checkout-wrapper">

				<header className="sn__checkout-header">
					<figure className="sn__checkout-header-logo">
						<Link to="/">
							<img src={logoSneakers} alt="Sneakers" />
						</Link>
					</figure>
				</header>

				<ProductsInCart />

				{productsInCart.length > 0 ? (
					<div className="sn__checkout-finalization">

						<form className="sn__checkout-finalization-form" onSubmit={formik.handleSubmit}>

							<input type="hidden" name="bandeira-cartao" id="bandeira-cartao" required value={formik.values['bandeira-cartao']} />
							<input type="hidden" name="id-bandeira-cartao" id="id-bandeira-cartao" required value={formik.values['id-bandeira-cartao']} />

							<div className="sn__checkout-finalization-form-step one-step">
								
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
									<label htmlFor="cpf">CPF</label>
									<InputMask type="text" name="cpf" id="cpf" placeholder="000.000.000-00" required value={formik.values.cpf} onBlur={formik.handleBlur} onChange={(e) => { formik.handleChange(e); handleChangeCpf(e); }} mask="999.999.999-99" maskChar="" />
									{formik.touched.cpf && formik.errors.cpf ? <span className="field-error-feedback">{formik.errors.cpf}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="celular">celular / whatsapp</label>
									<InputMask type="text" name="celular" id="celular" placeholder="(00) 00000-0000" required value={formik.values.celular} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(99) \99999-9999" maskChar="" />
									{formik.touched.celular && formik.errors.celular ? <span className="field-error-feedback">{formik.errors.celular}</span> : null}
								</div>
									
							</div>
							
							<div className="sn__checkout-finalization-form-step two-step">
								
								<div className="field">
									<label htmlFor="cep">CEP</label>
									<InputMask type="text" name="cep" id="cep" placeholder="00000-000" required value={formik.values.cep} onChange={(e) => { formik.handleChange(e); handleChangeCep(e); }} onBlur={formik.handleBlur} mask="99999-999" maskChar="" />
									{formik.touched.cep && formik.errors.cep ? <span className="field-error-feedback">{formik.errors.cep}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="endereco">endereço</label>
									<input type="text" name="endereco" id="endereco" required value={formik.values.endereco} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.endereco && formik.errors.endereco ? <span className="field-error-feedback">{formik.errors.endereco}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="numero">numero</label>
									<input type="text" name="numero" id="numero" required value={formik.values.numero} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.numero && formik.errors.numero ? <span className="field-error-feedback">{formik.errors.numero}</span> : null}
								</div>
								
								<div className="field">
									<label htmlFor="bairro">bairro</label>
									<input type="text" name="bairro" id="bairro" required value={formik.values.bairro} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.bairro && formik.errors.bairro ? <span className="field-error-feedback">{formik.errors.bairro}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="complemento">complemento</label>
									<input type="text" name="complemento" id="complemento" value={formik.values.complemento} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.complemento && formik.errors.complemento ? <span className="field-error-feedback">{formik.errors.complemento}</span> : null}
								</div>
								
								<div className="field">
									<label htmlFor="cidade">cidade</label>
									<input type="text" name="cidade" id="cidade" required value={formik.values.cidade} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.cidade && formik.errors.cidade ? <span className="field-error-feedback">{formik.errors.cidade}</span> : null}
								</div>
								
								<div className="field">
									<label htmlFor="estado">estado</label>
									<input type="text" name="estado" id="estado" required value={formik.values.estado} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.estado && formik.errors.estado ? <span className="field-error-feedback">{formik.errors.estado}</span> : null}
								</div>
									
							</div>
							
							<div className="sn__checkout-finalization-form-step three-step">
								
								<div className="field">
									<label htmlFor="num-cartao">numero do cartao</label>
									<InputMask type="text" name="num-cartao" id="num-cartao" placeholder="1234 1234 1234 1234" required value={formik.values['num-cartao']} onChange={(e) => { formik.handleChange(e); handleChangeNumberCard(e); }} onBlur={formik.handleBlur} mask="9999 9999 9999 9999" maskChar="" />
									{formik.touched['num-cartao'] && formik.errors['num-cartao'] ? <span className="field-error-feedback">{formik.errors['num-cartao']}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="validade-cartao">validade (mês/ano)</label>
									<InputMask type="text" name="validade-cartao" id="validade-cartao" required value={formik.values['validade-cartao']} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="99/9999" maskChar="" />
									{formik.touched['validade-cartao'] && formik.errors['validade-cartao'] ? <span className="field-error-feedback">{formik.errors['validade-cartao']}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="cod-seguranca-cartao">cod. de segurança</label>
									<input type="number" name="cod-seguranca-cartao" id="cod-seguranca-cartao" required value={formik.values['cod-seguranca-cartao']} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength="4" />
									{formik.touched['cod-seguranca-cartao'] && formik.errors['cod-seguranca-cartao'] ? <span className="field-error-feedback">{formik.errors['cod-seguranca-cartao']}</span> : null}
								</div>
								
								<div className="field">
									<label htmlFor="nome-cartao">nome e sobrenome do titular</label>
									<input type="text" name="nome-cartao" id="nome-cartao" required value={formik.values['nome-cartao']} onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched['nome-cartao'] && formik.errors['nome-cartao'] ? <span className="field-error-feedback">{formik.errors['nome-cartao']}</span> : null}
								</div>

								<div className="field">
									<label htmlFor="cpf-cartao">CPF do titular</label>
									<InputMask type="text" name="cpf-cartao" id="cpf-cartao" required value={formik.values['cpf-cartao']} onChange={(e) => { formik.handleChange(e); handleChangeCpfCard(e); }} onBlur={formik.handleBlur} mask="999.999.999-99" maskChar="" />
									{formik.touched['cpf-cartao'] && formik.errors['cpf-cartao'] ? <span className="field-error-feedback">{formik.errors['cpf-cartao']}</span> : null}
								</div>
								
								<div className="field">
									<label htmlFor="num-parcelas-cartao">nº de parcelas</label>
									<select name="num-parcelas-cartao" id="num-parcelas-cartao" required value={formik.values['num-parcelas-cartao']} onChange={formik.handleChange} onBlur={formik.handleBlur}>
										{parcelas.length > 0 ? parcelas.map(parcela => (
											<option value={parcela.installments}>{parcela.recommended_message}</option>	
										)) : (
											<>
												<option value="1">1 parcela</option>	
												<option value="2">2 parcela</option>	
												<option value="3">3 parcela</option>	
											</>
										)}
									</select>
									{formik.touched['num-parcelas-cartao'] && formik.errors['num-parcelas-cartao'] ? <span className="field-error-feedback">{formik.errors['num-parcelas-cartao']}</span> : null}
								</div>

								<div className="field">
									<button 
										type="submit" 
										title="finalizar compra"
									>
										comprar agora
									</button>
								</div>
									
							</div>

						</form>

					</div>
				) : null}

			</div>

		</section>
	);
}

export default Checkout;