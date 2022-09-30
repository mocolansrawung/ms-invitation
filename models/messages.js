const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name can not be blank"],
    },
    isAttending: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
});

const Message = mongoose.model("Message", productSchema);

module.exports = Message;
