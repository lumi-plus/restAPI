import * as fs from "fs/promises";
const CUSTOMERS_FILE = "./customers/customers.json";
const DB_FILE = "./db.json";

// return all customer from file
export async function getAllCustomers() {
  try {
    let dbTxt = await fs.readFile(DB_FILE);
    let db = JSON.parse(dbTxt);
    return db.customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}
export async function getAllOrders() {
  try {
    let dbTxt = await fs.readFile(DB_FILE);
    let db = JSON.parse(dbTxt);
    return db.orders;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

// test function for order ID
function findOrder(orderArray, Id) {
  return orderArray.findIndex(
    (currOrder) => currOrder.orderId === Id
  );
}

// get gustomer by ID
export async function getByID(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

// get order by ID
export async function getOrderByID(orderId) {
  let orderArray = await getAllOrders();
  let index = findOrder(orderArray, orderId);
  if (index === -1)
    throw new Error(`Order with ID:${oderId} doesn't exist`);
  else return orderArray[index];
}

// create a new customer
export async function add(newCustomer) {
  let customerArray = await getAllCustomers();
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer
export async function update(customerId, customer) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer
export async function remove(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}
