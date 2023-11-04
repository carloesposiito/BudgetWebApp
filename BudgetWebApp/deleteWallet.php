<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$walletId = $_POST["form4_walletId"];

DeleteWalletById($db, $walletId);