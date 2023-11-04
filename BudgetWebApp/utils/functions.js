// Crea lista di wallet per la navbar
function createWalletList(element, wallets) {

    element.innerHTML = "";

    let ul = document.createElement("ul");
    ul.id = "navbar_dropdown";
    ul.className = "navbar-nav me-auto mt-0 mb-2 mb-lg-0";

    // Separatore
    let hr1 = document.createElement("hr");
    hr1.className = "fw-lighter pt-2 mt-1 mb-2";
    hr1.innerHTML = "I tuoi conti:";
    ul.append(hr1);

    for (let i = 0; i < wallets.length; i++) {

        let li = document.createElement("li");
        li.className = "nav-item my-1 row justify-content-around ms-0";

        let div = document.createElement("div");
        div.className = "form-check form-switch col";

        let label = document.createElement("label");
        label.className = "form-check-label px-1";
        label.setAttribute("for", "switch" + wallets[i].id);
        label.innerHTML = wallets[i].name;

        let input = document.createElement("input");
        input.id = "switch" + wallets[i].id;
        input.value = wallets[i].id;
        input.className = "form-check-input";
        input.type = "checkbox";
        input.role = "switch";
        input.setAttribute("onclick", "showHide(this.value)");

        if (wallets[i].visibility == false) {
            input.checked = false;
        } else {
            input.checked = true;
        }

        let div2 = document.createElement("div");
        div2.className = "col-auto p-0";

        let btn = document.createElement("button");
        btn.className = "btn btn-sm btn-transparent btnbtn rounded-pill py-0 px-2 my-0 mx-1";
        btn.value = wallets[i].id;
        btn.setAttribute("onclick", "showModal4(this.value)");

        let icon = document.createElement("i");
        icon.className = "bi bi-trash3-fill text-danger";
        btn.append(icon);

        div.append(input);
        div.append(label);
        div2.append(btn);
        li.append(div);
        li.append(div2);
        ul.append(li);
    }

    // Separatore
    let hr2 = document.createElement("hr");
    hr2.className = "fw-lighter pt-2 mt-3 mb-2";
    hr2.innerHTML = "Impostazioni:";
    ul.append(hr2);

    // Nuovo wallet
    let li = document.createElement("li");

    let btn = document.createElement("button");
    btn.className = "btn btnbtn border-0 p-0 m-0";
    btn.setAttribute("onclick", "showModal3()");
    btn.innerHTML = "Crea nuovo conto";

    li.append(btn);
    ul.append(li);

    element.append(ul);
}

// Crea row per ciascun wallet
function createDivs(element, wallets, movements) {

    element.innerHTML = "";

    for (let i = 0; i < wallets.length; i++) {

        let row = document.createElement("div");
        row.id = "rowWallet" + wallets[i].id;
        row.className = "row justify-content-center mb-5 px-2";

        if (wallets[i].visibility == false) {
            row.style.display = "none";
        } else {
            row.style.display = "block";
        }

        let col = document.createElement("div");
        col.id = "colWallet" + wallets[i].id;
        col.className = "col col-sm-10 col-md-8 col-lg-6 mx-auto";

        let content = document.createElement("div");
        content.id = "contentWallet" + wallets[i].id;
        content.className = "p-0 m-0";

        createTable(content, filterMovements(movements, wallets[i].id), wallets[i].id, wallets[i].name, wallets[i].amount);

        //#region Titolo

        let row_buttons = document.createElement("div");
        row_buttons.className = "row justify-content-between p-0 m-0 mb-2 border-bottom";

        let col_titolo = document.createElement("div");
        col_titolo.className = "col-auto";

        let h3 = document.createElement("h3");
        h3.className = "mb-2 p-0 text-center";

        let strong = document.createElement("strong");
        strong.innerHTML = wallets[i].name;
        h3.append(strong);

        col_titolo.append(h3);
        row_buttons.append(col_titolo);

        // Bottone inserisci
        let col_inserisci = document.createElement("div");
        col_inserisci.className = "col-auto";

        let btn_inserisci = document.createElement("button");
        btn_inserisci.className = "btn btn-outline-secondary hov text-center rounded-pill mb-2 py-0 px-2";
        btn_inserisci.value = wallets[i].id;
        btn_inserisci.setAttribute("onclick", "showInsertModal(this.value)");
        btn_inserisci.innerHTML = "Inserisci";

        col_inserisci.append(btn_inserisci);

        row_buttons.append(col_inserisci);

        //#endregion

        col.append(row_buttons);
        col.append(content);
        row.append(col);
        element.append(row);
    }
}

