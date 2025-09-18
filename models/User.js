const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Поле email є обов'язковим"],
    unique: true,
    match: [/.+\@.+\..+/, "Будь ласка, введіть коректний email"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Поле пароль є обов'язковим"],
    minlength: [6, "Пароль повинен містити щонайменше 6 символів"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
