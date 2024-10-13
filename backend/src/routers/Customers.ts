import { Router } from "express";
import { Customers } from "../controller/Customers";
const routerCustomers = Router();
routerCustomers.get("/customers", Customers.getCustomers);
routerCustomers.get("/customers/:id", Customers.getCustomer);
routerCustomers.post("/customers", Customers.postCustomer);
routerCustomers.patch("/customers", Customers.updateCustomer);
routerCustomers.delete("/customers/:id", Customers.deleteCustomer);
export { routerCustomers };
