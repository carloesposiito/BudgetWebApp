<?php
#region requirements
require_once "db/db_connection.php";
require_once "db/db_functions.php";
require_once "model/movement.php";
require_once "model/wallet.php";
#endregion

// Array di movimenti
$movements = GetMovements($db);

// Array di wallet
$wallets = GetWallets($db);

// Array dei precedenti array
$data = array(
    "movements" => $movements,
    "wallets" => $wallets
);

header('Content-Type: application/json');

// Passaggio dati da PHP a JS
echo json_encode($data, JSON_PRETTY_PRINT);