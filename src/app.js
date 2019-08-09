// @flow

import express from 'express';
import type {
    $Request,
    $Response,
//    NextFunction,
//    Middleware,
} from 'express';
import bodyParser from 'body-parser';
import PouchDBDataSource from './Datasources/PouchDB';
import Bonjour from 'bonjour';


const port = 8080;
const app = express();
const bonjour = Bonjour();
const jsonParser = bodyParser.json();
const db = new PouchDBDataSource('server', {adapter: 'memory'});

app.use(bodyParser.json({type: 'application/*+json'}));
app.post('/store/:objectId', jsonParser, function (req: $Request, res: $Response) {
    let {body, params: {objectId}} = req;
    console.log("[POST]", body, objectId);
    db.put(objectId, body)
        .then((): void => res
            .status(201)
            .send())
        .catch((error: Error): void => console.log("Error:", error));
});
app.get('/store/foo', function (req: $Request, res: $Response) {
    res
        .send({foo: 'bar'});
});

app.listen(port, (): void => console.log(`Example app listening on port ${port}!`));

bonjour.publish({name: 'Test Server', type: 'http', port});

