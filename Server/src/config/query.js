const queries = {
    customerQueries: {
        getCustomersQuery: `SELECT * FROM customers`
    },

    orderQueries: {
        createCustomerQuery: `
        INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)`,
        createTransactionQuery: `
         INSERT INTO transactions (customer_id, transaction_amount) VALUES (?, 0)
        `,
        getPriceQuery: `SELECT variant_price FROM variants WHERE product_id = ? AND variant_id = ?`,
        createOrderQuery: `INSERT INTO orders (transaction_id, product_id, variant_id, quantity, order_total) VALUES (?, ?, ?, ?, ?)`,
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
        createProductQuery: `INSERT INTO products (product_name, display_name, display_price, product_stocks, product_description, product_image) VALUES (?, ?, ?, ?, ?, ?)`,
        createVariantQuery: `INSERT INTO variants (variant_id, product_id, variant_name, variant_symbol, variant_price) VALUES (?, ?, ?, ?, ?)`,
        getProductsQuery: `SELECT * FROM products`,
        getProductByIdQuery: `SELECT * FROM products WHERE product_id = ?`,
        updateProductQuery: `UPDATE products SET product_name = ?, display_name = ?, display_price = ?, product_stocks = ?, product_description = ?, product_image = ? WHERE product_id = ?`,
        updateVariantQuery: `UPDATE variants SET variant_name = ?, variant_symbol = ?, variant_price = ? WHERE product_id = ? AND variant_id = ? `
    }
}





module.exports = queries;