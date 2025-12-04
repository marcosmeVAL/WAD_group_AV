const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(
    cors({ 
        origin: 'http://localhost:8080', credentials: true
    }));

app.use(express.json());
app.use(cookieParser());

const secret = "jfewofwoni3424#3io5njfWQRI#%¤#fwkojfwe";
const maxAge = 60*60;
// jwt

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn:maxAge })
//jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
};

// POST /auth/signup → register
// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request arrived!!");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// POST /auth/login → login
app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// GET /auth/logout → logout
//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

// GET /auth/auth → authCheck: returns 200 if JWT is valid, 401 otherwise
// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// used for checking if the user is logged in
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ authenticated: false, error: 'No token' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log(err.message);
            return res.status(401).json({ authenticated: false, error: 'Invalid token' });
        }
        req.user = decoded; // { id: ... }
        next();
    });
};

// GET /api/posts → getAllPosts (homepage)
app.get('/api/posts', requireAuth, async (req, res) => {
    try {
        console.log("received get all posts request!");
        const results = await pool.query(`SELECT * FROM "posts" ORDER BY created_at DESC`);
        res.status(200).json(results.rows);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"});
    }
});
// GET /api/posts/:id → getPost (“a post” page)
app.get('/api/posts/:id', requireAuth, async (req, res) => {
    try {
        console.log("received get a single post request!");
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM "posts" WHERE "id" = $1`, [id]);
        
        const post = result.rows[0]
        if (!post) return res.status(404).json({ error: "Not found!"}); 
        res.status(200).json(post);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"});
    }
});
// POST /api/posts → addPost
app.post('/api/posts', requireAuth, async (req, res) => {
    try {
        const { body } = req.body;
        const result = 
            await pool.query(
                `INSERT INTO posts (body) VALUES ($1) RETURNING *`, 
                [body]
            );
        res.status(201).json(result.rows[0]);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"})
    }
});
// PUT /api/posts/:id → updatePost
app.put('/api/posts/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const result = 
            await pool.query(
                `UPDATE posts SET body = $2 WHERE id = $1 RETURNING *`, 
                [id, body],
            );
        const updatedPost = result.rows[0];
        if (!updatedPost)
            return res.status(404).json({ error: 'Post not found' });

        res.status(200).json(updatedPost);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"})
    }
});
// DELETE /api/posts/:id → deleteSinglePost
app.delete('/api/posts/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = 
            await pool.query(
                `DELETE FROM posts WHERE id = $1`, 
                [id],
            );
        if (result.rowCount === 0) 
            return res.status(404).json({ error: "Post not found" }); 
        
        res.status(200).json({ success: result.rowCount > 0});
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"})
    }
});
// DELETE /api/posts → **deleteAllPosts`
app.delete('/api/posts', requireAuth, async (req, res) => {
    try {
        await pool.query(`DELETE FROM posts`)
        res.status(200).json({ success: true });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: "Server error!"})
    }
});


// Seda pole vaja, voib kustutada kui ei viitsi teha 
// vahemalt tundus nagu poleks vaja
// PUT /api/posts/:id/like
// DELETE /api/posts/like


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});