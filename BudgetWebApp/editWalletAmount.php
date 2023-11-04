<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$id = $_POST["form2_id"];
$amount = $_POST['form2_amount'];

UpdateWalletAmountById($db, $id, $amount);