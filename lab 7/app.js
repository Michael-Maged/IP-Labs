const express = require('express');

const app = express();
app.use(express.json());

let nextPostId = 1;

const posts = [];

const findPostById = (id) => posts.find((post) => post.id === Number(id));

app.get('/', (req, res) => {
    res.send('Mini Twitter API is running');
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const { content, author } = req.body;

    if (!content) {
        return res.status(400).send('content is required');
    }

    const post = {
        id: nextPostId++,
        content,
        author: author || 'anonymous',
    };

    posts.push(post);
    return res.status(201).send(post);
});

app.get('/posts/:id', (req, res) => {
    const post = findPostById(req.params.id);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    return res.send(post);
});

app.put('/posts/:id', (req, res) => {
    const post = findPostById(req.params.id);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    const { content } = req.body;

    if (!content) {
        return res.status(400).send('content is required');
    }

    post.content = content;
    return res.send(post);
});

app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex((post) => post.id === Number(req.params.id));

    if (postIndex === -1) {
        return res.status(404).send('Post not found');
    }

    posts.splice(postIndex, 1);

    return res.send('Post deleted successfully');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});