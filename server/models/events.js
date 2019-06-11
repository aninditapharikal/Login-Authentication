const mongoose=require('mongoose');

const schema=mongoose.Schema;
const eventSchema = new schema({
    description: String,
    eventName: String,
    eventId: Number,
    eventDate: String,
})

module.exports=mongoose.model('event',eventSchema,'events');