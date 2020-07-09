var studentList = [];
document.addEventListener("DOMContentLoaded", (event) => {
  fetch("https://res.cloudinary.com/pictures77/image/list/student-id.json")
    .then((response) => response.json())
    .then((data) => {
      studentList = data.resources;

      //after the list is ready add submit listener
      document.querySelector("#upload").addEventListener(
        "click",
        function () {
          const fname = document.querySelector("#fname").value;
          const lname = document.querySelector("#lname").value;
          const title = document.querySelector("#title").value;
          const org = document.querySelector("#org").value;
          console.log(fname, lname, title, org);
          // add context
          const contextMap = {};
          contextMap.fname = fname;
          contextMap.lname = lname;
          contextMap.title = title;
          contextMap.org = org;
          //verify form values collected

          var myWidget = cloudinary.createUploadWidget(
            {
              cloudName: "pictures77",
              upload_preset: "student-id",
              sources: ["local", "url", "camera", "facebook"],
              context: contextMap,
              clientAllowedFormats: ["png", "gif", "jpeg"],
              return_delete_token: 1,
            },
            (error, result) => {
              if (!error) {
                console.log("event", result.event);
                // if (result.event === 'upload-added') {
                if (result.event === "success") {
                  console.log(result);

                  //delete if the upload doesn't contain a face
                  if (!result.info.faces || result.info.faces.length === 0) {
                    // alert("no face!")
                    const token = {"token":result.info.delete_token}
                    fetch(
                      "https://api.cloudinary.com/v1_1/pictures77/delete_by_token",
                      {
                        method: "post",
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(token),
                      }
                    )
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => {
                        console.log("error deleting image without face", data);
                        // alert("face deleted!")
                      })
                      .catch((error) => {
                        console.log("error", error);
                      });
                  }

                  // https://api.cloudinary.com/v1_1/demo/delete_by_token -X POST --data 'token=delete_token
                }
              } else {
                console.log(error);
              }
            }
          );

          myWidget.open();
        },
        false
      );
    })
    .catch((error) => {
      console.log(error);
    });

  