// Creo tabella di movements
// Appendo la tabella ad element
// Restituisco la somma dei movimenti
function createTable(element, movements, walletId, walletName, walletAmount) {

    element.innerHTML = "";
    let total = 0;

    let table = document.createElement("table");
    table.className = "table table-dark";

    //#region Creazione tbody

    let tbody = document.createElement("tbody");

    // Prima riga riepilogo
    let tr = document.createElement("tr");

    let td_1 = document.createElement("td");
    td_1.className = "widIcon";
    tr.append(td_1);

    let td_2 = document.createElement("td");
    td_2.id = "wallet" + walletId + "_amount";
    td_2.className = "widValue";
    td_2.innerHTML = walletAmount;
    tr.append(td_2);

    let td_3 = document.createElement("td");
    td_3.innerHTML = "Saldo iniziale";
    tr.append(td_3);

    let td_4 = document.createElement("td");
    td_4.className = "widDate";
    tr.append(td_4);

    let td_5 = document.createElement("td");
    td_5.className = "widIcon text-end";

    let btn = document.createElement("button");
    btn.id = "btn_AmountWallet" + walletId;
    btn.className = "btn btn-sm btn-transparent rounded-pill py-0 m-0";
    btn.value = walletId + ", " + walletAmount + ", " + walletName;
    btn.setAttribute("onclick", "showModal2(this.value)");

    let icon = document.createElement("i");
    icon.className = "bi bi-pencil-fill";
    btn.append(icon);

    td_5.append(btn);

    tr.append(td_5);

    tbody.append(tr);

    // Per ogni movimento
    for (let i = 0; i < movements.length; i++) {

        let tr = document.createElement("tr");

        let tdType = document.createElement("td");
        tdType.className = "widIcon";

        if (movements[i].type == 0) {
            tdType.innerHTML = "+";
            total += movements[i].value;
        } else if (movements[i].type == 1) {
            tdType.innerHTML = "-";
            total -= movements[i].value;
        } else {
            tdType.innerHTML = "•";
        }

        let tdValue = document.createElement("td");
        tdValue.className = "widValue";
        tdValue.innerHTML = movements[i].value;

        let tdDescription = document.createElement("td");
        tdDescription.innerHTML = movements[i].description;

        let tdDate = document.createElement("td");
        tdDate.className = "widDate";
        tdDate.innerHTML = getDateFormatted(movements[i].date);

        let tdEdit = document.createElement("td");
        tdEdit.className = "widIcon";
        tdEdit.className = "text-end";

        let btnGear = document.createElement("button");
        btnGear.type = "button";
        btnGear.className = "btn btn-sm btn-transparent rounded-pill py-0 m-0";
        btnGear.ariaExpanded = "false";
        btnGear.setAttribute("data-bs-toggle", "dropdown");

        let iconGear = document.createElement("i");
        iconGear.className = "bi bi-gear-fill text-light";
        btnGear.append(iconGear);

        // Lista dropdown
        let uList = document.createElement("ul");
        uList.className = "dropdown-menu dropdown-menu-dark";

        let li1 = document.createElement("li");
        btnConfirm = document.createElement("button");
        btnConfirm.className = "dropdown-item";
        btnConfirm.setAttribute("value", movements[i].id + ", " + movements[i].wallet + ", confirm");
        btnConfirm.setAttribute("onclick", "manageMovement(this.value)");
        btnConfirm.innerHTML = "Conferma movimento";
        li1.append(btnConfirm);

        let hr1 = document.createElement("hr");
        hr1.className = "dropdown-divider";
        let liSep1 = document.createElement("li");
        liSep1.append(hr1);

        let li2 = document.createElement("li");
        btnEdit = document.createElement("button");
        btnEdit.className = "dropdown-item";
        btnEdit.setAttribute("value", movements[i].id + ", " + movements[i].description + ", " + movements[i].value + ", " + movements[i].date + ", " + movements[i].type + ", " + movements[i].wallet + ", edit");
        btnEdit.setAttribute("onclick", "showEditModal(this.value)");
        btnEdit.innerHTML = "Modifica movimento";
        li2.append(btnEdit);

        let hr2 = document.createElement("hr");
        hr2.className = "dropdown-divider";
        let liSep2 = document.createElement("li");
        liSep2.append(hr2);

        let li3 = document.createElement("li");
        btnDelete = document.createElement("button");
        btnDelete.className = "dropdown-item";
        btnDelete.setAttribute("value", movements[i].id + ", " + movements[i].wallet + ", delete");
        btnDelete.setAttribute("onclick", "manageMovement(this.value)");
        btnDelete.innerHTML = "Cancella movimento";
        li3.append(btnDelete);

        uList.append(li1);
        uList.append(liSep1);
        uList.append(li2);
        uList.append(liSep2);
        uList.append(li3);

        tdEdit.append(btnGear);
        tdEdit.append(uList);

        tr.append(tdType);
        tr.append(tdValue);
        tr.append(tdDescription);
        tr.append(tdDate);
        tr.append(tdEdit);

        tbody.appendChild(tr);
    }

    //#endregion

    //#region Creazione tfoot

    let tfoot = document.createElement("tfoot");
    let trFoot = document.createElement("tr");

    let td1 = document.createElement("td");

    let td2 = document.createElement("td");
    td2.id = "wallet" + walletId + "_total";
    td2.innerHTML = (walletAmount + total).toFixed(2);

    let td3 = document.createElement("td");
    td3.innerHTML = "Saldo totale";

    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    trFoot.append(td1);
    trFoot.append(td2);
    trFoot.append(td3);
    trFoot.append(td4);
    trFoot.append(td5);
    tfoot.append(trFoot);

    //#endregion

    table.append(tbody);

    if (movements.length != 0) {
        table.append(tfoot);
    } else {
        td_3.innerHTML = "Saldo totale";
    }

    element.append(table);

    //return total;
}

