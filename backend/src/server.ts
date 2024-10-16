import cors from "cors";
import "dotenv/config";

import express from "express";
const app = express();

app.use(cors());
app.use(express.json());

import { authorization, safeRoutes } from "./middleware/authorization";
app.use(safeRoutes, authorization);

import { routerCustomers } from "./routers/Customers";
import { routerOrders } from "./routers/Orders";
import { routerPayments } from "./routers/Payment";
import { routerProducts } from "./routers/Products";
import { routerToken } from "./routers/Token";

app.use(routerProducts);
app.use(routerCustomers);
app.use(routerOrders);
app.use(routerPayments);
app.use(routerToken);

app.listen(process.env.PORT || 4000, function () {
	console.log("backend started! 🚀");
});
