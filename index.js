import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});


// Configura un gestore per le richieste HTTP POST all'endpoint "/" dell'applicazione web
app.post("/", async (req, res) => {
  try {
    // Stampa sulla console i dati ricevuti dalla richiesta POST
    console.log(req.body);

      // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."


    // Estrai il valore della chiave "type" dalla richiesta POST
    const type = req.body.type;

    // Estrai il valore della chiave "participants" dalla richiesta POST
    const participants = req.body.participants;

    // Effettua una richiesta GET a un'API esterna usando Axios, includendo "type" e "participants" come parametri nella URL
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );

    // Estrai i dati dalla risposta della richiesta GET
    const result = response.data;

    // Stampa sulla console i dati ottenuti dalla richiesta API
    console.log(result);

    // Rendi la pagina "index.ejs" utilizzando un motore di visualizzazione (presumibilmente EJS) e passa un'attività casuale come dati da visualizzare
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    // In caso di errore durante la richiesta o se non ci sono attività corrispondenti ai criteri, gestisci l'errore
    console.error("Failed to make request:", error.message);

    // Rendi la pagina "index.ejs" e passa un messaggio di errore da visualizzare
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


/*
 Axios è una popolare libreria JavaScript utilizzata per effettuare richieste HTTP da un'applicazione web a un server o a un'API esterna. 
 È una libreria molto utilizzata nel contesto dello sviluppo front-end e back-end. Ecco una spiegazione più dettagliata su Axios:

Richieste HTTP:

Axios semplifica l'invio di richieste HTTP, sia che si tratti di richieste GET per ottenere dati, POST per inviare dati o altre operazioni HTTP come PUT e DELETE.
Le richieste HTTP sono fondamentali quando si deve interagire con un server o recuperare dati da un'API esterna.

Promise-Based:

Axios utilizza le Promises, un concetto asincrono in JavaScript, per gestire le richieste HTTP. 
Questo significa che puoi utilizzare async/await o il metodo .then() per gestire le risposte e gli errori in modo asincrono.
Le Promises rendono più semplice gestire il flusso di controllo quando si aspetta una risposta da una richiesta HTTP.

Facilità d'uso:

Axios offre una sintassi semplice e intuitiva per effettuare richieste HTTP. Per esempio, per effettuare una richiesta GET, è sufficiente chiamare axios.get(URL).

Intercettori:

Axios consente di configurare intercettori per richieste e risposte. 
Gli intercettori permettono di eseguire del codice prima o dopo l'invio di una richiesta o prima o dopo la gestione di una risposta. 
Questo è utile per l'aggiunta di token di autorizzazione, la gestione degli errori globali e altro ancora.

Gestione degli errori:

Axios semplifica la gestione degli errori nelle richieste HTTP. 
Puoi facilmente catturare errori e definire come gestirli, ad esempio mostrando un messaggio di errore all'utente o registrando gli errori per il debug.

Ampia adozione:

Axios è ampiamente utilizzato nella comunità di sviluppatori JavaScript ed è supportato da una comunità attiva e dalla documentazione completa.

Compatibilità del browser e Node.js:

Axios può essere utilizzato sia lato client (navigatore) che lato server (Node.js). Questa versatilità lo rende una scelta popolare per lo sviluppo full-stack.
In sintesi, Axios è una libreria JavaScript potente e flessibile per effettuare richieste HTTP, 
ed è spesso la scelta preferita per gestire comunicazioni di rete in applicazioni web. 
È una libreria affidabile e ben documentata che semplifica l'interazione tra il tuo codice JavaScript e i server o le API esterne.
*/


/*
try:

try è una parte di una struttura di gestione degli errori in JavaScript chiamata "try-catch".
All'interno di un blocco try { ... }, puoi inserire il codice che potrebbe generare errori o eccezioni.
Se durante l'esecuzione del codice nel blocco try si verifica un errore o un'eccezione, il flusso del programma passa immediatamente al blocco catch.
Il blocco try permette di "provare" (try) di eseguire una serie di istruzioni e gestire eventuali errori che possono verificarsi in modo controllato.

await:

await è utilizzato all'interno di una funzione dichiarata come async e viene utilizzato per "attendere" (await) che una promessa (Promise) venga risolta.
Le promesse sono utilizzate per rappresentare operazioni asincrone in JavaScript, come le richieste HTTP o il caricamento di dati da database.
Quando si usa await su una promessa, il programma attende finché la promessa non viene risolta o respinta.
Questo è utile quando si eseguono operazioni asincrone in modo sincrono, in modo che il programma possa continuare solo quando l'operazione asincrona è completata.

catch:

catch è un altro blocco all'interno della struttura "try-catch".
Se si verifica un errore o un'eccezione all'interno del blocco try, il controllo viene passato al blocco catch.
Il blocco catch contiene il codice che gestisce l'errore. È qui che puoi definire cosa fare quando si verifica un errore, 
come registrare un messaggio di errore o gestire l'eccezione in modo appropriato.
Utilizzare catch è fondamentale per gestire errori in modo sicuro e garantire che il programma non si blocchi in caso di problemi durante l'esecuzione del codice nel blocco try.
*/

/*
In questo caso, il blocco try viene utilizzato per eseguire la richiesta HTTP asincrona con Axios. 
Se la richiesta ha successo, il codice dopo l'await viene eseguito. 
Se si verifica un errore durante la richiesta (ad esempio, se l'API non è raggiungibile), 
il controllo passa al blocco catch, dove viene gestito l'errore e un messaggio di errore viene mostrato o registrato. 
L'uso di await è importante perché consente di attendere che la richiesta HTTP si completi prima di procedere, evitando problemi legati alla concorrenza.
*/