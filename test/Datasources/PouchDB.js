// @flow

import assert from 'assert';
import type {DataSource} from "../../Datasources/DataSource";
import PouchDBDataSource from "../../Datasources/PouchDB";

describe('PouchDB datasource CRUD tests', function () {
    describe('put/get', function () {

        const dataSource: DataSource = new PouchDBDataSource('integration-test', {adapter: 'memory'});

        before(function () {
        });

        it('should return the value stored in the database', function (done: function) {
            const obj = {key: 'A', value: 'B'};
            dataSource.put('test_key', obj)
                .then((key: string): Promise<Object> => dataSource.get(key))
                .then((get: Object): void => assert.deepEqual(obj, get))
                .then((): void => done())
                .catch((error: Error): void => console.log(error))
            ;
        });
    });
});
