module.exports = {
    customerQueries: {
        createCustomerQuery: `
            INSERT INTO customers (student_id, customer_name, customer_phone, customer_email) VALUES (?, ?, ?, ?)`,
        getCustomersQuery: `
            SELECT * FROM customers
        `,
        getCustomerbyIdQuery: `
            SELECT * FROM customers WHERE student_id = ?
        `,
        verifyCustomerQuery: `
            SELECT *,
            (REGEXP_REPLACE(LOWER(student_name), '[[:space:]]', '') REGEXP REPLACE(LOWER(?), ' ', '') OR
            REGEXP_REPLACE(LOWER(student_name), '[[:space:]]', '') REGEXP REVERSE(REPLACE(LOWER(?), ' ', ''))) AS match_found
            FROM student
            WHERE student_id = ?;

        `
    },
    orderQueries: {
        createOrderQuery: `
            INSERT INTO orders (transaction_id, product_id, variant_name, quantity, order_total) VALUES (?, ?, ?, ?, ?)
        `,
        getAllOrdersQuery: `
            SELECT o.id as order_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id;
        `,
        getOrderbyIdQuery: `
            SELECT o.id as order_id, o.transaction_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id
            WHERE id = ?
        `,
        getOrderbyTransactionIdQuery: `
            SELECT
            o.id as order_id,
            o.transaction_id,
            p.product_id,
            p.product_name,
            o.variant_name,
            o.quantity as order_quantity,
            o.order_total,
            o.date_created as date,
            SUM(o.order_total) OVER () as overall_total
            FROM orders as o
            JOIN products AS p ON o.product_id = p.product_id
            WHERE transaction_id = ?;
        `,
        getVariantPriceQuery: `
            SELECT variant_price, variant_name FROM variants WHERE product_id = ? AND variant_id = ?
        `,

    },
    productQueries: {
        createProductQuery: `
            INSERT INTO products (category_id, product_name, display_name, display_price, product_stocks, product_description, display_image) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        createVariantQuery: `
            INSERT INTO variants (variant_id, product_id, variant_name, variant_symbol, variant_price, variant_stocks) VALUES (?, ?, ?, ?, ?, ?)
        `,
        getAllVariantsQuery: `
            SELECT * FROM variants
        `,
        getVariantByIdQuery: `
            SELECT * FROM variants WHERE id = ?
        `,
        getVariantByProductIdQuery: `
            SELECT * FROM variants WHERE product_id = ?
        `,
        deleteVariantsQuery: `
            DELETE FROM variants WHERE product_id = ?
        `,
        getAllCategoryQuery: `
            SELECT * FROM category WHERE isDeleted = '0';
        `,
        getCategoryByIdQuery: `
            SELECT * FROM category WHERE category_id = ? AND isDeleted = 0;
        `,
        getCategoryByNameQuery: `
            SELECT category_name FROM category WHERE category_name = ?
        `,
        createNewCategoryQuery: `
          INSERT INTO category (category_name, category_image) VALUES (?, ?) 
        `,
        updateCategoryByIdQuery: `
          UPDATE category SET category_name = ?, category_image = ? WHERE category_id = ? 
        `,
        deleteCategoryByIdQuery: `
          UPDATE category SET isDeleted = ? WHERE category_id = ? 
        `,
        updateIsDeletedById: `
          UPDATE products SET isDeleted = ? WHERE product_id = ? 
        `,
        getAllProductsQuery: `
            SELECT * FROM products as p
            JOIN category as ct ON p.category_id = ct.category_id
            WHERE p.isDeleted = '0' AND ct.isDeleted = '0'
        `,
        getProductByIdQuery: `
            SELECT * FROM products as p
            JOIN category as ct ON p.category_id = ct.category_id
            WHERE p.product_id = ? AND p.isDeleted = '0'
        `,
        getProductByNameQuery: `
            SELECT product_name FROM products WHERE product_name = ?
        `,
        updateProductQuery: `
            UPDATE products SET category_id = ?, display_name = ?, display_price = ?, product_description = ?, status = ?, isFeatured = ?, display_image = ? WHERE product_id = ?
        `,
        updateVariantQuery: `
            UPDATE variants SET variant_name = ?, variant_symbol = ?, variant_price = ?, variant_stocks = ? WHERE product_id = ? AND variant_id = ?
        `,
        updateProductStocksQuery: `
            UPDATE products SET product_stocks = ? WHERE product_id = ?        
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
            UPDATE variants SET variant_stocks = variant_stocks + ? WHERE variant_name = ? AND product_id = ?
        `,
        subtractVariantStocksQuery: `
           UPDATE variants SET variant_stocks = variant_stocks - ? WHERE variant_name = ? AND product_id = ?
        `,
        updateProductImageQuery: `
            UPDATE products SET display_image = ? WHERE product_id = ?
        `

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
        deleteAlbumByProductIdQuery: `
            DELETE FROM albums WHERE product_id = ?
        `,


    },
    transactionQueries: {
        createTransactionQuery: `
            INSERT INTO transactions (student_id, payment_method, reference_number, pickup_date) VALUES (?, ?, ?, ?)
        `,
        getAllTransactionsQuery: `
            SELECT t.transaction_id, c.customer_name, c.customer_phone, c.customer_email, t.transaction_amount, t.payment_method, t.status as order_status, t.reference_number, t.pickup_date, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.student_id = c.student_id
        `,
        getAllFilteredTransactionsQuery: `
            SELECT t.transaction_id, c.customer_name, c.customer_phone, c.customer_email, t.transaction_amount, t.payment_method, t.status as order_status, t.reference_number, t.pickup_date, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.student_id = c.student_id
            WHERE t.status = ?
        `,
        getTransactionByIdQuery: `
            SELECT t.transaction_id, c.customer_name, c.customer_phone, c.customer_email, t.transaction_amount, t.payment_method, t.status as order_status, t.reference_number, t.pickup_date, t.transaction_date
            FROM transactions as t
            JOIN customers AS c ON t.student_id = c.student_id
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
        getOrdersDetailStatus: `
            SELECT
            COUNT(*) AS total_orders,
            COUNT(CASE WHEN DATE(transaction_date) = CURRENT_DATE THEN 1 END) as new_orders,
            COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_orders,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_orders
            FROM transactions;
        `
    },
    bannerQueries: {
        createBannerQuery: `
            INSERT INTO banner (banner_image) VALUES(?)
        `,
        updateBannerQuery: `
            UPDATE banner SET banner_image = ? WHERE banner_Id = ?
        `,
        getAllBannersQuery: `
            SELECT * FROM banner
        `,
        getBannerByIdQuery: `
            SELECT * FROM banner WHERE banner_id = ?
        `
    },
    adminQueries: {
        createNewAdminQuery: `
            INSERT INTO admin (admin_name, admin_username, admin_password, role, profile_picture) VALUES(?, ?, ?, ?, ?)
        `,
        updateAdminQuery: `
            UPDATE admin SET admin_name = ?, admin_username = ?, admin_password = ?, role = ?, profile_picture = ? WHERE admin_id = ?
        `,
        getAllAdminsQuery: `
            SELECT * FROM admin
        `,
        getAdminByIdQuery: `
           SELECT * FROM admin WHERE admin_id = ?
        `,
        verifyAdminQuery: `
          SELECT COUNT(*) as count FROM admin WHERE admin_username = ? AND admin_password = ? AND admin_id = '1000'
        `,
        getAdminPermissionQuery: `
           SELECT * FROM admin WHERE admin_id = ? and role = ?
        `,
        getIdByPasswordQuery: `
           SELECT admin_id, role FROM admin WHERE admin_password = ?
        `,
        createNewActivityQuery: `
           INSERT INTO activity (admin_id, action, target, object, target_change, message) VALUES (?, ?, ?, ?, ?, ?)
        `,
        getAllActivitiesSearchQuery: `
           SELECT * FROM activity WHERE CONCAT(id, admin_id, message, date) REGEXP ?;
        `,
        getAllActivitiesQuery: `
           SELECT * FROM activity ORDER BY date DESC;
        `,
        getActivityByIdQuery: `
           SELECT * FROM activity WHERE id = ?
        `,
    }
}




