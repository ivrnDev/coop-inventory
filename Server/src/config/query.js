const queries = {
    customerQueries: {
        getCustomersQuery: `SELECT * FROM customers`
    },
    
    orderQueries: {
        createCustomerQuery: `
        INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)`,
        createTransactionQuery: `
        INSERT INTO transactions (customer_id, transaction_amount) SELECT customer_id, 0.00 FROM customers
        WHERE customer_email = ?
        `,
        getAllTransactionsQuery: `
    SELECT
    transactions.transaction_id,
    transactions.transaction_date,
    transactions.transaction_amount,
    customers.customer_id,
    customers.customer_name,
    customers.customer_email,
    SUM(orders.quantity) AS total_quantity,
    GROUP_CONCAT(products.name) AS ordered_products,
    SUM(orders.quantity * products.price) AS transaction_amount
FROM
    transactions
JOIN
    customers ON transactions.customer_id = customers.customer_id
JOIN
    orders ON transactions.transaction_id = orders.transaction_id
JOIN
    products ON orders.product_id = products.product_id
GROUP BY
    transactions.transaction_id,
    transactions.transaction_date,
    transactions.transaction_amount,
    customers.customer_id,
    customers.customer_name,
    customers.customer_email
`,
        updateTransactionAmountQuery: `UPDATE transactions
SET transactions.transaction_amount = (
    SELECT SUM(orders.quantity * products.price)
    FROM orders
    JOIN products ON orders.product_id = products.product_id
    WHERE orders.transaction_id = transactions.transaction_id
)
WHERE EXISTS (
    SELECT 1
    FROM orders
    WHERE orders.transaction_id = transactions.transaction_id
);`
    }, 
    productQueries: {
        createProductQuery: `INSERT INTO products (name, price, stocks, variants, images) VALUES (?, ?, ?, ?, ?)`,
        getProductsQuery: `SELECT * FROM products`,
        updateProductsQuery: `SELECT * FROM products WHERE product_id = ?`,
        

        
    }
}





module.exports = queries;