import {LOCALSTORE_KEYS} from "./constants";
import {getFetch, postFetch, resolveWalletId,} from "../utils/apiHelper";

const API_PATH = '/api/v1';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export const getWalletDetails = async (walletId) => {
    const url = `${SERVER_URL + API_PATH}/wallet/${walletId}`;
    return getFetch(url)
}

export const setupWallet = async ({name, balance}) => {
    try {
        const url = `${SERVER_URL + API_PATH}/setup`
        const payload = {name, balance};

        const response = await postFetch(url, payload);
        const data = await response.json();

        //DEV_NOTE: since Api calls are consuming the "walletId" it should be updated in ths scope only
        localStorage.setItem(LOCALSTORE_KEYS.WALLET_ID, data.id);
        return data;
    } catch (err) {
        console.error(err, err.message);
        throw new Error(err?.response?.data?.message)
    }
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


export const transactionCSV = () => {
    try {
        const walletId = resolveWalletId()
        return `${SERVER_URL + API_PATH}/transactions/export/${walletId}`;
    } catch (e) {
        console.log(e)
    }
    return ""
}

export const transactionSearch = (search) => {
    const walletId = resolveWalletId()
    console.log("REACHED", search)
    const url = `${SERVER_URL + API_PATH}/transactions/search`;
    return getFetch(url, {walletId, search})
}