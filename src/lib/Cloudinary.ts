const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

cloudinary.uploader.upload('path/to/your/pdf/file.pdf', function(error:Error, result:string) {
    console.log(result, error);
  });
  