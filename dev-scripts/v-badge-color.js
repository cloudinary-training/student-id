require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");



open(
  cloudinary.url("student-id/7c6a64a7014b51d4a2dd29fee1b8bc82", {
    transformation: [
      {
        variables: [
          [
            "$data","!vvv%20vvv%250Avvv%250Avvv%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!"
            // "$data","!test!"

          ],
          ["$color", "!rgb:ff0000!"],
          ["$bgcolor", "!rgb:0000ff!"]
        ],
      },
      {
        transformation: ["v-badge-color"]
      },
    ],
  })
);

// open(
//   cloudinary.url("student-id/7c6a64a7014b51d4a2dd29fee1b8bc82", {
//     transformation: [
//       {
//         variables: [
//           [
//             "$data","!test!"

//           ],
//           ["$bcolor", "!yellow!"],
//           ["$mycolor", "!red!"]
//         ],
//       },
//       {
//         transformation: ["v-text-2"]
//       },
//     ],
//   })
// );



// function makeBadge(student) {
//   return cloudinary.url(student.publicId, {
//     transformation: [
//       {
//         variables: [
//           [
//             "$data",
//             "!vvv%20vvv%250Avvv%250Avvv%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!"                                        !",
//           ],
//           ["$color", "!%23F2D865!"],
//           ["$bgcolor", "!%23231F20!"]
//         ],
//       },
//       {
//         transformation: ["v-badge-color"],
//       },
//     ],
//   });
// }

// const students = [
//   {
//     publicId: "student-id/70515c87b8bef780882d33988f6a92c9",
//     color: "!%23F2D865!",
//     bgcolor:"!%23231F20!",
//     data:
//       "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!",
//   },
//   {
//     publicId: "student-id/7c6a64a7014b51d4a2dd29fee1b8bc82",
//     color: "!%23231F20!",
//     bgcolor:"!%23F2D865!",
//     data:
//       "!Boris%20Kelly%250ADev Ops%250ABlue%20Origin%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!",
//   },
// ];

// students.forEach((student) => {
//   const url = makeBadge(student);
//   console.log(url);
//   open(url);
// });

// const url = makeBadge(
//   "student-id/0c05701c223b0f32b6f064efae191b9c",
//   "!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%250A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20!"
// );

// console.log(url);
// open(url);
