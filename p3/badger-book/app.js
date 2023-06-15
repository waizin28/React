/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */

fetch("https://cs571.org/s23/hw3/api/students", {
  headers: {
    "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
  },
})
  .then((student) => student.json())
  .then((studentData) => {
    let searchButton = document.getElementById("search-btn");
    let studentHTML = document.getElementById("students");
    let resetButton = document.getElementById("reset-search-btn");

    resetButton.addEventListener("click", () => {
      document.getElementById("search-name").value = "";
      document.getElementById("search-major").value = "";
      document.getElementById("search-interest").value = "";
      studentHTML.innerHTML = buildStudentsHtml(studentData);
    });

    searchButton.addEventListener("click", () => {
      console.log("Inside listenier");
      let tempData = searchFunction(studentData);

      //   studentData.forEach((student) => console.log(student.name.first));
      studentHTML.innerHTML = buildStudentsHtml(tempData);
    });
    studentHTML.innerHTML += buildStudentsHtml(studentData);
  });

function searchFunction(studentData) {
  let searchName = document.getElementById("search-name").value;
  let searchMajor = document.getElementById("search-major").value;
  let searchInterest = document.getElementById("search-interest").value;

  if (searchName === null && searchMajor === null && searchInterest === null) {
    return;
  }

  searchName = searchName
    .toLowerCase()
    .split(" ")
    .filter(function (token) {
      return token.trim() !== "";
    });

  searchMajor = searchMajor
    .toLowerCase()
    .split(" ")
    .filter(function (token) {
      return token.trim() !== "";
    });

  searchInterest = searchInterest
    .toLowerCase()
    .split(" ")
    .filter(function (token) {
      return token.trim() !== "";
    });

  return studentData.reduce((prevStudent, currStudent) => {
    if (
      currStudent.name.first.toLowerCase().includes(searchName) ||
      currStudent.name.last.toLowerCase().includes(searchName)
    ) {
      if (currStudent.major.toLowerCase().includes(searchMajor)) {
        let lowerInt = currStudent.interests.map((interest) =>
          interest.toLowerCase().includes(searchInterest)
        );
        if (lowerInt.includes(true)) {
          //everything inputted
          prevStudent.push(currStudent);
        } else if (searchInterest === "") {
          //only major and name inputted
          prevStudent.push(currStudent);
        }
      } else if (searchMajor === "" && lowerInt.includes(true)) {
        //interest and name inputted
        prevStudent.push(currStudent);
      } else if (searchMajor === "" && searchInterest === "") {
        // only name inputted
        prevStudent.push(currStudent);
      }
    } else if (
      currStudent.major.toLowerCase().includes(searchMajor) &&
      searchName === ""
    ) {
      let lowerInt = currStudent.interests.map((interest) =>
        interest.toLowerCase().includes(searchInterest)
      );
      if (lowerInt.includes(true)) {
        // with major and interest
        prevStudent.push(currStudent);
      } else if (interest == "") {
        // students with major inputted
        prevStudent.push(currStudent);
      }
    } else if (
      currStudent.interests
        .map((interest) => interest.toLowerCase().includes(searchInterest))
        .includes(true) &&
      searchName === "" &&
      searchMajor === ""
    ) {
      // same interest, noting else inputted
      prevStudent.push(currStudent);
    }

    return prevStudent;
  }, []);
}

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 *
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
  return studs.map((stud) => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 *
 * @param {*} stud
 * @returns
 */
function buildStudentHtml(stud) {
  let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
  html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
  html += `<p><h5><strong>${stud.major}</strong></h5></p>`;
  html += `<p>${stud.name.first} is taking ${stud.numCredits} and is `;

  if (stud.fromWisconsin === true) html += `from Wisconsin.</p>`;
  else html += `not from Wisconsin.</p>`;

  html +=
    `<p>They have ` + stud.interests.length + " l<ul>";
  stud.interests.forEach((interest) => (html += `<li>${interest}</li>`));
  html += `</ul></p>`;
  html += `</div>`;
  return html;
}

function major(stud) {
  let html = "<div>";
  html += `<p><em>${stud.major}</em></p>`;
  html += "</div>";
}
