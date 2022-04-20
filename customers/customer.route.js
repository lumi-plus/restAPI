// index.js
import express from 'express'
import {getAllCustomers, getAllOrders, getOrder, postCustomer, postCustomerOrder, getCustomer, putCustomer, putCustomerOrder, deleteCustomer } from './customers.controler.js'

export const dbRouter = express.Router();

// middleware specific to this route
dbRouter.use(express.json())

// route handlers
dbRouter.get("/customers", getAllCustomers);
dbRouter.get("/orders", getAllOrders);
dbRouter.post("/customers", postCustomer);
dbRouter.post("/customers/:id", postCustomerOrder);

dbRouter.get("/customers/:id", getCustomer);
dbRouter.get("/orders/:id", getOrder);

dbRouter.put("/customers/:id",putCustomer);
dbRouter.put("/customers/:id",putCustomerOrder);

dbRouter.delete("/customers/:id", deleteCustomer);

