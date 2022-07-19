const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
