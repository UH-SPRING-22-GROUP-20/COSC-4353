// -------------------- function for tabs got from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tabs ----------------
async function openTab(evt, Tab) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Tab).style.display = "block";
    evt.currentTarget.className += " active";
}
// ------------------ function for tabs ends ---------------
// ------------------ function to validate login and register ---------------

/*
async function validate_login(valid) {
    if (valid){
        location.href = 'contents/dashboard.html';
    }
}

async function validate_reg(valid) {
    if (valid) {
        location.href = 'contents/dashboard.html';
        alert("Thank you for making an account with us, \ngo ahead and update your profile");
    }
}

async function logout(){
    location.href = '../index.html';
}
*/

// ------------------ function to validate login ends ---------------

// ------------------ fuel quote form functions ------------------
async function getAddress() {
    var x = "some random address for now";
    document.getElementById("currAddress").innerHTML = '<input type="text" id="address" name="address" value=\'' + x +'\' readonly>';
}

async function calcTotal() {
    let x = 100000;
    document.getElementById("totalDue").innerHTML = '<input type="number" id="total" name="total" value=' + x + ' min='+x+' max='+x+'><br>';
}
// ------------------ fuel quote form functions end ------------------