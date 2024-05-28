

let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("reg-email");
let passwordInput = document.getElementById("reg-password");
let repPasswordInput = document.getElementById("reg-rep-password");
let currentTab = '';
function openTab(tabName) {
  currentTab = tabName;
  const tabcontents = document.getElementsByClassName('form');

  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].classList.remove('active');
  }

  const tabToActivate = document.getElementById(tabName);
  tabToActivate.classList.add('active');

  if(tabName === "register") {
    emailInput = document.getElementById("reg-email");
    passwordInput = document.getElementById("reg-password");
  }
  else {
    emailInput = document.getElementById("log-email");
    passwordInput = document.getElementById("log-password");
  }
}


function toggleLoader() {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hidden')
}

function validateEmail(value) {
  if (!value) {
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');

    document.getElementById(`error-${emailInput.id}`).innerText = 'Required';
    return false;
  }

  else if (!/^([\w\-_+]+(?:\.[\w\-_+]+)*)@((?:[a-z0-9\-]+\.)*[a-z0-9][a-z0-9\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value)) {
    emailInput.classList.remove('valid');
    emailInput.classList.add('invalid');
      
    document.getElementById(`error-${emailInput.id}`).innerText =  'Wrong email format';
    return false;
  }

  else {
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    document.getElementById(`error-${emailInput.id}`).innerText =  "";
    return true;
  }
}

function validateUsername(value) {
  if (!value) {
    usernameInput.classList.remove('valid');
    usernameInput.classList.add('invalid');
  
    document.getElementById(`error-${usernameInput.id}`).innerText = 'Required';
    return false;
  }

  else if (!/^[a-zа-яiъї]+$/i.test(value)) {
    usernameInput.classList.remove('valid');
    usernameInput.classList.add('invalid');
  
    document.getElementById(`error-${usernameInput.id}`).innerText = 'Should contain only letters latin/cyrillic';
    return false;
  }

  else {
    usernameInput.classList.remove('invalid');
    usernameInput.classList.add('valid');
    document.getElementById(`error-${usernameInput.id}`).innerText = "";
    return true;
  }
}

function validatePassword(value) {
  if (!value) {
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');

    document.getElementById(`error-${passwordInput.id}`).innerText = 'Required';
    return false;
  }

  else if (value.length < 8) {
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');

    document.getElementById(`error-${passwordInput.id}`).innerText = 'Should contain at least 8 characters';
    return false;
  }

  else if (!/\d/.test(value)) {
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');

    document.getElementById(`error-${passwordInput.id}`).innerText = 'Should contain at least one digit';
    return false;
  }

  else if (!/[^\da-z]/i.test(value)) {
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');

    document.getElementById(`error-${passwordInput.id}`).innerText = 'Should contain at least one special character';
    return false;
  }

  else if (!/[A-Z]/.test(value)) {
    passwordInput.classList.remove('valid');
    passwordInput.classList.add('invalid');

    document.getElementById(`error-${passwordInput.id}`).innerText = 'Should contain at least one uppercase letter';
    return false;
  }

  else {
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    document.getElementById(`error-${passwordInput.id}`).innerText = "";
    return true;
  }
}

function validateConfirmPassword(value) {
  if (!value) {
    repPasswordInput.classList.remove('valid');
    repPasswordInput.classList.add('invalid');
  
    document.getElementById(`error-${repPasswordInput.id}`).innerText = 'Required';
    return false;
  }

  else if(value !== passwordInput.value) {
    repPasswordInput.classList.remove('valid');
    repPasswordInput.classList.add('invalid');

    document.getElementById(`error-${repPasswordInput.id}`).innerText = 'passwords mismatch';
    return false;
  } 

  else {
    repPasswordInput.classList.remove('invalid');
    repPasswordInput.classList.add('valid');
    document.getElementById(`error-${repPasswordInput.id}`).innerText = '';
    return true;
  }
}


document.getElementById('reg-submit').disabled = true;
document.getElementById('log-submit').disabled = true;

function checkValidity(event) {
  isValid = true;
  if(document.activeElement === usernameInput && !validateUsername(usernameInput.value)) isValid = false;
  if(document.activeElement === emailInput && !validateEmail(emailInput.value)) isValid = false;
  if(document.activeElement === passwordInput && !validatePassword(passwordInput.value)) isValid = false;
  if(document.activeElement === repPasswordInput && !validateConfirmPassword(repPasswordInput.value)) isValid = false;

  if(currentTab === 'register') {
    if(usernameInput.value === ''
    || emailInput.value === ''
    || passwordInput.value === ''
    || repPasswordInput.value === '') {
      isValid = false;
    }
  }
  else {
    if(emailInput.value === ''
    || passwordInput.value === '') {
      isValid = false;
    }
  }
  

  const formNode = event.target.form;
  formNode.querySelector('button').disabled = !isValid;
  return isValid;
}


function onSuccess(message) {
  console.log(message)
}


function onError(error) {
  console.log(error.message)
}


function serializeForm(formNode) {
  console.log(formNode)
  return new FormData(formNode)
}

async function sendData(data) {

  return new Promise((resolve, reject) => {
    let isSuccess = Math.floor(Math.random() * 2);
    setTimeout(() => {
      if(isSuccess) {
        resolve({status: 200, message: 'Your application has been successfully sent!'})
      }
      else {
        reject({ status: 404, message: "error!"});
      }
    })
  })
}

async function handleFormSubmit(event) {
  
  event.preventDefault();

  const data = serializeForm(event.target);

  toggleLoader()
  

  await sendData(data).then((response) => {console.log(response);})
  .catch((error) => {console.log(error);});

  setTimeout(toggleLoader, 1500);

  window.location.href = "indexR.html";
}


const RegisterForm = document.getElementById('register');
const LoginForm = document.getElementById('login');


RegisterForm.addEventListener('submit', handleFormSubmit)
RegisterForm.addEventListener('input', checkValidity)

LoginForm.addEventListener('submit', handleFormSubmit)
LoginForm.addEventListener('input', checkValidity)

openTab("register");