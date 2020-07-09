require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

open(
  cloudinary.url("student-id/ac167e1abc8195345299ec153a521d1e", {
    transformation: [
      {
        variables: [
          ["$data","!vvv!"],
          ["$color","!#ff0000!"],
          ["$bgcolor","!#0000ff!"]
        ],
      },
      {
        transformation: ["v-badge-color"]
      },
    ],
  })
);

