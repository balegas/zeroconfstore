// @flow
import Bonjour from 'bonjour';
import axios from 'axios';

const bonjour = new Bonjour();

bonjour.find({type: 'http'}, function (service: Object) {
    let {name, addresses, port} = service;
    if (name === 'Test Server') {
        console.log('Found Test Server:', service);
        //TODO: assuming first address is IPv4
        performRequest(addresses[0], port)
    }
});


function performRequest(address: string, port: number) {
    const url = `http://${address}:${port}/store/foo`;
    console.log('Performing request', url);
    axios.get(url)
        .then((response: Object) => {
            console.log(response.data);
        })
        .catch((error: Error) => {
            console.log(error);
        });
}
