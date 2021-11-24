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
        minlength : 2,
        maxlength : 200
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Comment = mongoose.model('comments', CommentSchema);

const CommentModel = {
    addComment : function( newComment ){
        return Comment.create( newComment );
    }
}

module.exports = {
    CommentSchema,
    CommentModel
};