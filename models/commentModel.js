const mongoose = require( 'mongoose' );


const CommentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 20
    }, 
    comment : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 20
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
    CommentSchema,
    CommentModel
};