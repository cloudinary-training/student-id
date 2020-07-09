require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

open(
  cloudinary.url("student-id/70515c87b8bef780882d33988f6a92c9", {
    transformation: [
      {
        variables: [
          [
            "$data","!vvv%20vvv%250Avvv%250Avvv%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!"
          ]
        ],
      },
      {
        transformation: ["v-badge"]
      },
    ],
  })
);

