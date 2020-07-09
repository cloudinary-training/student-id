require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");

function makeBadge(publicId, data) {
  return cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          [
            "$data",
            `${data}`,
            // "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!",
            // "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A                                          !",
          ],
        ],
      },
      {
        transformation: ["v-badge"],
      },
    ],
  });
}

const students = [
  {
    publicId: "student-id/70515c87b8bef780882d33988f6a92c9",
    data:
      "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!",
  },
  {
    publicId: "student-id/7c6a64a7014b51d4a2dd29fee1b8bc82",
    data:
      "!Boris%20Kelly%250ADev Ops%250ABlue%20Origin%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!",
  },
];

students.forEach((student) => {
  const url = makeBadge(student.publicId, student.data);
  console.log(url);
  open(url);
});

// const url = makeBadge(
//   "student-id/0c05701c223b0f32b6f064efae191b9c",
//   "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!"
// );

// console.log(url);
// open(url);
