<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$walletName = $_POST["form3_walletName"];

CreateWallet($db, $walletName);