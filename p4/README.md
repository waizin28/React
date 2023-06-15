[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10194761&assignment_repo_type=AssignmentRepo)
# CS571-S23 HW04: Badger Book (React!)

Welcome to Badger Book -- React Edition! In HW1, we collected JSON data about you; in HW3 we implemented Badger Book using vanilla HTML, CSS, and JS; and in this assignment, you will create Badger Book as a React App. Just like in HW3, you'll fetch data from the API, present it on a webpage, and provide search functionality to speed up the introduction process! Because this covers the fundamentals of React, *there is no design aspect to this assignment*.

**Note:** Steps 1-4 can be completed following Tuesday's lecture; steps 5 and 6 can be completed following Thursday's lecture.

**Also Note:** If there were issues with your HW1 submission or if you had joined the class late, you may not see yourself in the data -- sorry!

## Setup

The starter code provided to you was generated using [create-react-app](https://www.npmjs.com/package/create-react-app). Furthermore, [bootstrap](https://www.npmjs.com/package/bootstrap) and [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) have already been installed. **You should *not* re-run the create-react-app command**. Instead, in this directory, simply run...

```bash
npm install
npm start
```

Then, in a browser, open `localhost:3000`. You should *not* open index.html in a browser; React works differently than traditional web programming! When you save your changes, they appear in the browser automatically. I recommend using [Visual Studio Code](https://code.visualstudio.com/) to do your development work.

The two components you will be working on are located in the `components` folder. I have created the skeleton for `Student.jsx` and `Classroom.jsx`. The classroom component should fetch all of the data from the API and display them as student components.

## Tasks

### 1. Fetch Student Data

In `Classroom.jsx`, create a React state variable that will hold the array of student data. Then, fetch the student data from `https://cs571.org/s23/hw4/api/students` *on page load* and save it to this React state variable. Note three things...
 1. You'll likely need to use the React hooks `useEffect` and `useState`.
 2. This is the same data from the HW3 API *except* an additional unique "id" has been added to each student.
 3. Like HW3, this request requires a `X-CS571-ID` header specifying your unique Badger ID.
 
After fetching this data, `console.log` the contents of this array.

**Hint:** Are you getting a [429 HTTP code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) from the server? Check your code for an infinite loop! You will be automatically locked out of the API for up to 1 minute.

![Step 1: Fetching Data](figures/step1.png)

### 2. Displaying Student Names

With this data, display the students' names on the webpage. Because this is React, we should **not** use `document` or `innerHTML`; we should use JSX components!

In `Classroom.jsx`, you will want to display a `Student` component for each student, passing down props of the student's data. You must display the student's data using the `Student` component.

Furthermore, make sure to specify a unique `key` for each student; you should use the student's ID as the key. You should make sure that you are **not** getting an error saying `each child in a list should have a unique "key" prop.` in your browser's console log, you will lose points!

![Step 2: Displaying Student Names](figures/step2.png)

### 3. Formatting Student Data

This "works"... but there is a lot of wasted space on large devices. In `Classroom.jsx`, use [React-Bootstrap's grid system](https://react-bootstrap.github.io/layout/grid/) so that...
 - 1 column of students is shown on `xs` devices
 - 2 columns of students is shown on `sm` devices
 - 3 columns of students is shown on `md` devices
 - 4 columns of students is shown on `lg` devices
 - 6 columns of students is shown on `xl` devices

You can re-size your browser window to test this.

![Step 3: Formatting Student Data](figures/step3.png)


### 4. Add Other Student Data

There's more to a student than just their name! Modify `Student.jsx` to display all of the other information about a student (except for their ID). How you choose to do this is up to you, but you must display...
 - first & last name
 - major
 - number of credits
 - if they are from WI
 - their interests **in ul list format** and **their number of interests**


Furthermore, make sure to specify a unique `key` for each interest; you can assume that each interest is unique per person. You should make sure that you are **not** getting an error saying `each child in a list should have a unique "key" prop.` in your browser's console log, you will lose points!

![Step 4: Add Other Student Data](figures/step4.png)

### 5. Search Functionality

With all of the data being displayed, we need to provide the user with a way to narrow down their results. Implement search functionality so that a user may search by name, major, and interests with results appearing **as they type**  -- *there is no search button*. Only students that match the search criteria should be displayed.

**Hint**: You will likely need to create a React state variable for each of the search terms to control their input in `Classroom.jsx`. Then, you can use `useEffect` to trigger a function whenever these search terms change. You may also choose to introduce another React state variable such as `shownStudents` in addition to what you did in Step 1.

How you implement this in React is up to you, but the following are requirements of the search functionality (the same as HW3)...
 - search terms are case-insensitive, e.g. searching "cat" should yield results with "cAT"
 - search terms are substrings, e.g. "olo" should yield results with "color"
 - search terms are AND expressions, e.g. searching for a name of "Cole", a major of "Computer Science", and an interest of "coffee" should only yield Coles studying computer science who are interested in coffee
 - searching "john", "smith", or "john smith" should all yield the person named "John Smith"
 - if any interest matches the search term, it should be considered a result, e.g. searching "bow" should yield people with interests in "bow hunting", "bowling", and/or "bowing".
 - if a search term is left blank it should not affect the results of the search
 - leading and trailing spaces of search terms should be ignored

I would *encourage you* but not *require you* to use declarative over imperative programming.

**Note:** There are no Alan Turings, John Smiths or Cole Nelsons in the data, these are just examples.

![Step 5: Search Functionality](figures/step5.png)

### 6. Reset Search

In `Classroom.jsx`, add an `onClick` handler so that when the user clicks the "Reset Search" button, the search term fields should be cleared and all students should be displayed.

![Step 6: Reset Search](figures/step6.png)

### Done! 🥳

Congrats! Add, commit, and push your files to GitHub Classroom and paste your commit hash in the Canvas assignment.

There is no design aspect to this assignment.
