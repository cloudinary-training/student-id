require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

open(
  cloudinary.url("student-id/70515c87b8bef780882d33988f6a92c9", {
    background: "#0e2f5a",
    color: "#db8226",
    gravity: "south",
    overlay: {
      font_family: "arial",
      font_size: 160,
      font_weight: "bold",
      text_align: "center",
      text: "vvv%20vvv%250Avvv%250Avvv%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20",
    },
    width: 300,
    y: -140,
    crop: "scale",
  })
);

// transformation: [
//   {
//     overlay: {
//       font_family: "arial",
//       font_size: 160,
//       text: "%24%28data%29",
//       font_style: "bold",
//       text_align: "center",
//     },
//     gravity: "south",
//     color: "#DB8226",
//     background: "#0E2F5A",
//     width: 300,
//     y: "-140",
//   },
// ],
