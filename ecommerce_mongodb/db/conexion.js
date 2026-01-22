const mongoose = require('mongoose');

async function connect(uri) {
  return new Promise(async (resolve, reject) => {
    await mongoose.connect(uri).then((res) => {
      console.log("connected successfully")
      resolve({db:mongoose,"result":true})
    }).catch((err) => {

      console.log("error DB")
      reject({"error":err,"result":false});
    });

  });



};

module.exports = { connect }
