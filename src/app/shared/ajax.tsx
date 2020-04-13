import "rxjs/add/observable/dom/ajax"
import "rxjs/add/operator/map"
import "rxjs/add/operator/take"
import {ajax} from "rxjs/ajax";
import {API_URL} from "./api"

export const bodyUrl = (url: any, body: any) => ({
    url, body,
    method: "POST",
    responseType: "json",
    crossDomain: true

});

export const AJAX = (url: any, body: any) => (
    ajax({
        url: API_URL() + url, body,
        method: "POST",
        responseType: "json",
        crossDomain: true
    })
);
