import axios from "axios";

/**
 * Importar chaves de um arquivo key.js dentro da pasta services (criar caso não exista)
 */
import { publicKey, privateKey } from "./key";

import md5 from 'js-md5'

const marvelAPI = "https://gateway.marvel.com/v1/public";

const apiKey = publicKey;

const timestamp = Number(new Date())
const hash = md5.create()
hash.update(timestamp + privateKey + publicKey)

export const getAllComics = async ({ limit, callback }) => {
  const urlComics =`${marvelAPI}/comics?ts=${timestamp}&limit=${limit}&apikey=${apiKey}&hash=${hash}`;
  
  return axios.get(urlComics).then(comics => {
    return(comics.data.data.results);
  });
};
