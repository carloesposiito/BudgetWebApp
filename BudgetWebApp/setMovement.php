<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$id = $_POST["form1_id"];
$description = $_POST['form1_description'];
$value = $_POST["form1_value"];
$date = $_POST["form1_date"];
$type = $_POST["form1_type"];
$wallet = $_POST["form1_wallet"];
$action = $_POST["form1_action"];

if ($action == "insert") {
    InsertMovement($db, $value, $description, $date, $type, $wallet);    
} else {
    UpdateMovementById($db, $id, $value, $description, $date, $type, $wallet);
}