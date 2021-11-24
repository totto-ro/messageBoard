const express = require( 'express' );
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');

mongoose.connect( 'mongodb://localhost/messages_db', {useNewUrlParser:true} );

const { MessageModel } = require('./models/messageModel');

app.use(flash());
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/static') );
app.use(session({secret: 'verySecret'}));

app.use( express.urlencoded({ extended: true }) );

//render index 
app.get("/", function( request, response ){
    MessageModel
    .getAllMessages()
    .then( data =>{
        console.log( data );
        response.render( 'index', { messages:data });
    })
    .catch(err => console.log(err));
});

//create messages
app.post("/newMessage", function( request, response ){
    console.log(request.body);

    const name = request.body.name;
    const message = request.body.message;

    const newMessage = {
        name,
        message,
    };
    MessageModel
        .createMessage( newMessage )
        .then( result => {
            console.log("New message: " + result);
            console.log("---------------------------- ");
            response.redirect('/');
        })
        .catch( err => {
            console.log( "Something went wrong!", err );
            request.flash( 'messageError', 'You have to fill all the spaces!' );
            response.redirect( '/' );
        })
});

//create comments of messages
app.post("/comments/addComment", function( request, response ){
    const id = request.body.message_id;
    const name = request.body.name;
    const comment = request.body.comment;

    const newComment = {
        name,
        comment,
    };
    MessageModel
        .createComment( id, newComment )
        .then( result => {
            console.log("New comment: " + result);
            response.redirect("/");
        })
        .catch( err => {
            console.log("---------------------------- ");
            console.log( "Something went wrong!", err );
            console.log("---------------------------- ");
            request.flash( 'errorComment', 'You have to fill all the spaces!' );
            response.redirect( '/' );
        })
});


app.listen(7077, function() {
    console.log("running on port 7077");
});