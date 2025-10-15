import Constants from 'expo-constants';
import { Storage } from "./storage";

const baseURL = Constants.expoConfig?.extra.api.baseURL
const successCodes = [200, 201, 202, 203, 204, 205, 206, 207, 208, 209]
const failureCodes = [400, 401, 402, 403, 404, 405]

const Api = () => {
    console.log("baseurl = " + baseURL)
    const removePathSlash = baseURL.endsWith("/")
    let BearerToken = ""
    let ContextID = ""


    const getHeaders = async () => {
        let h = {}
        
        const tkn = await Storage.getItem('secure_token');
        if (tkn != "") {
            Object.assign(h, {"Authorization": "Bearer " + tkn})
        }

        if (ContextID != "") {
            Object.assign(h, {"context-id": ContextID})
        }

        return h
    }


    const doRequest = async (method : string, path : string, body: Object | FormData | undefined, onSuccess : Function, onFailure : Function, onError : Function) => {
        let url = baseURL
        if (removePathSlash && path.startsWith("/")) {
            url += path.slice(1)
        } else if (!removePathSlash && !path.startsWith("/")) {
            url += "/" + path
        }
        else {
            url += path
        } 
        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: await getHeaders()
            });

            let json = undefined
            if (response.headers.get("Content-Length") != "0") {
                json = await response.json();
            }

            if (successCodes.includes(response.status)) {
                onSuccess(json)
                return
            }
            if (failureCodes.includes(response.status)) {
                onFailure(json)
                return
            }
            throw new Error("received error status code " + response.status)
        } catch (error) {
            onError(error)
        } finally {
            console.log("performed request " + url)
        }
    }

    return {
        async POST (path : string, body: Object, onSuccess : Function, onFailure : Function, onError : Function) {
            doRequest('POST', path, JSON.stringify(body), onSuccess, onFailure, onError)
        },
        async PATCH (path : string, body: Object, onSuccess : Function, onFailure : Function, onError : Function) {
            doRequest('PATCH', path, JSON.stringify(body), onSuccess, onFailure, onError)
        },
        async GET (path : string, onSuccess : Function, onFailure : Function, onError : Function) {
            doRequest('GET', path, undefined, onSuccess, onFailure, onError)
        },
        async UPLOAD (path : string, body: FormData, onSuccess : Function, onFailure : Function, onError : Function) {
            doRequest('POST', path, body, onSuccess, onFailure, onError)
        },
        async SetBearerToken(token : string) {
            await Storage.setItem('secure_token', token);
        }
    }
}

export const API = Api()