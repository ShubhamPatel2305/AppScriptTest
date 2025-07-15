const asyncHandler = require('express-async-handler');
const SalesTeam = require('../models/salesTeam.model');
const Platform = require('../models/platformMaster.model');
const UserAuth = require('../models/userAuth.model');
// const { getIO, getUserSocketMap } = require('../utils/socket.utils');

require('dotenv').config();

class SalesTeamController {

syncFromRequest = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const platformMap = {
      fb: 'Facebook',
      ig: 'Instagram',
      google: 'Google',
    };

    const platformKey = data.platform?.toLowerCase();
    const platformName = platformMap[platformKey];

    const platforms = await Platform.find({});
    const platformIdMap = {};
    platforms.forEach(p => {
      platformIdMap[p.name.toLowerCase()] = p._id;
    });

    const createdTime = new Date(data.created_time);
    if (!createdTime || isNaN(createdTime)) {
      return res.status(400).json({ success: false, message: 'Invalid created_time' });
    }

    const contactNumber = data.phone?.replace(/[^\d]/g, '').slice(-10);
    if (!contactNumber || contactNumber.length !== 10) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    if (!data.full_name || data.full_name.trim() === '') {
      return res.status(400).json({ success: false, message: 'full_name is required' });
    }

    let salesperson = await UserAuth.findOne({ isSalesAssociate: true, lastlyAssigned: null });

    if (!salesperson) {
      const agg = await UserAuth.aggregate([
        { $match: { isSalesAssociate: true } },
        { $sort: { lastlyAssigned: 1 } },
        { $limit: 1 }
      ]);
      salesperson = agg[0] ? await UserAuth.findById(agg[0]._id) : null;
    }

    if (!salesperson) {
      throw new Error('No sales associate available for assignment.');
    }

    salesperson.lastlyAssigned = new Date();
    await salesperson.save();

    const item = {
      contactNumber,
      email: data.email?.toLowerCase(),
      fullName: data.full_name,
      jobtitle: data.job_title,
      city: data.state,
      salesAssociate: salesperson._id,
    };

    if (platformName && platformIdMap[platformName.toLowerCase()]) {
      item.platform = platformIdMap[platformName.toLowerCase()];
    }

    await SalesTeam.findOneAndUpdate(
      { contactNumber },
      { $set: item },
      { upsert: true, new: true }
    );

    // const io = getIO();
    // const socketMap = getUserSocketMap();
    // const socketId = socketMap[salesperson.email.toLowerCase()];
    // if (socketId) {
    //   io.to(socketId).emit('lead-assigned', {
    //     message: 'You have been assigned a new lead.',
    //     lead: {
    //       name: data.full_name,
    //       phone: contactNumber,
    //       email: data.email,
    //       jobtitle: data.job_title,
    //       platform: platformName || platformKey,
    //       createdTime
    //     }
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Lead synced and assigned successfully.'
    });

  } catch (error) {
    console.error('Error syncing from request:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to sync from request',
      error: error.message
    });
  }
});
}

module.exports = new SalesTeamController();