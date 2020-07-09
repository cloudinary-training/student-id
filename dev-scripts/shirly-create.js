require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.api.create_transformation("v-text-2", {
  transformation: [
    {
      overlay: {
        font_family: "arial",
        font_size: 160,
        text: "%24%28data%29",
        font_style: "bold",
        text_align: "center",
      },
      gravity: "south",
      color: "$mycolor",
      background: "$bcolor",
      width: 300,
      y: "-140",
    },
  ],
},function(res,err){console.log(res,err)});