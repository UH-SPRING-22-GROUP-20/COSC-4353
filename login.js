async function validate_login() {
    let x = document.getElementById("signin-user").value;
    let y = document.getElementById("signin-pass").value;

    if(isNaN(x.length) || x.length < 1 || x.length > 10)
        alert("Username not valid");
    else if(isNaN(y.length) || y.length < 1 || y.length > 10)
        alert("Password not valid");
    else
        location.href = 'contents/dashboard.html';
}

async function validate_reg() {
    let x = document.getElementById("signup-user").value;
    let y = document.getElementById("signup-pass").value;
    let z = document.getElementById("signup-repeat").value;

    if(isNaN(x.length) || x.length < 1 || x.length > 10)
        alert("Username not valid");
    else if(isNaN(y.length) || y.length < 1 || y.length > 10)
        alert("Password not valid");
    else if(y.localeCompare(z))
        alert("Passwords are not the same");
    else
        location.href = 'contents/dashboard.html';
}

async function logout(){
    location.href = '../index.html';
}