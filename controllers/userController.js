const User = require('../models/User');

/**
 * @desc    Create a new user (CREATE)
 * @route   POST /api/users
 */
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Save new user to database
        const newUser = await User.create({ name, email, age });
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Get all users with basic filtering, sorting, searching, and pagination
 * @route   GET /api/users
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Create a copy of the query parameters
        let queryObj = { ...req.query };

        // Exclude internal functional parameters from matching document fields
        const excludeFields = ['sort', 'search', 'page', 'limit'];
        excludeFields.forEach(param => delete queryObj[param]);

        // 1. Basic Filtering
        let query = User.find(queryObj);

        // 2. Text Search Feature
        if (req.query.search) {
            query = User.find({
                name: { $regex: req.query.search, $options: 'i' }
            });
        }

        // 3. Sorting Feature
        if (req.query.sort) {
            query = query.sort(req.query.sort);
        } else {
            query = query.sort('-createdAt'); // Default sorting: Newest records first
        }

        // 4. Pagination Feature (Layman: Splitting records into pages)
        // Convert string parameters to numbers using parseInt()
        const page = parseInt(req.query.page, 10) || 1;    // Default to page 1
        const limit = parseInt(req.query.limit, 10) || 5;  // Default to 5 records per page
        const skip = (page - 1) * limit;                  // Calculate records to bypass

        query = query.skip(skip).limit(limit);

        // Get total count of matching documents for frontend metrics
        const totalUsers = await User.countDocuments();

        // Execute the final query configuration
        const users = await query;
        
        res.status(200).json({ 
            success: true, 
            count: users.length,
            pagination: {
                currentPage: page,
                limitPerPage: limit,
                totalRecords: totalUsers,
                totalPages: Math.ceil(totalUsers / limit)
            },
            data: users 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

 

/**
 * @desc    Get a single user by ID (READ ONE)
 * @route   GET /api/users/:id
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Update user details (UPDATE)
 * @route   PUT /api/users/:id
 */
exports.updateUser = async (req, res) => {
    try {
        // { new: true } returns the modified document rather than the original
        // { runValidators: true } ensures the update data respects our schema rules
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Delete a user (DELETE)
 * @route   DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};