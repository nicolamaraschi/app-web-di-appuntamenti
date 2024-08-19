# Booking System

## Descrizione del Progetto

Il progetto **Booking System** è un'applicazione web che consente agli utenti di effettuare e gestire prenotazioni. Utilizza Node.js per il backend e Angular per il frontend. Il sistema include autenticazione utente, creazione e visualizzazione delle prenotazioni, e una semplice interfaccia utente per interagire con il sistema.

## Struttura del Progetto

Il progetto è composto da due parti principali:
- **Backend**: Fornisce le API per gestire l'autenticazione e le prenotazioni.
- **Frontend**: Interfaccia utente basata su Angular per interagire con il backend.

## Tecnologie Utilizzate

- **Backend**:
  - **Node.js**: Ambiente di runtime per JavaScript.
  - **Express**: Framework web per Node.js.
  - **MongoDB**: Database NoSQL per memorizzare le prenotazioni e gli utenti.
  - **JWT (JSON Web Token)**: Per l'autenticazione e la protezione delle API.

- **Frontend**:
  - **Angular**: Framework per costruire l'interfaccia utente.
  - **Bootstrap**: Per lo styling e il design responsivo.

## Requisiti

### Backend

- Node.js e npm
- MongoDB (in esecuzione)

### Frontend

- Node.js e npm

## Installazione

### Backend

1. **Clona il Repository**

   ```bash
   git clone <URL_DEL_TUO_REPOSITORY>
   cd <NOME_DEL_TUO_PROGETTO>

## installa le Dipendenze

- cd backend
- npm install
- 
## Configura le Variabili d'Ambiente

- PORT=5001
- MONGO_URI=mongodb://localhost:27017/booking-system
- ACCESS_TOKEN_SECRET=<YOUR_SECRET_KEY>

## Avvia il Server

- node server.js

## Frontend
## installa dipendente 
- cd booking-system-frontend
- npm install

## Avvia il Server di Sviluppo
- ng serve

## API del Backend

### Autenticazione

- **Registrazione**
  - **Metodo**: `POST`
  - **Endpoint**: `/api/register`
  - **Body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "string"  // Opzionale, ad esempio "user" o "admin"
    }
    ```
  - **Risposta di Successo**:
    ```json
    {
      "message": "User created"
    }
    ```
  - **Codici di Stato**:
    - `201 Created`: Se la registrazione è avvenuta con successo.
    - `500 Internal Server Error`: Se c'è stato un errore durante la creazione dell'utente.

- **Login**
  - **Metodo**: `POST`
  - **Endpoint**: `/api/login`
  - **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Risposta di Successo**:
    ```json
    {
      "accessToken": "string"
    }
    ```
  - **Codici di Stato**:
    - `200 OK`: Se il login è avvenuto con successo e viene restituito un token di accesso.
    - `400 Bad Request`: Se le credenziali sono errate.
    - `500 Internal Server Error`: Se c'è stato un errore durante il processo di login.

- **Visualizza il Profilo dell'Utente**
  - **Metodo**: `GET`
  - **Endpoint**: `/api/me`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Risposta di Successo**:
    ```json
    {
      "_id": "string",
      "username": "string",
      "email": "string"
    }
    ```
  - **Codici di Stato**:
    - `200 OK`: Se l'utente è stato trovato e restituito.
    - `404 Not Found`: Se l'utente non esiste.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero del profilo.

### Prenotazioni

- **Effettua una Prenotazione**
  - **Metodo**: `POST`
  - **Endpoint**: `/api/reservations`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Body**:
    ```json
    {
      "userId": "string",
      "date": "2024-08-14T00:00:00.000Z",
      "timeSlot": "15:30"
    }
    ```
  - **Risposta di Successo**:
    ```json
    {
      "_id": "string",
      "userId": "string",
      "date": "2024-08-14T00:00:00.000Z",
      "timeSlot": "15:30",
      "status": "pending"
    }
    ```
  - **Codici di Stato**:
    - `201 Created`: Se la prenotazione è stata creata con successo.
    - `500 Internal Server Error`: Se c'è stato un errore durante la creazione della prenotazione.

- **Visualizza le Prenotazioni dell'Utente**
  - **Metodo**: `GET`
  - **Endpoint**: `/api/reservations/my-reservations`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Risposta di Successo**:
    ```json
    [
      {
        "_id": "string",
        "userId": {
          "_id": "string",
          "username": "string",
          "email": "string"
        },
        "date": "2024-08-14T00:00:00.000Z",
        "timeSlot": "15:30",
        "status": "pending"
      }
    ]
    ```
  - **Codici di Stato**:
    - `200 OK`: Se le prenotazioni sono state trovate e restituite.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero delle prenotazioni.

