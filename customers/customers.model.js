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
      await saveCustomers([]); // create a new file with ampty array
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
      await saveCustomers([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function saveCustomers(customers = []) {
  let customersTxt = JSON.stringify(customers);
  let orderArray = await getAllOrders();
  await fs.writeFile(DB_FILE, customersTxt);
}

// save array of orders to file
async function saveOrders(orders = []) {
  let ordersTxt = JSON.stringify(orders);
  await fs.writeFile(DB_FILE, ordersTxt);
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

// get customer by ID
export async function getCustomerByID(customerId) {
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
export async function addCustomer(newCustomer) {
  try{
  let customerArray = await getAllCustomers();
  let ordersArray = await getAllOrders();
  let dbTxt = await fs.readFile(DB_FILE);
  let db = JSON.parse(dbTxt);
  
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  db.customers = customerArray
  // await saveCustomers(customerArray);
  console.log(db)
  dbTxt = JSON.stringify(db);
  await fs.writeFile(DB_FILE, dbTxt);
  } 
catch (err) {
  if (err.code === "ENOENT") {
    // file does not exits
    
    return []; // return empty array
  } // // cannot handle this exception, so rethrow
  else throw err;
}
}

// create a new order for customer
export async function addOrder(newOrder) {
  let orderArray = await getAllOrders();
  if (findOrder(orderArray, newOrder.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newOrder.customerId} already exists`
    );
    orderArray.push(newOrder);
  await saveOrders(orderArray);
}

// update existing customer
export async function updateCustomer(customerId, customer) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await saveCustomers(customerArray);
  }
}
// update existing customer order
export async function updateCustomerOrder(customerId, customer) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await saveCustomers(customerArray);
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
    await saveCustomers(customerArray);
  }
}
