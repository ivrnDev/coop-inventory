module.exports = {
    customerQueries: {
        createCustomerQuery: `
            INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)`,
        getCustomersQuery: `
            SELECT * FROM customers
        `
    },

    orderQueries: {
        getPriceQuery: `
            SELECT variant_price, variant_name FROM variants WHERE product_id = ? AND variant_id = ?
        `,
        createOrderQuery: `
            INSERT INTO orders (transaction_id, product_id, variant_name, quantity, order_total) VALUES (?, ?, ?, ?, ?)
        `,
        getAllOrdersQuery: `
            SELECT o.id as order_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_status, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id;
        `
    },

    productQueries: {
        createProductQuery: `
            INSERT INTO products (product_name, display_name, display_price, product_stocks, product_description, product_image) VALUES (?, ?, ?, ?, ?, ?)
        `,
        createVariantQuery: `
            INSERT INTO variants (variant_id, product_id, variant_name, variant_symbol, variant_price) VALUES (?, ?, ?, ?, ?)
        `,
        createProductAlbumQuery: `
            UPDATE products SET product_albums = ? WHERE product_id = ?
        `,
        getProductsQuery: `
            SELECT * FROM products
        `,
        getProductByIdQuery: `
            SELECT * FROM products WHERE product_id = ?
        `,
        updateProductQuery: `
            UPDATE products SET display_name = ?, display_price = ?, product_stocks = ?, product_description = ?, product_image = ? WHERE product_id = ?
        `,
        updateVariantQuery: `
            UPDATE variants SET variant_name = ?, variant_symbol = ?, variant_price = ? WHERE product_id = ? AND variant_id = ?
        `
    },

    transactionQueries: {
        createTransactionQuery: `
             INSERT INTO transactions (customer_id, transaction_amount) VALUES (?, 0)
        `,
        updateTransactionAmountQuery: `
            UPDATE transactions SET transaction_amount = ? WHERE transaction_id = ?
        `,
        getAllTransactionsQuery: `
            SELECT t.transaction_id, c.customer_name, c.customer_phone, c.customer_email, t.transaction_amount, t.payment_method, t.status as order_status, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.customer_id = c.customer_id
        `,
        updateTransactionStatusQuery: `
            UPDATE transactions SET status = ? WHERE transaction_id = ?
        `
    },

    analyticsQueries: {
        getProductSalesQuery: `
        SELECT o.product_id, p.product_name, SUM(quantity) as total_orders, SUM(order_total) as total_amount
        FROM orders as o
        JOIN products as p ON o.product_id = p.product_id
        GROUP BY o.product_id
        `,

    }
}




