import * as mercadopago from "mercadopago";
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);
export { mercadopago };
