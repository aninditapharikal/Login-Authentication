const mongoose=require('mongoose');

const schema=mongoose.Schema;
const eventSchema = new schema({
    email: String,
    eventName: String,
    eventId: Number,
    eventDate: Date,
    evntLocation: String
})

module.exports=mongoose.model('event',eventSchema,'events');