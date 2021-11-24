const mongoose = require( 'mongoose' );
const {CommentModel, CommentSchema} = require('./commentModel')

const MessageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 20
    }, 
    message : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 100
    },
    comments:[CommentSchema]
    
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Message = mongoose.model( 'messages', MessageSchema );

const MessageModel = {
    createMessage : function( newMessage ){
        return Message.create( newMessage );
    },
    getAllMessages : function( ){
        return Message.find().sort( { created_at: -1 } );
    },
    getMessageById : function( id ){
        return Message.findOne( { _id : id } );
    },
    updateMessage : function( id, newMessage ){
        return Message.updateOne( { _id : id }, newMessage );
    },
    destroyMessage : function( id ){
        return Message.deleteOne({ _id : id });
    },
    createComment: function( id, newComment ){
        return Message.updateOne( { _id : id }, {$push:{comments: newComment}})
    },
    updateUserComment : function( id, newComment ){
        return CommentModel.addComment( newComment )
            .then( result => {
                return Message.findByIdAndUpdate({_id: id}, {$push: {comments: result}});
            });
    }

};

module.exports = {MessageModel};