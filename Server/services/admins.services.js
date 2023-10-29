const { adminQueries } = require("../db/dbQueries");
const { createNewAdminQuery, updateAdminQuery, getAllAdminsQuery, getAdminByIdQuery } = adminQueries;
const pool = require('../db/database')
module.exports = {
  createNewAdminDB: (admin_name, admin_username, admin_password, role, profilePicture) => {
    return new Promise((resolve, reject) => {
      pool.execute(createNewAdminQuery,
        [admin_name, admin_username, admin_password, role, profilePicture],
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    })
  },
  updateAdminDB: (id, admin_name, admin_username, admin_password, role, profilePicture) => {
    return new Promise(async (resolve, reject) => {
      const idExist = await module.exports.getAdminByIdDB(id);
      if (idExist === null) resolve(null);

      pool.execute(updateAdminQuery,
        [admin_name, admin_username, admin_password, role, profilePicture, id],
        (error, result) => {
          if (error) return reject(error);
          const admin = {
            admin_id: id,
            admin_name: admin_name,
            admin_username: admin_username,
            admin_password: admin_password,
            profile_picture: profilePicture.toString('base64'),
          }
          return resolve(admin);

        }
      );
    })

  },
  getAllAdminsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllAdminsQuery,
        [],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === null) {
            return resolve(null)
          } else {
            const admin = result.map((value) => ({
              admin_id: value.admin_id,
              admin_name: value.admin_name,
              admin_username: value.admin_username,
              admin_password: value.admin_password,
              role: value.role,
              profile_picture: value.profile_picture.toString('base64'),
            }))
            return resolve(admin);
          }
        }
      );
    })
  },
  getAdminByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getAdminByIdQuery,
        [id],
        (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) {
            return resolve(null)
          } else {
            const admin = result.map((value) => ({
              admin_id: value.admin_id,
              admin_name: value.admin_name,
              admin_username: value.admin_username,
              admin_password: value.admin_password,
              role: value.role,
              profile_picture: value.profile_picture.toString('base64'),
            }))
            return resolve(admin);
          }
        }
      );
    })

  },
}