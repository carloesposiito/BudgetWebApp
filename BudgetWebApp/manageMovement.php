<?php
require_once "db/db_connection.php";
require_once "db/db_functions.php";

$id = $_POST['id'];
$action = $_POST["action"];

if ($action == "confirm") {
    ConfirmMovementById($db, $id);
} elseif ($action == "delete") {
    DeleteMovementById($db, $id);
}