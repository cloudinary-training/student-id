require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open")

// open(cloudinary.url("sample.jpg", {
//   background: "#000000",
//   color: "#000000",
//   gravity: "south",
//   overlay: {
//     font_family: "arial",
//     font_size: 160,
//     font_weight: "bold",
//     text_align: "center",
//     text: "%24%28data%29",
//   },
//   width: 300,
//   y: -140,
//   crop: "scale",
// });)

open(
  cloudinary.url("sample", {
    transformation: [
      {
        variables: [
          [
            "$data","!test!"

          ],
          ["$bcolor", "!yellow!"],
          ["$mycolor", "!red!"]
        ],
      },
      {
        transformation: ["v-text-2"]
      },
    ],
  })
);

// https://res.cloudinary.com/pictures77/image/upload/$data_!test!,$mycolor_!red!,$bcolor_!yellow!/t_v-text-2/sample.jpg