const mongoose=require('mongoose');
const EventSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      organizer: {
        type: String,
        required: true
      },
      image:{
        type:String
       
    },
    //   category: {
    //     type: String,
    //     required: true
    //   },
    //   registrationDeadline: {
    //     type: Date
    //   },
    //   capacity: {
    //     type: Number,
    //     required: true
    //   },
      status: {
        type: String,
        // enum: ['upcoming', 'ongoing', 'completed'],
        // default: 'upcoming'
      }
},{timestamps:true});

const Event=mongoose.model('Event',EventSchema);


module.exports=Event