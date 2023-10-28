const { adminQueries } = require("../db/dbQueries");
const { createNewAdminQuery } = adminQueries;
const pool = require('../db/database')
module.exports = {
  createNewAdminDB: (admin_name, admin_username, admin_password, profilePicture) => {
    return new Promise((resolve, reject) => {
      pool.execute(createNewAdminQuery,
        [admin_name, admin_username, admin_password, profilePicture],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    })
  },
  updateAdminDB: () => {

  },
  getAllAdminsDB: () => {

  },
  getAdminByIdDB: () => {

  },
}