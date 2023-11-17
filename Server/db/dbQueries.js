module.exports = {
    customerQueries: {
        createCustomerQuery: `
            INSERT INTO customer (transaction_id, student_id, student_phone) VALUES (?, ?, ?)`,
        getCustomersQuery: `
            SELECT * FROM customer
        `,
        getCustomerbyIdQuery: `
            SELECT * FROM customer WHERE student_id = ?
        `,
        verifyCustomerQuery: `
            SELECT CASE WHEN(
                  REPLACE(LOWER(student_name), ' ', '') LIKE REPLACE(LOWER(?), ' ', '') || '%' OR
                  REPLACE(REPLACE(LOWER(student_name), ' ', ''), ' ', '') LIKE REPLACE(LOWER(?), ' ', '') || '%'
            ) AND student_id = ? AND student_email = ?
            THEN TRUE ELSE FALSE END AS verified
            FROM student WHERE student_id = ?;

        `
    },
    orderQueries: {
        createOrderQuery: `
            INSERT INTO order_data (transaction_id, product_id, variant_name, quantity, order_total) VALUES (?, ?, ?, ?, ?)
        `,
        getAllOrdersQuery: `
            SELECT o.id as order_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_total
            FROM order_data as o
            JOIN product AS p ON o.product_id = p.product_id;
        `,
        getOrderbyIdQuery: `
            SELECT o.id as order_id, o.transaction_id, p.product_name, o.variant_name, o.quantity as order_quantity, o.order_total
            FROM order_data as o
            JOIN product AS p ON o.product_id = p.product_id
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
            FROM order_data as o
            JOIN product AS p ON o.product_id = p.product_id
            WHERE transaction_id = ?;
        `,
        getVariantPriceQuery: `
            SELECT variant_price, variant_name FROM variant WHERE product_id = ? AND variant_id = ?
        `,

    },
    productQueries: {
        createProductQuery: `
            INSERT INTO product (category_id, product_name, display_name, display_price, product_stocks, product_description, display_image) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        createVariantQuery: `
            INSERT INTO variant (variant_id, product_id, variant_name, variant_symbol, variant_price, variant_stocks) VALUES (?, ?, ?, ?, ?, ?)
        `,
        getAllVariantsQuery: `
            SELECT * FROM variant
        `,
        getVariantByIdQuery: `
            SELECT * FROM variant WHERE id = ?
        `,
        getVariantByProductIdQuery: `
            SELECT * FROM variant WHERE product_id = ?
        `,
        deleteVariantsQuery: `
            DELETE FROM variant WHERE product_id = ?
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
          UPDATE product SET isDeleted = ? WHERE product_id = ? 
        `,
        getAllProductsQuery: `
            SELECT * FROM product as p
            JOIN category as ct ON p.category_id = ct.category_id
            WHERE p.isDeleted = '0' AND ct.isDeleted = '0' 
            AND (ct.category_name = ? OR ? IS NULL);

        `,
        getProductByIdQuery: `
            SELECT * FROM product as p
            JOIN category as ct ON p.category_id = ct.category_id
            WHERE p.product_id = ? AND p.isDeleted = '0'
        `,
        getProductByNameQuery: `
            SELECT product_name FROM product WHERE product_name = ?
        `,
        updateProductQuery: `
            UPDATE product SET category_id = ?, display_name = ?, display_price = ?, product_description = ?, status = ?, isFeatured = ?, display_image = ? WHERE product_id = ?
        `,
        updateVariantQuery: `
            UPDATE variant SET variant_name = ?, variant_symbol = ?, variant_price = ?, variant_stocks = ? WHERE product_id = ? AND variant_id = ?
        `,
        updateProductStocksQuery: `
            UPDATE product SET product_stocks = ? WHERE product_id = ?        
        `,
        addProductStocksQuery: `
            UPDATE product SET product_stocks = product_stocks + ? WHERE product_id = ?
        `,
        subtractProductStocksQuery: `
            UPDATE product SET product_stocks = product_stocks - ? WHERE product_id = ?
        `,
        addProductSoldQuery: `
            UPDATE product SET product_sold = product_sold + ? WHERE product_id = ?
        `,
        subtractProductSoldQuery: `
            UPDATE product SET product_sold = product_sold - ? WHERE product_id = ?
        `,
        addVariantStocksQuery: `
            UPDATE variant SET variant_stocks = variant_stocks + ? WHERE variant_name = ? AND product_id = ?
        `,
        subtractVariantStocksQuery: `
           UPDATE variant SET variant_stocks = variant_stocks - ? WHERE variant_name = ? AND product_id = ?
        `,
        updateProductImageQuery: `
            UPDATE product SET display_image = ? WHERE product_id = ?
        `,
        getProductByFeaturedQuery: `
            SELECT display_image, display_price, product_name, product_id FROM product WHERE isFeatured = 1 AND isDeleted = 0
        `,

    },
    albumQueries: {
        createProductAlbumQuery: `
            INSERT INTO album (product_id, product_photo) VALUES (?, ?)    
        `,
        updateProductAlbumImageQuery: `
            UPDATE album SET product_photo = ? WHERE photo_id = ?
        `,
        getAllAlbumsQuery: `
            SELECT * FROM album
        `,
        getAlbumByIdQuery: `
            SELECT * FROM album WHERE photo_id = ?
        `,
        getProductAlbumByIDQuery: `
            SELECT * FROM album WHERE product_id = ?
        `,
        deleteAlbumByProductIdQuery: `
            DELETE FROM album WHERE product_id = ?
        `,


    },
    transactionQueries: {
        createTransactionQuery: `
            INSERT INTO transaction (student_id, payment_method, reference_number, pickup_date) VALUES (?, ?, ?, ?)
        `,
        getAllTransactionsQuery: `
            SELECT t.transaction_id, s.student_name, c.student_phone, s.student_email, t.transaction_amount, t.payment_method, t.status as order_status, t.reference_number, t.pickup_date, t.transaction_date
            FROM customer as c
            JOIN transaction AS t ON c.transaction_id = t.transaction_id
            JOIN student AS s ON c.student_id = s.student_id
        `,
        getTransactionByIdQuery: `
            SELECT t.transaction_id, s.student_name, c.student_phone, s.student_email, t.transaction_amount, t.payment_method, t.status as order_status, t.reference_number, t.pickup_date, t.transaction_date
            FROM customer as c
            JOIN transaction AS t ON c.transaction_id = t.transaction_id
            JOIN student AS s ON c.student_id = s.student_id
            WHERE c.transaction_id = ?
        `,
        updateTransactionAmountQuery: `
            UPDATE transaction SET transaction_amount = ? WHERE transaction_id = ?
        `,
        updateTransactionStatusQuery: `
            UPDATE transaction SET status = ? WHERE transaction_id = ?
            `,
    },
    analyticsQueries: {
        getProductSalesQuery: `
            SELECT o.product_id, p.product_name, SUM(quantity) as sold, SUM(o.order_total) as revenue
            FROM order_data as o
            JOIN product as p ON o.product_id = p.product_id
            JOIN transaction as t ON o.transaction_id = t.transaction_id
            WHERE t.status = "completed"
            GROUP BY o.product_id
        `,
        getOrdersDetailStatus: `
            SELECT
            COUNT(*) AS total_orders,
            COUNT(CASE WHEN DATE(transaction_date) = CURRENT_DATE THEN 1 END) as new_orders,
            COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_orders,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_orders
            FROM transaction;
        `,
        salesQuery: `
           SELECT SUM(o.quantity) as sold, SUM(o.order_total) as revenue, DAY(t.transaction_date) as day, WEEK(t.transaction_date) as week, MONTH(t.transaction_date) as month, YEAR(t.transaction_date) as year, t.transaction_date as transaction_date
           FROM order_data as o
           JOIN transaction as t ON o.transaction_id = t.transaction_id
    	   WHERE t.status = "completed"
           GROUP BY DAY(t.transaction_date)
        `,
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
            SELECT * FROM admin WHERE role <> 'admin' AND isDeleted = 0;
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




