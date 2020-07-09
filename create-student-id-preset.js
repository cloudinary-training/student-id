require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.api.create_upload_preset({
  name: 'student-id',
  folder: 'student-id',
  disallow_public_id: true,
  unsigned: true,
  use_file_name: false,
  unique_filename: false,
  return_delete_token: true,
  faces: true,
  invalidate: true,
  type: "upload",
  tags: "student-id",
  transformation: [{
    width: 300,
    height: 300,
    quality: "auto",
    crop: 'fill',
    gravity: 'face',
    effect:"auto_saturation"
  }, {
    fetch_format: "auto",
    quality: "auto",
    dpr: "auto"
  }]
})
.then(uploadResult => console.log(uploadResult))
.catch(error => console.error(error));