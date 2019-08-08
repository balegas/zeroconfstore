// @flow

// import bonjour from 'bonjour';
import express from 'express';
import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
} from 'express';
import bodyParser from 'body-parser';
import PouchDBDataSource from "./Datasources/PouchDB";

const port = 8080;

const app = express();

const jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/*+json' }));
const db = new PouchDBDataSource('server', {adapter: 'memory'});

app.post('/store/:objectId', jsonParser, function (req: $Request, res: $Response) {
    let {body, params: {objectId}} = req;
    console.log("[POST]", body, objectId);
    db.put(objectId, body)
        .then((): void => res.status(201).send())
        .catch((error: Error): void => console.log("Error:", error));
});

app.listen(port, (): void => console.log(`Example app listening on port ${port}!`));
