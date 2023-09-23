const queries = {
    customers: `INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)`,
    receiptSelect: `
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
    customers.customer_email;
`,
    updateTransactionAmount: `UPDATE transactions
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


}


module.exports = queries;
