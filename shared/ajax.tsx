import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/map"
import "rxjs/add/observable/dom/ajax"
import { API_URL } from "./api/index";

export const bodyUrl = (url, body) => ({
    url, body,
    method: "POST",
    responseType: 'json',
    crossDomain: true

})

export const AJAX = (url, body) => (
    Observable.ajax({
        url: API_URL() + url, body,
        method: "POST",
        responseType: 'json',
        crossDomain: true
    })
)


