const { PrismaClient } = require('@prisma/client');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');

const prisma = new PrismaClient()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  helpers: require('./helpers/handlebarsHelpers'),
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/posts/:postId', async function(req, res, next) {
  try {
    // Get post by id from database
    const post = await prisma.post.findUniqueOrThrow({ 
      where: { id: parseInt(req.params.postId) }, 
      include: { comments: {
        orderBy: {
          created: 'desc'
        },
        include: { author: true, upvotes: true}
      }}
    });
    // Get currently logged in user
    // TODO: Replace this with actual authentication
    const user = Math.floor(Math.random()*3) + 1
    // Render post.hbs to the user
    res.render('post', {post, user })
  } catch (error) {
    // Return a 404 if post not found matching ID
    next(createError(404));
  }
});

app.post('/api/posts/:postId/comments', async function(req, res, next) {
  try {
    // Create comment from user input
    if (req.body.body.length > 0 && req.body.body.length <= 800) {
      const comment = await prisma.comment.create({
        data: {
          post: {
            connect: { id: parseInt(req.params.postId) }
          },
          body: req.body.body,
          author: {
            connect: { id: parseInt(req.body.authorId) }
          }
        },
        include: {
          author: true
        }
      })
      // Return 201 (created)
      res.status(201).json(comment);
    } else {
      res.status(500).send('Bad request.')
    }
  } catch (error) {
    // Comment creation failed; return 500 error.
    res.status(500).send('Bad request.')
  }
});

app.post('/api/comments/:commentId/upvote', async function(req, res, next) {
  try {
    // Create upvote for logged in user
    const upvote = await prisma.upvote.create({
      data: {
        comment: {
          connect: { id: parseInt(req.params.commentId) }
        },
        user: {
          connect: { id: parseInt(req.body.userId) }
        }
      }
    })
    // Return 201 (created)
    res.status(201).json(upvote);
  } catch (error) {
    // Error. User already upvoted this comment, so return 500 Bad Request
    res.status(500).send('Bad request.');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
