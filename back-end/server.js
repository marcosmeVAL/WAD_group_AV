const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// jwt

// POST /api/signup → register
// POST /api/login → login
// GET /api/logout → logout
// GET /api/auth → authCheck: returns 200 if JWT is valid, 401 otherwise

// GET /api/posts → getAllPosts (homepage)
// GET /api/posts/:id → getPost (“a post” page)
// POST /api/posts → addPost
// PUT /api/posts/:id → updatePost
// DELETE /api/posts/:id → deleteSinglePost
// DELETE /api/posts → **deleteAllPosts`
// PUT /api/posts/:id/like
// DELETE /api/posts/like
