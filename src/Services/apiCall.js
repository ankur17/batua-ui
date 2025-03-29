import {LOCALSTORE_KEYS} from "./constants";

const API_PATH = '/api/v1';
const SERVER_URL = "http://localhost:8081";

const resolveWalletId = () => {
    const walletData = localStorage.getItem(LOCALSTORE_KEYS.WALLET_DETAILS);
    if (walletData) {
        const {_id} = JSON.parse(walletData);
        return _id;
    } else {
        throw new Error('Wallet not found.');
    }
}

const postFetch = (url, payload) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

const getFetch = (url, queryParams) => {
    const formedUrl = url + "?" + new URLSearchParams(queryParams)
    return fetch(formedUrl)
}

export const getWalletDetails = async (walletId) => {
    const url = `${SERVER_URL + API_PATH}/wallet/${walletId}`;
    const response = await fetch(url)
    const data = await response.json();
    console.log("OUT", data);
    return data;
}


export const createTransaction = async ({amount, description}) => {

    try {
        const walletId = resolveWalletId()
        const url = `${SERVER_URL + API_PATH}/transact/${walletId}`;

        const payload = {
            amount, description
        }

        const response = await postFetch(url, payload);
        const data = await response.json();
        console.log("POST", data);

        return data

    } catch (err) {
        console.log(err);
    }
}

export const getTransactions = async ({skip, limit}) => {
    try {
        const walletId = resolveWalletId()
        const url = `${SERVER_URL + API_PATH}/transactions`;
        const response = await getFetch(url, {walletId, skip, limit})
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}