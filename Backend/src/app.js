const express = require('express');
const port = 3001;
const dbConnection = require("./db");
const UserModel = require("./models/userModel")
const PostModel = require("./models/postModel")

const cors = require('cors')


const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

app.post('/api/register', (req, res) => {
    console.log('📝 Register request received:', req.body);
    UserModel.create(req.body)
    .then(users => {
        console.log('✅ User created successfully');
        res.json(users);
    })
    .catch(err => {
        console.error('❌ Error creating user:', err);
        res.status(400).json({ error: err.message });
    })
});


app.post('/api/login', (req, res) => {
    const {user, password} = req.body;
    UserModel.findOne({user:user})
    .then(user =>{
        if(user) {
            if(user.password === password) {
                res.json({ message: 'Success', userId: user._id })
            } else {
                res.json({ message: 'the password is incorrect' })
            }
        } else {
            res.json({ message: 'No record exist' })
        }
    })
})

app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    UserModel.findById(userId)
    .then(user => {
        if(user) {
            res.json({ 
                user: user.user,
                bio: user.bio,
                privateAccount: user.privateAccount,
                profilePic: user.profilePic,
                followers: user.followers,
                following: user.followings,
                created_at: user.createdAt
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    })
    .catch(err => {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: err.message });
    })
})

app.get('/api/profile/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    const posts = await PostModel.find({ user: userId }).populate('user').sort({ createdAt: -1 });
    if(user) {
        res.json({
            user: user,
            posts: posts
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
})

app.get('/api/user-posts/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await PostModel.find({
            user: userId
        })
        .populate('user')
        
        res.json({
            success: true,
            posts: posts
        });
    } catch(err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
})


app.post('/api/addpost', async (req, res) => {
    try {
      console.log("📝 New post data received:", req.body);
  
      const newPost = await PostModel.create({
        description: req.body.description,
        image: req.body.image,
        user: req.body.user,
        comments: req.body.comments || [],
        likes: req.body.likes || []
      });
  
      console.log("✅ Post created successfully");
      return res.status(201).json({
        success: true,
        post: newPost
      });
  
    } catch (err) {
      console.error("❌ Error creating post:", err);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
  });
  

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').sort({ createdAt: -1 }); // populate user details if needed

    return res.status(200).json({
      success: true,
      posts: posts.map(post => ({
        id: post._id,
        description: post.description,
        image: post.image,
        comments: post.comments,
        likes: post.likes,
        user: post.user,
        created_at: post.createdAt
      }))
    });

  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/all-users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON : ${port}`)
})



app.get('/', (req, res) => {
    res.send('Hello World! This is a home page');
});

app.post('/api/', (req, res) => {
    res.send();
});
