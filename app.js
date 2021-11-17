const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
const port = process.env.PORT;

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id interdum diam. Etiam fringilla lorem a tincidunt pellentesque. Phasellus quis dolor efficitur, vulputate sem ac, facilisis quam. Praesent egestas metus sed odio accumsan sagittis. Ut vulputate, mauris ut sagittis tempus, lectus erat sagittis nunc, nec sodales nunc mauris eu nisl. Pellentesque ornare purus et nibh maximus sagittis. Mauris in magna a erat rhoncus euismod sit amet at leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc euismod nunc nec consequat ultricies.Etiam ac fermentum orci. Donec neque leo, sollicitudin eu condimentum sodales, ornare eget eros. Donec aliquam eros eget turpis vulputate, quis ultricies purus porta. Cras pretium luctus nibh eu rhoncus. Phasellus accumsan sed dui in malesuada. Vivamus quis mi a lectus convallis posuere in vel ligula. Morbi facilisis sagittis magna quis varius. Vestibulum bibendum neque massa, in scelerisque ante sodales id. Nam vehicula ex augue, sit amet faucibus ante vulputate ac. Maecenas faucibus tellus non tristique condimentum. Fusce luctus interdum ultrices. Cras ultricies sit amet augue vitae rutrum. Praesent scelerisque ligula blandit, scelerisque est quis, fringilla enim. Duis rutrum venenatis magna eu ultrices.Pellentesque aliquam metus sit amet nisl aliquet, in ultrices nisi convallis. Aenean venenatis nunc fermentum odio maximus placerat. Proin vel urna interdum, fringilla orci vitae, commodo lacus. In in dolor ut neque vulputate iaculis. Ut ut massa elit. Nunc in arcu nulla. Donec id pharetra elit, non congue turpis. Suspendisse diam lorem, congue sit amet ante eu, euismod ultrices mi. Nam blandit, lectus et porttitor ultricies, sem purus eleifend est, vel cursus tellus nisl varius libero. Maecenas imperdiet non sem non elementum."

const aboutStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vulputate mauris, et auctor nibh. Aliquam dictum massa sed luctus lacinia. Sed suscipit cursus lacus ac auctor. Quisque venenatis rutrum magna in semper.";

const conactStartingContent ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vulputate mauris, et auctor nibh. Aliquam dictum massa sed luctus lacinia. Sed suscipit cursus lacus ac auctor. Quisque venenatis rutrum magna in semper.";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


const posts = [];

app.get('/', (request,response) => {
  response.render('home', {homeBlogPost: posts});
});

app.get('/about', (request,response) => {
  response.render('about', {aboutEjs: aboutStartingContent});
});

app.get('/contact', (request,response) => {
  response.render('contact', {contactEjs: conactStartingContent});
});

app.get('/compose', (request,response) => {
  response.render('compose')
});

app.post('/compose', (request,response) => {
  const post = {
    inputTitle: request.body.postTitle,
    inputBody: request.body.postBody
  }
  posts.push(post);
  response.redirect('/');
});

app.get('/post/:postId', (request,response) => {
  const requestedTitle = _.lowerCase(request.params.postId);

  posts.forEach( (post) => {
    const storedTitle = _.lowerCase(post.inputTitle);

    if(storedTitle === requestedTitle) {
      response.render('post', {singlePostTitle: post.inputTitle, singlePostBody:post.inputBody});
    }
  });
});


app.listen(port || 3000, () => {
  console.log("Running on port 3000")
});
