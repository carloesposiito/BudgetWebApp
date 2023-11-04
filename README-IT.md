# Budget

Budget è un semplice gestore di bilancio scritto in JavaScript. Permette di creare conti e tracciare entrate ed uscite.


Si tratta di una web app composta da una navbar contenente i conti e da una sezione dove essi vengono visualizzati.


Si connette ad un database MySQL per ottenere i dati. Un esempio di database può essere trovato nella cartella "db" e le impostazioni di connessione possono essere modificate nel file "db_connection.php".


# Conti


I conti possono essere creati, resi visibili ed eliminati tramite i controlli nella navbar.


La sezione in cui vengono visualizzati i conti mostra il loro saldo iniziale e tutti i movimenti relativi al conto. Il saldo iniziale può essere modificato se necessario ed è presente un pulsante per inserire nuovi movimenti.


![](https://github.com/carloesposiito/Budget/blob/main/GIFs/Creazione%20conto%2C%20modifica%20saldo%20(Resized).gif)

![](https://github.com/carloesposiito/Budget/blob/main/GIFs/Mostra%2C%20nascondi%2C%20elimina%20conto%20(Resized).gif)


# Movimenti


Un movimento ha una descrizione, un importo, una data ed un tipo, che può essere in entrata, in uscita o bozza.


Il totale delle entrate e delle uscite viene calcolato alla fine della tabella ed aggiunto al saldo iniziale. I movimenti di tipo bozza vengono ignorati durante il calcolo.


Attraverso il pulsante presente su ogni movimento è possibile confermarlo sul saldo iniziale, annullarlo o modificarlo.


![](https://github.com/carloesposiito/Budget/blob/main/GIFs/Inserimento%20spesa%20(Resized).gif)

![](https://github.com/carloesposiito/Budget/blob/main/GIFs/Conferma%2C%20elimina%2C%20modifica%20movimento%20(Resized).gif)
