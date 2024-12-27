import User from "../models/User.js";

// create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedUser,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create, Try again" });
  }
};

//update User

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updateUser,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update, Try again" });
  }
};

//delete User

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

//getSingleUser User

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const User = await User.findById(id);

    res
      .status(200)
      .json({ success: true, message: "Successfully data found", data: User });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not Found" });
  }
};

//getAllUser User

export const getAllUser = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const Users = await User.find({})
      .skip(page * 8)
      .limit(8);

    res
      .status(200)
      .json({
        success: true,
        count : Users.length,
        message: "Successfully found all data",
        data: Users,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Not Found" });
  }
};


//get User by search 
export const getUserBySearch = async(req, res)=>{

    //i here means case sensitive
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try{

        //gte means greater than equal
        const Users = await User.find({ city , distance:{$gte:distance},
        maxGroupSize:{$gte : maxGroupSize}})

        res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: Users,
        });

    }
    catch(err){
        res.status(500).json({ success: false, message: "Not Found" });
    }
  }