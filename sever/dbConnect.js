const mongoose = require("mongoose");

module.exports = async () => {
  const mongoosurl =
    "mongodb+srv://uks08122002:cqjynrJbMvWf5m5k@cluster0.dqv9j.mongodb.net/Apoiment?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(mongoosurl);
    console.log("connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
