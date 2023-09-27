module.exports = {
    customerQueries: {
        createCustomerQuery: `
            INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)`,
        getCustomersQuery: `
            SELECT * FROM customers
        `
    },
    orderQueries: {
        createOrderQuery: `
            INSERT INTO orders (transaction_id, product_id, variant_name, quantity, order_total, order_status) VALUES (?, ?, ?, ?, ?, ?)
        `,
        getAllOrdersQuery: `
            SELECT o.id as order_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_status, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id;
        `,
        getOrderbyIdQuery: `
            SELECT o.id as order_id, o.transaction_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_status, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id
            WHERE id = ?
        `,
        getOrderbyTransactionIdQuery: `
            SELECT o.id as order_id, o.transaction_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_status, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id
            WHERE transaction_id = ?
        `,
        getVariantPriceQuery: `
            SELECT variant_price, variant_name FROM variants WHERE product_id = ? AND variant_id = ?
        `,
        updateOrderStatusByIDQuery: `
            UPDATE orders SET order_status = ? WHERE id = ?
        `,
        updateOrderStatusByTransactionIDQuery: `
            UPDATE orders SET order_status = ? WHERE transaction_id = ?
        `,

    },
    productQueries: {
        createProductQuery: `
            INSERT INTO products (product_name, display_name, display_price, product_stocks, product_description, display_image) VALUES (?, ?, ?, ?, ?, ?)
        `,
        createVariantQuery: `
            INSERT INTO variants (variant_id, product_id, variant_name, variant_symbol, variant_price, variant_stocks) VALUES (?, ?, ?, ?, ?, ?)
        `,
        getAllProductsQuery: `
            SELECT * FROM products
        `,
        getProductByIdQuery: `
            SELECT * FROM products WHERE product_id = ?
        `,
        updateProductQuery: `
            UPDATE products SET display_name = ?, display_price = ?, product_stocks = ?, product_description = ?, display_image = ? WHERE product_id = ?
        `,
        updateVariantQuery: `
            UPDATE variants SET variant_name = ?, variant_symbol = ?, variant_price = ?, variant_stocks = ? WHERE product_id = ? AND variant_id = ?
        `,
        addProductStocksQuery: `
            UPDATE products SET product_stocks = product_stocks + ? WHERE product_id = ?
        `,
        subtractProductStocksQuery: `
            UPDATE products SET product_stocks = product_stocks - ? WHERE product_id = ?
        `,
        addProductSoldQuery: `
            UPDATE products SET product_sold = product_sold + ? WHERE product_id = ?
        `,
        subtractProductSoldQuery: `
            UPDATE products SET product_sold = product_sold - ? WHERE product_id = ?
        `,
        addVariantStocksQuery: `
            UPDATE variants SET variant_stocks = variant_stocks + ? WHERE id = ?
        `,
        subtractVariantStocksQuery: `
           UPDATE variants SET variant_stocks = variant_stocks - ? WHERE id = ?
        `,
    },
    albumQueries: {
        createProductAlbumQuery: `
            INSERT INTO albums (product_id, product_photo) VALUES (?, ?)    
        `,
        updateProductAlbumImageQuery: `
            UPDATE albums SET product_photo = ? WHERE photo_id = ?
        `,
        getAllAlbumsQuery: `
            SELECT * FROM albums
        `,
        getAlbumByIdQuery: `
            SELECT * FROM albums WHERE photo_id = ?
        `,
        getProductAlbumByIDQuery: `
            SELECT * FROM albums WHERE product_id = ?
        `,

    },
    transactionQueries: {
        createTransactionQuery: `
             INSERT INTO transactions (customer_id, payment_method) VALUES (?, ?)
        `,
        getAllTransactionsQuery: `
            SELECT t.transaction_id, c.customer_name, c.customer_phone, c.customer_email, t.transaction_amount, t.payment_method, t.status as order_status, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.customer_id = c.customer_id
        `,
        getTransactionByIdQuery: `
            SELECT t.transaction_id, c.customer_name, t.transaction_amount, t.payment_method, t.status as order_status, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.customer_id = c.customer_id
            WHERE transaction_id = ?
        `,
        updateTransactionAmountQuery: `
            UPDATE transactions SET transaction_amount = ? WHERE transaction_id = ?
        `,
        updateTransactionStatusQuery: `
            UPDATE transactions SET status = ? WHERE transaction_id = ?
            `,
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




