// @flow

export interface DataSource {

    /*
        returns the id of the document if it sucessfuly stored
     */
    put(key: string, value: Object): Promise<string>,

    /*
        returns the object with the given key
        throws error if object does not exist
     */
    get(key: string): Promise<Object>
}
