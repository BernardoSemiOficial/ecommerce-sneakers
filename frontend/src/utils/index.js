export function formatMoney(number) {
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
		.format(number);
}

export function validCPF(cpf) {

    const cpfFormat = String(cpf).replace(/\D/g, "");

    const cpfsInvalid = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ]

    for(let i = 0; i < cpfsInvalid.length; i++)  {
        const currentVerication = cpfsInvalid[i];

        if(cpfFormat === currentVerication) { return "Este não é um CPF válido" }
    }

    const calcularTotal = multiplicador => (resultado, numeroAtual) =>
    resultado + numeroAtual * multiplicador--;

    const calcularDigito = (parteCPF, multiplicador) => {

        const total = parteCPF.reduce(calcularTotal(multiplicador), 0);
        const resto = total % 11;

        let digito = 11 - resto;

        if (digito > 9) {
            digito = 0;
        }

        return digito;
    }
    
    const primeiraParteCPF = cpfFormat.substr(0, 9).split("");
    const primeiroDigitoVerificador = Number(cpfFormat.charAt(9));
    const primeiroDigitoCalculado = calcularDigito(primeiraParteCPF, 10);

    if (primeiroDigitoVerificador !== primeiroDigitoCalculado) {        
        return "Este não é um CPF válido"
    }

    const segundaParteCPF = cpfFormat.substr(0, 10).split("");
    const segundoDigitoVerificador = Number(cpfFormat.charAt(10));
    const segundoDigitoCalculado = calcularDigito(segundaParteCPF, 11);
    
    if (segundoDigitoVerificador !== segundoDigitoCalculado) {        
        return "Este não é um CPF válido"
    }
    
    return "CPF válido";
}

export function unFormat(value, type) {

    let valueFormat = null;

    if(type === "CEP") {
        valueFormat = value.replace(/[-]+/g, "");
    }
    else if(type === "CPF") {
        valueFormat = value.replace(/[-.]+/g, "");
    }
    else if(type === "CELULAR") {
        valueFormat = value.replace(/[()\-\s]+/g, "");
    }
    else if(type === "NUM-CARTAO") {
        valueFormat = value.replace(/[\s]+/g, "");
    }

    return valueFormat;
}