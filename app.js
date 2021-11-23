const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/blogDB');
}


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//db

const postSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  content: {
    type:String,
    required:true
  }
});

const Post = mongoose.model('Post', postSchema);

//end db

app.get('/', (request,response) => {
  Post.find({},(err,showPosts) => {
    if(!err) {
      response.render('home', {homeBlogPosts: showPosts});
    } else {
      console.log(err);
    }
  });


});

app.get('/compose', (request,response) => {
  response.render('compose')
});

app.post('/compose', (request,response) => {
  const postForm = new Post ({
    title: request.body.postTitle,
    content: request.body.postBody
  });
  postForm.save((err) => {
    if(!err) {
      response.redirect('/');
    }
  });
});

app.get('/post/:postId', (request,response) => {
  const requestedPost = (request.params.postId);

  Post.findOne({_id: requestedPost}, (err,foundPost) => {
    response.render('post', {singlePostTitle: foundPost.title, singlePostBody:foundPost.content});
  });
});

app.get('/about', (request,response) => {
  response.render('about', {aboutEjs: aboutStartingContent});
});

app.get('/contact', (request,response) => {
  response.render('contact', {contactEjs: conactStartingContent});
});


app.listen(port || 3000, () => {
  console.log("Running on port 3000")
});
