# Budget

Budget is a simple budget manager written in Javascript. It allows you to create wallets and track income and outgoing.


It's a web app composed of a navbar containing the wallets and a section where they are displayed.


It connects to a MySQL database to get data. An example of database can be found in "db" folder and connection settings can be edited in "db_connection.php" file.


# Wallets


Wallets can be created, made visible and deleted through the controls in the navbar.


The section where wallets are displayed shows their starting balance and all the movements related to that wallet. The starting balance can be modified if necessary and there is a button to insert new movements.


![](https://github.com/carloesposiito/BudgetWebApp/blob/main/Screenshots/Creazione%20conto%2C%20modifica%20saldo%20(Resized).gif)

![](https://github.com/carloesposiito/BudgetWebApp/blob/main/Screenshots/Mostra%2C%20nascondi%2C%20elimina%20conto%20(Resized).gif)


# Movements


A movement has a description, an amount, a date and a type, which can be incoming, outgoing or draft.


The total of income and outgoing is calculated at the end of the table and added to the initial balance. Draft movements are ignored during calculation.


Through the button present on each movement, it is possible to confirm the movement on the starting balance, cancel it or edit it.


![](https://github.com/carloesposiito/BudgetWebApp/blob/main/Screenshots/Inserimento%20spesa%20(Resized).gif)

![](https://github.com/carloesposiito/BudgetWebApp/blob/main/Screenshots/Conferma%2C%20elimina%2C%20modifica%20movimento%20(Resized).gif)


