const { createNewAdminDB, updateAdminDB, getAllAdminsDB, getAdminByIdDB } = require("../services/admins.services");

module.exports = {
  createNewAdmin: async (req, res) => {
    const { admin_name, admin_username, admin_password } = req.body;
    try {
      let profilePicture;
      if (req.file) {
        profilePicture = req.file.buffer;
      } else {
        const defaultprofilePicture = './public/profile-picture.jpg';
        try {
          profilePicture = await fs.readFile(defaultprofilePicture);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };
      
      const result = await createNewAdminDB(admin_name, admin_username, admin_password, profilePicture)
      if (!result) return res.status(400).json({ message: 'Failed to create new admin' })
      return res.status(201).json({ message: 'Successfully created a new admin', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  updateAdmin: () => {

  },
  getAllAdmins: () => {

  },
  getAdminById: () => {

  },

}