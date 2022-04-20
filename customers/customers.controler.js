import * as dbModel from "./customers.model.js";

export async function getAllCustomers(req, res) {
    try {
        let allCustomers = await dbModel.getAllCustomers();
        res.json(allCustomers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
export async function getAllOrders(req, res) {
    try {
        let allOrders = await dbModel.getAllOrders();
        res.json(allOrders);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await dbModel.addCustomer(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
export async function postCustomerOrder(req, res) {
    try {
      let newOrder = req.body;
      await dbModel.addOrder(newOrder);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await dbModel.getCustomerByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  export async function getOrder (req, res) {
    try {
      let id = parseInt(req.params.id)
      let order = await dbModel.getOrderByID(id);
      res.json(order);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function putCustomer  (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = req.body;
      await dbModel.updateCustomer(id, customer);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function putCustomerOrder  (req, res) {
    try {
      let id = parseInt(req.params.id)
      let order = req.body;
      await dbModel.updateCustomer(id, order);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function deleteCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      await dbModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
