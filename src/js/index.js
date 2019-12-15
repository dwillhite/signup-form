//**** form validation ****//

const inputs = document.querySelectorAll('input');
const headline = document.getElementById('mainHeadline');
const subBtn = document.querySelector('.submit-btn');
const thanks = document.getElementById('thankYou');
const errorMessage = document.getElementById('errorMessage');
const emailConfirm = document.getElementById('emailconfirmationMessage');
const passConfirm = document.getElementById('passconfirmationMessage');

// object containing regEX patterns
const regexObj = {
  fname: /^[a-z]{2,20}$/i,
  lname: /^[a-z]{2,20}$/i,
  phone: /^\d{3}(?:[-]?)\d{3}(?:[-]?)\d{4}$/,
  email: /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/
}

//validation function and append either 'valid' or 'invalid' class to node
function validate(field, regex) {
  if(regex.test(field.value)) {
    field.className = 'valid';
  }else{
    field.className = 'invalid';
  }
}

// validate on keyup of each input and show error message if necessary
inputs.forEach((input) => { 
  input.addEventListener('keyup', (e) => {
   validate(e.target, regexObj[e.target.attributes.name.value])
   if(input.className == 'invalid') {
    errorMessage.style.opacity = "1";  
   }else if(input.className == 'valid') {
    errorMessage.style.opacity = "0";  
    }
  });
});

// the call for when the signup button is clicked
function checkSub(e) {
  e.preventDefault();
    let firstName = document.getElementById('fname');
    let lastName = document.getElementById('lname');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
    if(firstName.className == "" || firstName.className == "invalid") {
      console.log("first invalid or empty")
      return false;
    }
    if(lastName.className == "" || lastName.className =="invalid") {
      console.log("last invalid or empty")
      return false;
    }
    if(phone.className == "" || phone.className =="invalid") {
      console.log("phone invalid or empty")
      return false;
    }
    if(email.className == "" || email.className =="invalid") {
      console.log("email invalid or empty")
      return false;
    }
    if(password.className == "" || password.className == "invalid") {
      console.log("pass invalid or empty")
      return false;
    }
    else {
      // set field values in session storage
      sessionStorage.setItem('firstName', firstName.value);
      sessionStorage.setItem('lastName', lastName.value);
      sessionStorage.setItem('phone', phone.value);
      sessionStorage.setItem('email', email.value);
      sessionStorage.setItem('password', password.value);

      document.querySelector(".signup-form").className = "hide"
      inputs.forEach((input) => {    
        input.value = "";
      });

    let pass = sessionStorage.password.slice(); // grab the password from session storage
    let end = [...pass].slice(-1); // get and store the last character
    let start = [...pass].slice(0, 1);  //get the and store the first character  
    let passCut = pass.substring(1).slice(0,-1); // get the middle of the password
    let passMask = []; 


    // make the middle of password an arrray and replace each character with an *.
    [...passCut].forEach((letter) => { 
      passMask.push(letter.replace(/^.*?$/g, '*'))    
    })
    
    let passString = passMask.join(''); //put middle back together again
    let newMaskPass = start + "" + passString + "" + end; //put start and end back onto password

    // display confirmation messages
    headline.innerText = `Thank you for signing up!`;
    thanks.innerText = `Welcome to our website ${sessionStorage.firstName} ${sessionStorage.lastName}!`;
    emailConfirm.innerText = `We will send you a confirmation notice at the email address of ${sessionStorage.email}.`;
    passConfirm.innerText = `You can access the website using the password of ${newMaskPass}.`;
  
  }

}
// event listener for signup button
subBtn.addEventListener('click', checkSub);



