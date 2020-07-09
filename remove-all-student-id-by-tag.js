require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.api.delete_resources_by_tag("student-id")
.then(result=>{
  console.log(result)
})
.catch(error=>{console.log(error)})

// cloudinary.api.resources_by_tag("student-id", {max_results:5})
// .then(result=>{
//   console.log(result.resources.map(item=>{return item.public_id}))

// })
// .catch(error=>{console.log(error)})