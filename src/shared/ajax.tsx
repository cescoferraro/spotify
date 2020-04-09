import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import {Observable} from "rxjs/Observable"
import {API_URL} from "./api/index"

export const bodyUrl = (url: any, body: any) => ({
    url, body,
    method: "POST",
    responseType: "json",
    crossDomain: true

});

export const AJAX = (url: any, body: any) => (
    Observable.ajax({
        url: API_URL() + url, body,
        method: "POST",
        responseType: "json",
        crossDomain: true
    })
);
