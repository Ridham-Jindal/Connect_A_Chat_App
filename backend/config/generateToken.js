<<<<<<< HEAD
//jwt is a web token which helps in authorisation basically a coded message sent by user to our backend which 
//will be matched. If it matches then the user is provided with the access

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
}

module.exports = generateToken;
=======
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
>>>>>>> fedf8033f683436a7b02fcb39217e7ba4af00de5
