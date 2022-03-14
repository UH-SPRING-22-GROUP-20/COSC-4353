let quotes = [{'galRequested': 10, 'Address': '123 Main St, Anytown, CA 12345','DoD':'17-8-2001','pricePerGallon':10000, 'totalAmount': 100000},{'galRequested': 20, 'Address': '123 Main St, Anytown, CA 12345','DoD':'20-8-2001','pricePerGallon':2000, 'totalAmount': 40000}];
async function fillTable() {
const t = document.getElementById("history-table");
quotes.forEach(item => {
    let row = t.insertRow();
    let gal = row.insertCell(0);
    let address = row.insertCell(1);
    let date = row.insertCell(2);
    let price = row.insertCell(3);
    let total = row.insertCell(4);
    gal.innerHTML = item.galRequested;
    address.innerHTML = item.Address;
    date.innerHTML = item.DoD;
    price.innerHTML = item.pricePerGallon;
    total.innerHTML = item.totalAmount;
})
}

async function displayTable(){
    console.log("table");
    fillTable();
}
displayTable();