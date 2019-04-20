
import axios from 'axios';

/**
 * Importar chaves de um arquivo key.js dentro da pasta services
 */
import { publicKey } from './key';

const urlBaseMarvel = 'https://gateway.marvel.com:443/v1/public/';
const apiKey = 'CHAVE-PUBLICA-MARVEL-API';

export const getAllComics = (limit, callback) => {
    const urlComics = urlBaseMarvel + 'comics?apikey=' + apiKey + '&limit=' + limit;
    axios.get(urlComics).then((comics) => {
        if (callback) {
            callback(comics);
        }
    })
}