// Crea o modifica movimento
function setMovement(value) {

    let wallet = value.split(", ")[0];
    let action = value.split(", ")[1];

    let formData = new FormData(form1);
    formData.append("form1_wallet", wallet);
    formData.append("form1_action", action);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "setMovement.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
                updateTable(wallet);

                closeModal(wallet);
            }
        }
    };
    xhr.send(formData);
}

// Conferma o cancella movimento
function manageMovement(value) {

    let id = value.split(", ")[0];
    let wallet = value.split(", ")[1];
    let action = value.split(", ")[2];
    let formData = new FormData();
    formData.append("id", id);
    formData.append("action", action);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "manageMovement.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
                updateTable(wallet);

                closeModal(wallet);
            }
        }
    };
    xhr.send(formData);
}

// Modifica saldo wallet
function editWalletAmount(walletId) {

    var formData = new FormData(form2);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "editWalletAmount.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
                updateTable(walletId);

                closeModal2();
            }
        }
    };
    xhr.send(formData);
}

// Crea nuovo conto
function createWallet() {

    let formData = new FormData(form3);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "newWallet.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
                updatePage();
                //createPage();
                closeModal3();

            }
        }
    };
    xhr.send(formData);
}

// Cancella wallet
function deleteWallet() {

    let formData = new FormData(form4);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "deleteWallet.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
                updatePage();
                //createPage();
                closeModal4();
            }
        }
    };
    xhr.send(formData);
}

// Aggiorna tabella movimenti
function updateTable(walletId) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'ajax.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            info = JSON.parse(xhr.responseText);

            let wallet_Amount;
            let wallet_Name;

            info.wallets.forEach(wallet => {
                if (wallet.id == walletId) {
                    wallet_Amount = wallet.amount;
                    wallet_Name = wallet.name;
                }
            });

            let col_id = "contentWallet" + walletId;
            let col = document.getElementById(col_id);

            //let movementSum = createTable(col, filterMovements(info.movements, walletId), walletId, wallet_Name, wallet_Amount);
            createTable(col, filterMovements(info.movements, walletId), walletId, wallet_Name, wallet_Amount);
        }
    };
    xhr.send();
}

