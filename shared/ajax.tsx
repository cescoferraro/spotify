export const bodyUrl = (url, body) => ({
    url, body,
    method: "POST",
    responseType: 'json',
    crossDomain: true

})
