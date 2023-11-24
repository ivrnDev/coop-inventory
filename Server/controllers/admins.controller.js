const { Validate, Phrases } = require("../lib/activity");
const fs = require('fs').promises;
const {
  createNewAdminDB,
  updateAdminDB,
  getAllAdminsDB,
  getAdminByIdDB,
  getAdminPermissionDB,
  createNewActivityDB,
  getAllActivitiesDB,
  getAllActivitiesSearchDB,
  getActivityByIdDB,
  verifyAdminDB,
  updateLoginDB

} = require("../services/admins.services");


module.exports = {
  createNewAdmin: async (req, res) => {
    const { admin_name, admin_username, admin_password, role } = req.body;
    try {
      let profilePicture;
      if (req.file) {
        profilePicture = req.file.buffer;
      } else {
        const defaultprofilePicture = './public/default-profile.jpg';
        try {
          profilePicture = await fs.readFile(defaultprofilePicture);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default profile picture" });
        }
      };

      const result = await createNewAdminDB(admin_name, admin_username, admin_password, role, profilePicture)
      if (!result) return res.status(400).json({ message: 'Failed to create new admin' })
      return res.status(201).json({ message: 'Successfully created a new admin', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  updateAdmin: async (req, res) => {
    const { id } = req.params;
    const { admin_name, admin_username, admin_password, role } = req.body;
    try {
      let profilePicture;
      if (req.file) {
        profilePicture = req.file.buffer;
      } else {
        const defaultprofilePicture = './public/default-profile.png';
        try {
          profilePicture = await fs.readFile(defaultprofilePicture);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };

      const result = await updateAdminDB(id, admin_name, admin_username, admin_password, role, profilePicture)
      if (result === null) return res.status(400).json({ message: `There is no available admin with an ID of ${id}` })
      if (!result) return res.status(400).json({ message: `Failed to update admin with an ID of ${id}` })
      return res.status(201).json({ message: 'Successfully updated the admin', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  updateLogin: async (req, res) => {
    const { admin_username, admin_password } = req.body;
    try {
      const result = await updateLoginDB(admin_username, admin_password)
      if (result === null) return res.status(400).json({ message: `There is no available admin with an ID of ${id}` })
      if (!result) return res.status(400).json({ message: `Failed to update admin with an ID of ${id}` })
      return res.status(201).json({ message: 'Successfully updated the admin', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  getAllAdmins: async (req, res) => {
    try {
      const result = await getAllAdminsDB();
      if (result === null) return res.status(400).json({ message: 'There is no available admin' })
      if (!result) return res.status(400).json({ message: 'Failed to get all admin' })
      return res.status(200).json({ message: 'Successfully get all admins', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  getAdminById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getAdminByIdDB(id);
      if (result === null) return res.status(400).json({ message: `There is no available admin with an ID of ${id}` })
      if (!result) return res.status(400).json({ message: 'Failed to get admin' })
      return res.status(200).json({ message: `Successfully get admin with an ID of ${id}`, result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  getAdminPermission: async (req, res) => {
    const { password } = req.query;
    const { roles } = req.body;
    try {
      const result = await getAdminPermissionDB(password, roles);
      if (result === null) return res.status(400).json({ message: `There is no available` })
      if (result === 0) return res.status(403).json({ message: `Admin has no permission` })
      if (!result) return res.status(400).json({ message: 'Failed to get admin' })
      return res.status(200).json({ message: `Access granted`, result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  createNewActivity: async (req, res) => {
    const { action, target, object, change } = req.body;
    const { id } = req.query;
    const Validation = new Validate();

    if (!Validation.action(action)) return res.status(400).json({ message: "Invalid action type" })
    if (!Validation.target(target)) return res.status(400).json({ message: "Invalid target type" })

    try {
      const admin = await getAdminByIdDB(id);
      if (admin === null) return res.status(404).json({ message: `There is no admin with an Id of ${id}` })

      const { admin_name } = admin[0];
      const Messages = new Phrases(admin_name, action, target, object, change);
      const message = Messages.getPhrase();
      if (message === null) return res.status(400).json({ message: "Couldn't create activity message" })

      const result = await createNewActivityDB(id, action, target, object, change, message)

      if (!result) return res.status(400).json({ message: 'Failed to create new activity' })
      return res.status(201).json({ message: 'Successfully created a new activity', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  getAllActivities: async (req, res) => {
    const { search } = req.query;
    try {
      if (search) {
        const searchActivity = await getAllActivitiesSearchDB(search);
        if (searchActivity === null) return res.status(404).json({ message: 'There is no available activities' })
        if (!searchActivity) return res.status(400).json({ message: 'Failed to get all activities' })
        return res.status(200).json({ message: `Successfully get admins with filter ${search}`, result: searchActivity })
      } else {
        const getActivities = await getAllActivitiesDB();
        if (getActivities === null) return res.status(404).json({ message: 'There is no available activities' })
        if (!getActivities) return res.status(400).json({ message: 'Failed to get all activities' })
        return res.status(200).json({ message: 'Successfully get all admins', result: getActivities })
      }

    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  getActivityById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getActivityByIdDB(id);
      if (result === null) return res.status(400).json({ message: `There is no available activity with an ID of ${id}` })
      if (!result) return res.status(400).json({ message: 'Failed to get activity' })
      return res.status(200).json({ message: `Successfully get activity with an ID of ${id}`, result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },
  verifyAdmin: async (req, res) => {
    const { admin_username, admin_password } = req.body;
    try {
      const result = await verifyAdminDB(admin_username, admin_password);
      if (!result || result[0].count === 0) return res.status(401).json({ message: `Failed to login` })
      if (result[0].count === 1) {
        return res.status(200).json({ message: `Successfully Login`, result: result })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    }
  },


}