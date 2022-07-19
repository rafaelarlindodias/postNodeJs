const express = require('express');
const router = express.Router();

const Post = require("../models/post"); // importa a  coleção
const bcrypt = require("bcrypt");

router.post('/postar', (req, res) => {
  Post.findOne({username: req.body.username, email: req.body.email, comentario: req.body.comentario})
  .then(postagem => {
    if (postagem) {
      return res.status(400).json({emailerror: "Você já cadastrou esse post, digite outro!"});
    }else{
      //  dadps para serem inseridos no bd
        const new_post = Post({
          username: req.body.username,
          email: req.body.email,
          senha: req.body.senha,
          comentario: req.body.comentario
        });

        // criptografia senha
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(new_post.senha, salt, function(err, hash) {

              if (err) throw err;
              new_post.senha = hash;

                // salva no bd
                new_post
                .save()
                .then(p => res.json(p))
                .catch(err => console.log(err));

            });
        });
      }
  })
  .catch(err => console.log(err));
});

router.get("/", (req, res) => res.json({status: "Acesso permitido"}));

module.exports = router;