// Aggiorna navbar
function updatePage() {

    document.getElementById("navbar_content").innerHTML = "";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'ajax.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            info = JSON.parse(xhr.responseText);

            wallets = info.wallets;
            movements = info.movements;
        
            createWalletList(navbar_content, wallets);

            createDivs(contents, wallets, movements);
        }
    };
    xhr.send();
}

// Mostra o nasconde i movimenti del wallet
function showHide(walletId) {

    let row = document.getElementById("rowWallet" + walletId);
    let walletVisibility;

    if (row.style.display == "block") {
        row.setAttribute("style", "display: none;");
        walletVisibility = 0;
    } else {
        row.setAttribute("style", "display: block;");
        walletVisibility = 1;
    }

    let formData = new FormData();
    formData.append("walletId", walletId);
    formData.append("walletVisibility", walletVisibility);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "setWallet.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

                // Richiesta completata con successo
            }
        }
    };
    xhr.send(formData);

}

function showRiepilogo() {

    let rowRiepilogo = document.getElementById("rowRiepilogo");

    if (rowRiepilogo.style.display == "block") {
        rowRiepilogo.setAttribute("style", "display: none;");
    } else {
        rowRiepilogo.setAttribute("style", "display: block;");
    }
    closeNavbar();
}

// Mostra il modale per inserire movimento
function showInsertModal(walletId) {
    setInsertModal(walletId);
    showModal1();
}

// Setta il modale per inserire movimento
function setInsertModal(walletId) {

    form1_id.value = "";
    form1_description.value = "";
    form1_value.value = "";
    form1_date.value = getDate();

    modal_title.innerHTML = "Inserisci movimento:";
    form1_confirm.innerHTML = "Inserisci";
    form1_confirm.value = walletId + ", insert";

    form1_cancel.value = walletId;
}

// Setta il modale per la modifica
function showEditModal(value) {

    let id = value.split(", ")[0];
    let description = value.split(", ")[1];
    let valore = value.split(", ")[2];
    let date = value.split(", ")[3];
    let type = value.split(", ")[4];
    let wallet = value.split(", ")[5];

    form1_id.value = id;
    form1_description.value = description;
    form1_value.value = valore;
    form1_date.value = date;
    if (type == 0) {
        form1_radio1.checked = true;
    } else if (type == 1) {
        form1_radio2.checked = true;
    } else {
        form1_radio3.checked = true;
    }

    modal_title.innerHTML = "Modifica movimento:";
    form1_confirm.innerHTML = "Modifica";
    form1_confirm.value = wallet + ", edit";

    form1_cancel.value = wallet;

    showModal1();
}

// Chiude il modale e lo setta per l'inserimento
function closeModal(wallet) {
    closeModal1();
    setInsertModal(wallet);
}

function showModal1() {
    $("#modal1").modal("show");
}

function closeModal1() {
    $("#modal1").modal("hide");
}

function showModal2(value) {

    let id = value.split(", ")[0];
    let amount = value.split(", ")[1];
    let name = value.split(", ")[2];

    modal2_title.innerHTML = name + ":";
    form2_amount.value = amount;
    form2_id.value = id;
    form2_confirm.value = id;

    $("#modal2").modal("show");
}

function showModal3() {
    closeNavbar();
    $("#modal3").modal("show");
}

function showModal4(walletId) {
    closeNavbar();
    form4_walletId.value = walletId;
    $("#modal4").modal("show");
}

function closeModal2() {
    $("#modal2").modal("hide");
}

function closeModal3() {
    $("#modal3").modal("hide");
}

function closeModal4() {
    $("#modal4").modal("hide");
}

function showNavbar() {
    $("#navbar").offcanvas('show');
}

function closeNavbar() {
    $("#navbar").offcanvas('hide');
}

// Filtra i movimenti in base al wallet e li restituisce in un array
function filterMovements(movements, walletId) {
    let filtered = [];
    for (let i = 0; i < movements.length; i++) {
        if (movements[i].wallet == walletId) {
            filtered.push(movements[i]);
        }
    }
    return filtered;
}

// Restituisce data odierna
function getDate() {
    return new Date().toISOString().split('T')[0];
}

// Formatta la data per la tabella
function getDateFormatted(dateToFormat) {
    let month = dateToFormat.split("-")[1];
    let day = dateToFormat.split('-')[2];
    return day + "/" + month;
}
