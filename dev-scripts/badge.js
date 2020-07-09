require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const open = require("open");
const lodash = require("lodash");

// let publicId1 = "unsplash3";
let name1 = "Boris Kelly";
let title1 = "Dev Ops";
let org1 = "Blue Orign";
let data1 = encodeURI(
  `${lodash.pad(name1, 20)}%0A${lodash.pad(title1, 20)}%0A${lodash.pad(
    org1,
    20
  )}`
);
let publicId1 = "student-id/71e077dcf88c5e9772cd09a072b8ae39"
let publicId2 = "student-id/b3d5d1066394dbcc8532f3e33b402af7";
let name2 = "Susan Burnell";
let title2 = "Astrophysicist";
let org2 = "Cambridge University";
// let data2 = encodeURI(`${lodash.pad(name2,20)}%0A${lodash.pad(title2,20)}%0A${lodash.pad(org2,20)}`)
let data2 = encodeURI(`${name2}%0A${title2}%0A${org2}`);

console.log(data2);

const url = cloudinary.url(`${publicId2}`, {

      overlay: {
        font_family: "arial",
        font_size: 150,
        text: "Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%0A~~~~~~~~~~~~~~~~~~~~",
        // text: "Susan%20Burnell%250AAstrophysicist%250ACambridge%20University%0A                    ",

        // text: "Boris%20Kelly%250ADev Ops%250ABlue%20Origin%0A~~~~~~~~~~~~~~~~~~~~",
        // text:
          // "Boris%20Kelly%250ADev Ops%250ABlue%20Origin%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20",

        // text: "$title",

        font_style: "bold",
        text_align: "center",
      },
      gravity: "south",
      color: "#DB8226",
      background: "#0E2F5A",
      width: 300,
      y: "-140",

    
});
open(url);
/*

susan
https://res.cloudinary.com/pictures77/image/upload/$title_!Susan%20Burnell%250AAstrophysicist%250ACambridge%20University!/b_rgb:0E2F5A,co_rgb:DB8226,g_south,u_text:times_100_bold_center:$(title),w_345,y_-200/unsplash2

boris

https://res.cloudinary.com/pictures77/image/upload/$title_!Boris Kelly%0ADev Ops%0ACambridge University!/b_rgb:0E2F5A,co_rgb:DB8226,g_south,u_text:times_100_bold_center:$(title),w_345,y_-200/unsplash2


*/


// https://res.cloudinary.com/pictures77/image/upload/$title_!Boris%20Kelly%0ADev%20Ops%20%0AOrign%0A~~~~~~~~~~~~~~~~~~~~!/b_rgb:0E2F5A,co_rgb:DB8226,g_south,l_text:arial_100_center:%20$(title),w_345,y_-175/v1/student-id/71e077dcf88c5e9772cd09a072b8ae39