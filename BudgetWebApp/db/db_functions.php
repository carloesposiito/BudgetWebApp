<?php
// Crea nuovo wallet
function CreateWallet($db, $name)
{
    $sql = "INSERT INTO `wallet` (`id`, `name`, `amount`, `visibility`) VALUES (NULL, '$name', 0, 1)";
    $db->query($sql);
}

// Restituisce un array contenente tutti i wallet
function GetWallets($db)
{
    $wallets = array();
    $sql =  "SELECT * FROM wallet;";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        while ($record = $result->fetch_assoc()) {
            $wallet = new Wallet($record["id"], $record["name"], $record["amount"], $record["visibility"]);
            array_push($wallets, $wallet);
        }
    }
    return $wallets;
}

// La funzione restituisce i movimenti di un determinato wallet
function GetWalletMovements($db, $wallet)
{
    $movements = array();
    $sql = "SELECT * FROM movement WHERE wallet = $wallet";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        while ($record = $result->fetch_assoc()) {
            $movement = new Movement($record["id"], $record["value"], $record["description"], $record["date"], $record["type"], $record["wallet"]);
            // Aggiungo l'oggetto nella lista
            array_push($movements, $movement);
        }
    }
    // Ritorno la lista
    return $movements;
}

// La funzione restituisce tutti i movimenti
function GetMovements($db)
{
    $movements = array();
    $sql = "SELECT * FROM movement";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        while ($record = $result->fetch_assoc()) {
            $movement = new Movement($record["id"], $record["value"], $record["description"], $record["date"], $record["type"], $record["wallet"]);
            array_push($movements, $movement);
        }
    }
    return $movements;
}

function InsertMovement($db, $value, $description, $date, $type, $wallet)
{
    $sql = "INSERT INTO `movement` (`id`, `value`, `description`, `date`, `type`, `wallet`) VALUES (NULL, '$value', '$description', '$date', '$type', '$wallet');";
    $db->query($sql);
}

function ConfirmMovementById($db, $id)
{
    $movement = GetMovementById($db, $id);
    $value = $movement[1];
    $type = $movement[4];
    $wallet = $movement[5];

    $walletAmount = GetWalletAmountById($db, $wallet);

    if ($type == 0) {
        $walletAmount += $value;
    } elseif ($type == 1) {
        $walletAmount -= $value;
    }

    // Aggiorno il saldo del wallet
    UpdateWalletAmountById($db, $wallet, $walletAmount);

    // Cancello il movimento dalla lista
    DeleteMovementById($db, $id);
}

function DeleteMovementById($db, $id)
{
    $sql = "DELETE FROM movement WHERE `id` = $id";
    $db->query($sql);
}

function DeleteWalletById($db, $id)
{
    $sql = "DELETE FROM wallet WHERE `id` = $id";
    $db->query($sql);
}

function UpdateWalletAmount($db, $newAmount, $walletId)
{
    $sql = "UPDATE `wallet` SET `amount` = $newAmount WHERE id = $walletId;";
    $db->query($sql);
}

function GetWalletAmountById($db, $walletId)
{
    $sql = "SELECT amount FROM `wallet` WHERE id = $walletId;";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        while ($record = $result->fetch_assoc()) {
            return $record["amount"];
        }
    }
}

function GetMovementById($db, $movementId)
{
    $movementInfo = array();
    $sql1 = "SELECT * FROM `movement` WHERE id = $movementId;";
    $result = $db->query($sql1);
    if ($result->num_rows > 0) {
        while ($record = $result->fetch_assoc()) {
            array_push($movementInfo, $movementId, $record["value"], $record["description"], $record["date"], $record["type"], $record["wallet"]);
        }
    }
    return $movementInfo;
}

function SetWalletVisibility($db, $walletId, $visibility)
{
    $sql = "UPDATE `wallet` SET visibility = $visibility WHERE id = $walletId;";
    $db->query($sql);
}

function UpdateMovementById($db, $id, $value, $description, $date, $type, $wallet)
{
    $sql = "UPDATE `movement` SET value = $value, description = '$description', date = '$date', type = $type, wallet = $wallet WHERE id = $id;";
    $db->query($sql);
}

function UpdateWalletAmountById($db, $id, $amount)
{
    $sql = "UPDATE `wallet` SET amount = $amount WHERE id = $id;";
    $db->query($sql);
}
