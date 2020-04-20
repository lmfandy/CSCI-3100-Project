const upload = require("./uploadPhotoMiddleware");

const uploadPhoto = async (req, res) => {
  try {
    await upload(req, res);
    if (req.files == undefined) {
      return res.send("You must select a file.");
    }
    return res.send("File has been uploaded.");
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};

module.exports = {
  uploadPhoto: uploadPhoto
};
