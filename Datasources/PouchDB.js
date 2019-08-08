// @flow
import PouchDB from 'PouchDB';
import type {DataSource} from "./Datasource";

PouchDB.plugin(require('pouchdb-adapter-memory'));

export default class PouchDBDataSource implements DataSource {

    db: PouchDB;

    constructor(dbName: string, options: { adapter: ?string }) {
        this.db = new PouchDB(dbName, options);
    }

    put(key: string, value: Object): Promise<Object> {
        return this.db.put({_id: key, ...value})
            .then((res: Object): void => res.id);
    }

    get(key: string): Promise<Object> {
        return this.db.get(key)
            .then((res: Object): Object => {
                delete res._rev;
                delete res._id;
                return res;
            });
    }
}
