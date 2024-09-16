const { use } = require("bcrypt/promises");
const User = require("../../models/User");
const AppError = require("../../utils/AppError");
const httphandler = require("../../utils/httpStatusText");

const getUser=async(req,res)=>{
    const user=await User.findById(req.params.Id)
    {
        if(!user) 
        {
            const error = AppError.create('User not found', 404, httphandler.FAILURE);
            return next(error);
        }
       res.json({ status: httphandler.SUCCESS, data: { 
        user:user.username,
        user:user.email
    }
    });
    }
};


const updateUser = async (req, res, next) => {
    const _id = req.params.Id;
    const data = req.body;

    try {
     
        const user = await User.findById(_id).select('+password');

        if (!user) {
            const error = AppError.create('User not found', 404, httphandler.FAILURE);
            return next(error);
        }

        if (data.username) user.username = data.username;
        if (data.email) user.email = data.email;
        if (data.password) user.password = data.password; 


        const updatedUser = await user.save();

        res.status(200).json({
            status: httphandler.SUCCESS,
            data: {
                username: updatedUser.username,
                email: updatedUser.email,
                password: 'updated' 
            }
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getUser,
    updateUser
};