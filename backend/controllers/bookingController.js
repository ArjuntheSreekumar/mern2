import Booking from '../models/Bookings.js'

export const createBooking = async(req,res) => {
    const newBooking = new Booking(req.body)
    try{
        const savedBooking = await newBooking.save()
        res.status(200).json({success:true,message:"ur toor booked",data:savedBooking})

    }
    catch(err){
        res.status(500).json({success:true,message:'internal server error'})
    }
};
export const getBooking = async(req,res)=>{
    const id = req.params.id
    try{
        const book=await Booking.findById(id)
        res.status(200).json({success:true,message:"ur toor booked",data:book})

    }
    catch(err){
        res.status(500).json({success:true,message:'internal server error'})
    }
}

export const getAllBooking = async(req,res)=>{
    try{
        const books=await Booking.find()
        res.status(200).json({success:true,message:"ur toor booked",data:books})

    }
    catch(err){
        res.status(500).json({success:true,message:'internal server error'})
    }
}