const PARAMS = new URLSearchParams(window.location.search);
const CLOUD_NAME = PARAMS.has("cn") ? PARAMS.get("cn") : "pictures77";
const COURSE_TITLE = PARAMS.has("title")? PARAMS.get("title"): "Cloudinary Training";
const COURSE_DATE = PARAMS.has("date")? PARAMS.get("date"):"2020"
const PRESET = "student-id";
const BADGE_TRANSFORM = "t_v-badge";
const NOT_ALLOW_DUPS = true;

const cl = new cloudinary.Cloudinary({ cloud_name: CLOUD_NAME, secure: true });

const studentList = [];
const IMG_HEIGHT = "440";
const IMG_WIDTH = "300";

function setCourseTitleAndDate(){
  document.querySelector("#course-title").innerHTML = COURSE_TITLE;
  document.querySelector("#course-date").innerHTML = COURSE_DATE;
}

function toast(message, type) {
  console.log("toast:", message, type);
  const fromColor = type === "warn" ? "pink" : "#00b09b";
  const toColor = type === "warn" ? "red" : "#96c93d";
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    backgroundColor: `linear-gradient(to right, ${fromColor}, ${toColor})`,
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();
}

function doubleEncode(str) {
  // console.log("double encode");
  if (!str) return "";
  let arr = str.split("");
  let newArr = [];

  for (let c of arr) {
    newArr.push(encodeURIComponent(encodeURIComponent(c)));
  }
  let newStr = newArr.join("");
  return newStr;
}

//student should have context data: fname, lname, title, org, bgcolor
//add URL and fullname
function createStudentData(student) {
  console.log("createStudentData");
  // console.log("createStudentData:", JSON.stringify(student, null, 2));
  let contextMap = student && student.context ? student.context.custom : null;
  if (!contextMap) {
    //a student with no context - fix by creating dummy context - this should never happen
    //TODO look for a better way 
    console.log("No context:", JSON.stringify(student, null, 2));
    // create dummy context values
    contextMap = {
      public_id: "",
      fname: "",
      lname: "",
      bgcolor: "", 
      title: "",
      org: "",
    };
  }
  // all data that will appear in overlay must be double encoded
  let studentData = { ...contextMap };
  studentData.publicId = student.public_id || "";
  studentData.fullname = `${doubleEncode(studentData.fname || "")}%20${doubleEncode(studentData.lname || "")}`;
  studentData.org = doubleEncode(studentData.org || "");
  studentData.title = doubleEncode(studentData.title || "");
  let bgcolor = (studentData.bgcolor && studentData.bgcolor.length > 0) ? studentData.bgcolor : "231F20" ; //default is darkest
  studentData.bgcolor = `!rgb:${bgcolor}!`; // does this need to be url encoded?
  studentData.color = `!rgb:${getContrastL(bgcolor)}!`;//TODO calculate color
  let filler = Array(45).fill("%20").join("");
  //create overlay text
  const overlayText = `!${studentData.fullname}%250A${studentData.title}%250A${studentData.org}%250A${filler}!`;
  //create badge URL
  studentData.URL = cl.url(
    studentData.publicId,
    cl
      .transformation()
      .variables([["$data", `${overlayText}`],["$color", `${studentData.color}`],["$bgcolor",`${studentData.bgcolor}`]])
      .transformation("v-badge-color")
  );
  return studentData;
}

//create HTML
function createGalleryEntry(student) {
  console.log("createGalleryEntry:");
  // console.log("createGalleryEntry:", JSON.stringify(student, null, 2));
  const article = document.createElement("article");
  article.classList.add("student-listing");
  //image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("student-image");
  //image anchor
  const imageAnchor = document.createElement("a");
  imageContainer.setAttribute("href", "#");
  //image
  const image = document.createElement("img");
  image.setAttribute("width", IMG_WIDTH);
  image.setAttribute("height", IMG_HEIGHT);
  image.setAttribute("src", student.URL);
  image.setAttribute("alt", student.fullname);
  //glue it together
  imageAnchor.appendChild(image);
  imageContainer.appendChild(imageAnchor);
  article.appendChild(imageContainer);
  return article;
}

