const bcrypt = require('bcrypt');
const db = require('../models'); // Assuming you're using Sequelize for database models

const updateUser = async (req, res, next) => {
  try {
    const { name, password, avatar, phone, oldPassword, email, UserId } = req.body;

    // Find user by ID
    const user = await db.User.findByPk(UserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if old password matches
    const matching = bcrypt.compareSync(oldPassword, user.password);
    if (!matching) {
      return res.status(401).json({
        success: false,
        message: 'Password incorrect',
      });
    }

    // Build the updated user data, hash the new password if provided
    const updateData = {
      name,
      avatar,
      phone,
      email,
      password: password ? bcrypt.hashSync(password, 10) : user.password, // Hash new password if provided
    };

    // Update user data
    await db.User.update(updateData, {
      where: { id: UserId },
    });

    // Return success without including the password in the response
    const { password: hashedPassword, ...userData } = updateData; // Exclude password from response

    return res.status(200).json({
      success: true,
      user: userData,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

//get data page for agent
const getAgent = async (req, res) => {
    try {
        const { current, userid } = req.body;
        const itemsPerPage = 9;
        const offset = (current - 1) * itemsPerPage;

        const properties = await db.Property.findAll({
            where: {
                agentid: userid,
            },
            limit: itemsPerPage,
            offset: offset,
        });

        // Fetch submissions for each property
        const propertyIds = properties.map(property => property.id);
        const submissions = await db.submission.findAll({
            where: { propertyId: propertyIds },
        });

        // Structure the response to include submissions and images
        const propertiesWithSubmissions = properties.map(property => {
            return {
                ...property.dataValues,
                // Assuming images are stored as a JSON array in the database
                images: JSON.parse(property.dataValues.images || '[]'), // Ensure images are parsed as an array
                submissions: submissions.filter(submission => submission.propertyId === property.id),
            };
        });

        return res.json({
            success: properties.length > 0,
            message: properties.length > 0 ? 'got' : 'cannot get',
            properties: propertiesWithSubmissions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
//get data page for user
const getUser = async (req, res) => {
    try {
        const {userid } = req.body;
        const submission = await db.submission.findAll({
            where: {
                userid: userid,
            },
        });
        return res.json({
            message: "good",
            sub: submission,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
module.exports = { getAgent,updateUser,getUser};
