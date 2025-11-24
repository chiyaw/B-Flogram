const express = require('express');
const port = 3001;
const dbConnection = require("./db");
const UserModel = require("./models/userModel")

const cors = require('cors')


const app = express();
app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
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


app.post('/login', (req, res) => {
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

app.get('/user/:id', (req, res) => {
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

app.get('/profile/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if(user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
})

app.get('/', async (req, res) => {
    const posts = await PostModel.find({});
    if(posts) {
        res.json(posts);
    } else {
        res.status(404).json({ error: 'Posts not found' });
    }
})


app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON : ${port}`)
})



app.get('/', (req, res) => {
    res.send('Hello World! This is a home page');
});

app.post('/', (req, res) => {
    res.send();
});
