require("dotenv").config();
const cloudinary = require("cloudinary").v2;


cloudinary.api
  .create_transformation("v-badge-color", {
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
        color: "$color",
        background: "$bgcolor",
        width: 300,
        y: "-140",
      },
    ]
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
