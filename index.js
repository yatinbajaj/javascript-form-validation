/**
 * document.readyState === "complete" || document.readyState === "interactive"
 * https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
 */
$(document).ready(function () {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const userEmail = document.getElementById("user-email");
  const userPassword = document.getElementById("user-password");
  const Form = document.querySelector("form");

  Form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(userEmail.value);
    console.log(userPassword.value);

    // if (firstName.value.trim() === "")
    //   handelError(firstName, "First Name cannot be Empty");
    // else handelSuccess(firstName);

    // if (lastName.value.trim() === "")
    //   handelError(lastName, "Last Name cannot be Empty");
    // else handelSuccess(lastName);

    // if (userEmail.value.trim() === "")
    //   handelError(userEmail, "Email cannot be Empty");
    // else if (!validateEmail(userEmail))
    //   handelError(userEmail, "Look like this is not a email");
    // else handelSuccess(userEmail);

    // if (userPassword.value.trim() === "")
    //   handelError(userPassword, "Password cannot be Empty");
    // else handelSuccess(userPassword);

    const isFirstNameValid = checkUsername(firstName);
    const isLastNameValid = checkUsername(lastName);
    const isEmailValid = checkEmail();
    const isPasswordValid = passwordCheck();

    const isFormValid = isFirstNameValid && isFirstNameValid && isPasswordValid && isEmailValid;
    
    // submit data to the server if the form is valid
    if (isFormValid) {
      
    }
  });

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const handelSuccess = (input, msg = "") => {
    const formControl = input.parentElement;
    if (msg !== "") {
      const small = formControl.querySelector("small");
      small.innerText = msg;
    } else {
      formControl.className = "form-control success";
    }
  };

  const handelError = (input, errMsg) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = errMsg;
  };

  const validEmail = (input) => {
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(String(input.value).toLowerCase());
  };

  const passwordCheck = () => {
    var strongRegex = new RegExp(
      "^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
      "g"
    );
    var mediumRegex = new RegExp(
      "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
      "g"
    );
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");

    if (userPassword.value.length == 0) {
      handelError(userPassword, "Password cannot be Empty");
      return false;
    } else if (false == enoughRegex.test(userPassword.value)) {
      handelError(userPassword, "More Characters");
    } else if (strongRegex.test(userPassword.value)) {
      handelSuccess(userPassword, "Strong Password");
      return true;
    } else if (mediumRegex.test(userPassword.value)) {
      handelError(userPassword, "Medium Password");
      return false;
    } else {
      handelError(userPassword, "Weak Password");
      return false;
    }
  };

  
const checkEmail = () => {
  let valid = false;
  const emailEntered = userEmail.value.trim();
  if (!isRequired(emailEntered)) {
    handelError(userEmail, "Email cannot be blank.");
  } else if (!validEmail(userEmail)) {
    handelError(userEmail, "Email is not valid.");
  } else {
    handelSuccess(userEmail);
    valid = true;
  }
  return valid;
};

  const checkUsername = (input) => {
    let valid = false;
    const min = 3;
    const max = 25;
    const username = input.value.trim();
    console.log(username);

    if (!isRequired(username)) {
      handelError(input, "Username cannot be blank.");
    } else if (!isBetween(username.length, min, max)) {
      handelError(input, `Username must be between ${min} and ${max} characters.`);
    } else {
      handelSuccess(input);
      valid = true;
    }
    return valid;
  };

});
