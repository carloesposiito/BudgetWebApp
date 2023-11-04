<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$walletId = $_POST["walletId"];
$walletVisibility = $_POST['walletVisibility'];

SetWalletVisibility($db, $walletId, $walletVisibility);