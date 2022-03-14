function profileEdit() {
    document.getElementById("edit-profile").style.display = "block";
}

function UpdateValues(){
    console.log(document.getElementById("edited-stae").value);
    document.getElementById("name").innerHTML = document.getElementById("edited-name").value;
    document.getElementById("addr1").innerHTML = document.getElementById("edited-address1").value;
    document.getElementById("addr2").innerHTML = document.getElementById("edited-address2").value;
    document.getElementById("city").innerHTML = document.getElementById("edited-city").value;
    document.getElementById("zip").innerHTML = document.getElementById("edited-zip").value;
    document.getElementById("state").innerHTML = document.getElementById("edited-state").value;
    cancelEdit();
    
}

function cancelEdit() {
    document.getElementById("edit-profile").style.display = "none";
}