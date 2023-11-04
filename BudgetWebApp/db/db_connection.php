<?php
session_start();

//Paramentri database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "budget";

// Connessione database
$db = new mysqli($servername, $username, $password, $dbname);