// add a list of students to the galler
// set prepend to true to insert list at the beginning:
// useful for right after upload
function populateGallery(list, prepend) {
  console.log("populateGallery");
  for (const student of list) {
    const encodedStudentData = createStudentData(student);
    if (encodedStudentData) {
      const article = createGalleryEntry(encodedStudentData);
      //append to gallery
      if (prepend){
        document.querySelector("#gallery").prepend(article);
      } else {
        document.querySelector("#gallery").appendChild(article);
      }
    }
  }
}
function renderStudents() {
  console.log("renderStudents");
  const dataURL = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/v${Date.now()}/student-id.json`;
  fetch(dataURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //populate global studentList with image and meta-data
      studentList.push(...data.resources);
      populateGallery(studentList);
    })
    .catch((error) => {
      console.log("error fetching list", error);
    });
}


// clear form after successful image upload
function clearForm() {
  console.log("clearForm");
  document.querySelector("#fname").value = "";
  document.querySelector("#lname").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#org").value = "";
  document.querySelectorAll("input[name=bgcolor]").forEach(radio=>{
    radio.checked = false;
  })

}

// convert hex to dec
function hexdec(hex) {
  return hex.toLowerCase().split('').reduce( (result, ch) =>
      result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
}

// luminosity algorithm
function getContrastL(hexcolor){
	let r = hexdec(hexcolor.substr(0,2));
	let g = hexdec(hexcolor.substr(2,2));
	let b = hexdec(hexcolor.substr(4,2));
	let l = (r*0.2126)+(g*0.7152)+(b*0.0722);
	return (l >= 128)? "000000": "ffffff";
}

// gather form data into context map
function createContextMap() {
  console.log("createContextMap");
  const fname = document.querySelector("#fname").value;
  const lname = document.querySelector("#lname").value;
  const title = document.querySelector("#title").value;
  const org = document.querySelector("#org").value;
  let bgcolor = "231F20"; //default is dark color
  if (document.querySelector("input[name=bgcolor]:checked")){
    bgcolor = document.querySelector("input[name=bgcolor]:checked").value;
  } 
  // if (document.getElementById('r1').checked) {
  //   rate_value = document.getElementById('r1').value;
  // }
  // const bgcolor = document.querySelector("input[type=radio]:checked").value;
  // const bgcolor = idocument.querySelector("input[name=rate]:checked").value;
  // console.log(fname, lname, title, org, bgcolor);
  // add context
  const contextMap = {};
  contextMap.fname = fname;
  contextMap.lname = lname;
  contextMap.title = title;
  contextMap.org = org;
  contextMap.bgcolor = bgcolor;
  contextMap.color = getContrastL(bgcolor); 
  contextMap.uploadDate = new Date().toISOString();
  return contextMap;
}

//check if a student with same info has already signed up
function dupFound(contextMap, studentList) {
  console.log("dupFound");
  var result = studentList.filter((student) => {
    if (!student.context) return false;
    return (
      student.context.custom.fname === contextMap.fname &&
      student.context.custom.lname === contextMap.lname &&
      student.context.custom.title === contextMap.title &&
      student.context.custom.org === contextMap.org
    );
  });
  return result.length > 0;
}

//boolean true enables the button and boolean false disable
function setUploadButton(enable) {
  console.log("setUploadButton",enable);
  if (enable) {
    document.querySelector("#upload").removeAttribute("disabled");
  } else {
    document.querySelector("#upload").setAttribute("disabled", "disabled");
  }
}

//require all input data before image upload enabled
function inputChanged() {
  //turn on upload button after text entries
  //choosing background not required
  console.log("inputChanged");
  if (
    document.querySelector("#fname").value.length > 0 &&
    document.querySelector("#lname").value.length > 0 &&
    document.querySelector("#title").value.length > 0 &&
    document.querySelector("#org").value.length > 0 
  ) {
    setUploadButton(true);
  }
}

//use a delete token to delete an image
function deleteNoFaceImage(result) {
  console.log("deleteNoFaceImage");
  const token = { token: result.info.delete_token };
  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(
        "success deleting image without face",
        JSON.stringify(data, null, 2)
      );
      //the upload button should be turned back on
      setUploadButton(true);
      toast("Image uploaded must have a face.", "warn");
    })
    .catch((error) => {
      console.log("error deleting face", error);
    });
}


document.addEventListener("DOMContentLoaded", (event) => {
  //disable upload button
  setCourseTitleAndDate();
  setUploadButton(false);
  renderStudents();
  document.querySelector('.close-msg').addEventListener('click',event=>{
    document.querySelector('#banner').classList.remove('show');
    document.querySelector('#banner').classList.add('hide');
  })
  document.querySelector('#delete-btn').addEventListener('click',event=>{
    let fname = document.querySelector('#delete-fname').value || 'first name not provided'
    let lname = document.querySelector('#delete-lname').value || 'last name not provided'
    let emailBody = `Delete ${fname} ${lname} from Student ID application for cloud ${CLOUD_NAME}`
    window.open(`mailto:support@cloudinary.com?subject=Remove me from Student ID Website&body=${emailBody}`)
  })

  //listen for form inputs
  document.querySelectorAll('input:not([type="radio"]').forEach((el) => {
    el.addEventListener("input", inputChanged, false);
  });

  //after the list is ready add submit listener
  document.querySelector("#upload").addEventListener(
    "click",
    function () {
      console.log("UW click handler");
      const contextMap = createContextMap();
      console.log("contextMap", contextMap);
      //verify form values collected - check that there is no existing student with same name and company
      if (NOT_ALLOW_DUPS && dupFound(contextMap, studentList)) {
        toast("Duplicates not allowed", "warn");
        return;
      } else {
        var myWidget = cloudinary.createUploadWidget(
          {
            cloudName: CLOUD_NAME,
            upload_preset: PRESET,
            sources: ["local", "url", "camera","facebook"],
            context: contextMap,
            clientAllowedFormats: ["png", "gif", "jpeg"],
            return_delete_token: 1,
          },
          (error, result) => {
            //wait for success
            if (!error) {
              console.log("UW non error event", result.event);
              if (result.event === "success") {
                console.log("success:", JSON.stringify(result, null, 2));
                //disable the upload button
                setUploadButton(false);

                //test that a face was uploaded
                if (
                  result.info &&
                  result.info.faces &&
                  result.info.faces.length > 0
                ) {
                  toast("Successful face upload.", "info");
                  clearForm();
                  //add image to gallery
                  // XXXXXXXXXXdocument.querySelector("#gallery").innerHTML = "";

                  //TODO TRY add to list add to DOM - otherwise need to call load
                  // add student to list
                  studentList.push(result.info);
                  console.log(
                    "new student added:",
                    JSON.stringify(studentList)
                  );

                // put new student in an array and send to populate
                  populateGallery([result.info],true);
                } else {
                  console.log("Successful upload but no face!");
                  deleteNoFaceImage(result);
                }
              }
              if (result.event === "done") {
                console.log("done event:", result.info);
              }
            } else {
              console.log("UW error event", error);
              launch_toast(`Upload error: ${error}`, "warn");
            }
          }
        );

        myWidget.open();
      }
    },
    false
  );
});
