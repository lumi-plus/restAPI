// index.js
import express from 'express'
import {getAllCustomers, getAllOrders, getOrder, postCustomer, getCustomer,putCustomer, deleteCustomer } from './customers.controler.js'

export const dbRouter = express.Router();

// middleware specific to this route
dbRouter.use(express.json())

// route handlers
dbRouter.get("/customers", getAllCustomers);
dbRouter.get("/orders", getAllOrders);
dbRouter.post("/customers", postCustomer);

dbRouter.get("/customers/:id", getCustomer);
dbRouter.get("/orders/:id", getOrder);

dbRouter.put("/customers/:id",putCustomer );

dbRouter.delete("/customers/:id", deleteCustomer);

