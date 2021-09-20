const Type = require("../models/type.model");
exports.getType = async (req, res) => {
  res.render("type.ejs");
};

exports.postType = async (req, res) => {
  if (req.session.isAdmin == true) {
    console.log(req.body);
    let recordsExisted = await Type.find({ typeName: req.body.typeName });
    if (recordsExisted.length > 0) {
      res.send({ msg: "typeName existed" }, 409);
    } else {
      const type = new Type({
        typeName: req.body.typeName,
      });
      console.log(req.body.typeName);
      await type.save();

      res.redirect("/admin");
    }
  } else {
    res.render("auth/auth-error.ejs");
  }
};
