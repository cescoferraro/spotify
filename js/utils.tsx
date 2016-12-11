export default {
    GetCode: (nam) => {
        let name;
        if (name = (new RegExp('[?&]' + encodeURIComponent(nam) + '=([^&]*)')).exec(location.search)) {
            return decodeURIComponent(name[ 1 ]);
        }
    }
};