- **Visualizza Tutte le Prenotazioni** (Solo per Admin)
  - **Metodo**: `GET`
  - **Endpoint**: `/api/reservations`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Risposta di Successo**:
    ```json
    [
      {
        "_id": "string",
        "userId": {
          "_id": "string",
          "username": "string",
          "email": "string"
        },
        "date": "2024-08-14T00:00:00.000Z",
        "timeSlot": "15:30",
        "status": "pending"
      }
    ]
    ```
  - **Codici di Stato**:
    - `200 OK`: Se le prenotazioni sono state trovate e restituite.
    - `403 Forbidden`: Se l'utente non è un admin.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero delle prenotazioni.

- **Visualizza Prenotazioni per Utente** (Solo per Admin)
  - **Metodo**: `GET`
  - **Endpoint**: `/api/reservations/user/:userId`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Parametri**:
    - `userId`: ID dell'utente
  - **Risposta di Successo**:
    ```json
    [
      {
        "_id": "string",
        "userId": {
          "_id": "string",
          "username": "string",
          "email": "string"
        },
        "date": "2024-08-14T00:00:00.000Z",
        "timeSlot": "15:30",
        "status": "pending"
      }
    ]
    ```
  - **Codici di Stato**:
    - `200 OK`: Se le prenotazioni sono state trovate e restituite.
    - `403 Forbidden`: Se l'utente non è un admin.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero delle prenotazioni.

- **Visualizza Prenotazioni per Data** (Solo per Admin)
  - **Metodo**: `GET`
  - **Endpoint**: `/api/reservations/date/:date`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Parametri**:
    - `date`: Data per cui visualizzare le prenotazioni (formato `YYYY-MM-DD`)
  - **Risposta di Successo**:
    ```json
    [
      {
        "_id": "string",
        "userId": {
          "_id": "string",
          "username": "string",
          "email": "string"
        },
        "date": "2024-08-14T00:00:00.000Z",
        "timeSlot": "15:30",
        "status": "pending"
      }
    ]
    ```
  - **Codici di Stato**:
    - `200 OK`: Se le prenotazioni per la data specificata sono state trovate e restituite.
    - `403 Forbidden`: Se l'utente non è un admin.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero delle prenotazioni.

- **Visualizza Prenotazioni per Intervallo di Date** (Solo per Admin)
  - **Metodo**: `GET`
  - **Endpoint**: `/api/reservations/date-range`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Query Parameters**:
    - `startDate`: Data di inizio (formato `YYYY-MM-DD`)
    - `endDate`: Data di fine (formato `YYYY-MM-DD`)
  - **Risposta di Successo**:
    ```json
    [
      {
        "_id": "string",
        "userId": {
          "_id": "string",
          "username": "string",
          "email": "string"
        },
        "date": "2024-08-14T00:00:00.000Z",
        "timeSlot": "15:30",
        "status": "pending"
      }
    ]
    ```
  - **Codici di Stato**:
    - `200 OK`: Se le prenotazioni per l'intervallo di date specificato sono state trovate e restituite.
    - `403 Forbidden`: Se l'utente non è un admin.
    - `500 Internal Server Error`: Se c'è stato un errore durante il recupero delle prenotazioni.

- **Aggiorna lo Stato di una Prenotazione** (Solo per Admin)
  - **Metodo**: `PUT`
  - **Endpoint**: `/api/reservations/:id/status`
  - **Headers**:
    - `Authorization: Bearer <token>`
  - **Parametri**:
    - `id`: ID della prenotazione da aggiornare
  - **Body**:
    ```json
    {
      "status": "accepted" // o "rejected"
    }
    ```
  - **Risposta di Successo**:
    ```json
    {
      "_id": "string",
      "userId": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "date": "2024-08-14T00:00:00.000Z",
      "timeSlot": "15:30",
      "status": "accepted"
    }
    ```
  - **Codici di Stato**:
    - `200 OK`: Se lo stato della prenotazione è stato aggiornato con successo.
    - `400 Bad Request`: Se lo stato fornito non è valido.
    - `404 Not Found`: Se la prenotazione con l'ID specificato non è stata trovata.
    - `403 Forbidden`: Se l'utente non è un admin.
    - `500 Internal Server Error`: Se c'è stato un errore durante l'aggiornamento della prenotazione.

