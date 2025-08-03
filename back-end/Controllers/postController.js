import Post from '../models/Post.js';

export const createPost = async (req, res) => {
try {
    const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    author: req.user._id
    });
    res.status(201).json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const getAllPosts = async (req, res) => {
try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const getSinglePost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const updatePost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
    }
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updated = await post.save();
    res.json(updated);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const deletePost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(401).json({ message: 'Not authorized' });
    }
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const likePost = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
    post.likes.splice(index, 1);
    }
    const updated = await post.save();
    res.json(updated);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const addComment = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    const comment = {
    user: req.user._id,
    text: req.body.text
    };
    post.comments.push(comment);
    const updated = await post.save();
    res.json(updated);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

export const deleteComment = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== req.params.commentId
    );
    const updated = await post.save();
    res.json(updated);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};
