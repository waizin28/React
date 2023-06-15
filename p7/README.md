[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10585681&assignment_repo_type=AssignmentRepo)
# CS571-S23 HW07: Intro to React Native

Welcome to React Native! For this brief assignment, you will complete a mobile application that will introduce you to the basics of React Native. Your app will allow the user to type and add up numbers. **Make sure you allow enough time for your video to upload as a part of your submission**.

**There is no design aspect to this assignment.**

## Intro to React Native

The starter code provided to you was generated using [create-expo-app](https://www.npmjs.com/package/create-expo-app). **You should *not* re-run the create-expo-app command**. Instead, in this directory, simply run...

```bash
npm install
npm start
```

To test your app, you have a few options. If you have a smart device, I would recommend using the expo app for [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US). You can scan the QR code using your phone, or you can launch commands via the terminal. Otherwise, you can use an emulator (such as [AVD](https://developer.android.com/studio/run/emulator)). **Do not use the web browser to test your code**; you must test on Android or iOS!

Note that we are writing code in JavaScript for React Native; if you begin writing code in Objective-C, Swift, Java, or Kotlin you are likely doing something *very* wrong!

## Steps

### 1. Display Text
Create a `Text` (notice: not `p`) element that says "Your total is x" where x is the running total of numbers added. This number should start at 0 when the app is first opened.

### 2. Get Input
Create a `TextInput` with some default `placeholder` value. This input should only accept `numeric` input. You can choose for this to be controlled or uncontrolled. 

### 3. Add Button
Create a button that will add the number from the text input onto the running total. After the number is added, the text input should be reset.

### 4. Reset Button
Create another button that will reset; resetting sets the running total back to 0 *and* clears the text input. Alert the user.

### 5. Film a Demo
In future homeworks, this step will be implied. Record a demo of your app.
 - For iOS devices, [see here](https://support.apple.com/en-us/HT207935).
 - For Android devices, [see here](https://support.google.com/android/answer/9075928?hl=en).
 - For emulators, consider using Zoom or some other software.
 - Using another phone to record the app on your phone is not ideal, but it is acceptable.

I would recommend setting your phone to "Do Not Disturb" during the recording. An example demo video has been provided for you on the Canvas assignment.

You must show the following tasks...

 - Add 3 numbers together.
   - At least one of these numbers must be negative.
   - At least one of these numbers must contain a decimal.
 - Use the reset button after the numbers have been added.

You may assume that the user will only give numeric input. In this and all future assignments, make sure that you allow enough time for your video to upload as a part of your submission. **The demo video should be a part of the Canvas submission**, not this GitHub repository -- see Canvas for details.

### Done! 🥳
Congrats! Add, commit, and push your files to GitHub Classroom and paste your commit hash in the Canvas assignment. Include your demo video.
