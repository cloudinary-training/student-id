require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.api
  .update_transformation("v-badge", {
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
        color: "#DB8226",
        background: "#0E2F5A",
        width: 300,
        y: "-140",
      },
    ],
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

