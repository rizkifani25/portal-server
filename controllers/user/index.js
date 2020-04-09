const mongoose = require("mongoose");

const accountModel = require("../../models/user");
const postModel = require("../../models/post");

const customerModel = require("../../models/customer");

// user login
exports.login = async (req, res) => {
  const { username, password } = req.query;

  let query;

  if (username != null && password != null) {
    query = {
      user_name: username,
      password: password,
    };

    await accountModel
      .findOne(query, { _id: 0, __v: 0 })
      .exec()
      .then((data) => {
        if (data != null) {
          res.status(200).send({
            data: "Login berhasil.",
            permission: true,
          });
        } else {
          res.status(200).send({
            data: "Login gagal. Username atau password tidak valid.",
            permission: false,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          data: "Login gagal. Kesalahan server.",
        });
      });
  } else {
    res.status(400).send({
      data: "Kolom username dan password wajib diisi.",
    });
  }
};

// user register
exports.register = async (req, res) => {
  const { username, dp_url, name, email, phone, password } = req.query;

  if (username && dp_url && name && email && phone && password) {
    const query = {
      user_name: username,
    };

    await accountModel
      .findOne(query)
      .exec()
      .then(async (data) => {
        if (data) {
          res.status(201).json({
            message: "Username sudah digunakan.",
            color: "danger",
          });
        } else {
          const newAccount = new accountModel({
            _id: new mongoose.Types.ObjectId(),
            user_name: username,
            dp_url: dp_url,
            name: name,
            email: email,
            phone: phone,
            password: password,
            followers: 0,
          });

          await newAccount
            .save()
            .then((data) => {
              res.status(201).send({
                message: "Registrasi berhasil. Silahkan login.",
                color: "success",
              });
            })
            .catch((err) => {
              res.send({
                message: "Kesalahan server. Gagal membuat user baru.",
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          message: err,
        });
      });
  } else {
    res.status(201).send({
      message: "Form tidak lengkap. Harap isi semua kolom di dalam form.",
      color: "danger",
    });
  }
};

// get user post
exports.getUserPost = async (req, res) => {
  const { username } = req.query;

  const query = {
    user_name: username,
  };

  await postModel
    .find(query, { _id: 0, __v: 0 })
    .exec()
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Kesalahan server.",
      });
    });
};

// get user data
exports.getUserData = async (req, res) => {
  const { username } = req.query;

  const query = {
    user_name: username,
  };

  accountModel
    .findOne(query, { _id: 0, __v: 0, password: 0 })
    .exec()
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err: err,
      });
    });
};

// user create new post
exports.userCreatePost = async (req, res) => {
  const { username, content } = req.query;

  const newPost = new postModel({
    _id: new mongoose.Types.ObjectId(),
    user_name: username,
    content: content,
    like: 0,
  });

  await newPost
    .save()
    .then((data) => {
      res.status(201).send({
        message: "Berhasil memposting.",
        color: "success",
      });
    })
    .catch((err) => {
      res.send({
        message: "Kesalahan server. Gagal membuat post baru.",
      });
    });
};

// user delete a post
exports.deletePost = async (req, res) => {
  const { username, content } = req.query;

  const query = {
    user_name: username,
    content: content,
  };

  postModel
    .findOneAndDelete(query)
    .then((response) => {
      res.status(200).send({
        message: "Berhasil menghapus post.",
        color: "success",
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
};

// user edit profile
exports.updateUserProfile = async (req, res) => {
  const { username, name, email, phone, password } = req.query;

  const query = {
    user_name: username,
  };

  const update = {
    name: name,
    email: email,
    phone: phone,
  };

  accountModel
    .findOneAndUpdate(query, update)
    .then((response) => {
      res.status(200).send({
        message: "Berhasil memperbarui profil anda.",
        color: "success",
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
};

// customer
exports.addData = async (req, res) => {
  const { name, data } = req.query;

  const newData = new customerModel({
    _id: new mongoose.Types.ObjectId(),
    name_customer: name,
    desc_customer: data,
  });

  newData
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Berhasil menambahkan.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "Kesalahan server. Gagal membuat user baru.",
      });
    });
};

exports.allCustomer = async (req, res) => {
  customerModel
    .find()
    .exec()
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Kesalahan server. Gagal memuat customer",
      });
    });
};

exports.deleteCustomer = async (req, res) => {
  const { name, data } = req.query;

  customerModel
    .deleteOne({ name_customer: name, desc_customer: data })
    .exec()
    .then((data) => {
      res.status(200).send({
        message: "Berhasil menghapus customer.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "Kesalahan server. Gagal menghapus customer.",
      });
    });
};
