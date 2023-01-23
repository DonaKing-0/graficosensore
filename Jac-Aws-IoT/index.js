import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";

import express from "express";
import api from './mongo/index.js'
import connetti from './mongo/connessione.js'
import cors from "cors";

const app = express();

connetti();

// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();


app.use(
    cors({
        origin: ['http://localhost:3000']
    })
)
app.use(api);

app.use(express.json());

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});
/*
import mongooseInit from './services/db/mongoose.js'
await mongooseInit();

import cors from "cors";

app.use(
    cors({
        origin: ['http://localhost:3000', 'https://donaking-0.github.io/pwfront/', 'https://donaking-0.github.io']
    })
)

app.use(express.json());

app.use(api)

app.listen(process.env.PORT || 3000, function () {
    console.log(
        "The server has started on port "+ process.env.PORT +". Head to localhost:"+ process.env.PORT +" in the browser and see what's there!"
    );
});
*/