
export function getUrl(type:string):string{
    let str = ''

    if(process.env.NODE_ENV == "development"){
        switch(type){
            case 'base':
                str = import.meta.env.VITE_BASE_URL
                break;
            case 'api':
                str = import.meta.env.VITE_BASE_API
                break;
            case 'ws':
                str = import.meta.env.VITE_SOKET_URL
                break;
            case 'img':
                // str = 
                break;
        }
    } else {
        let origin =  window.location.origin
        let hostnameArr =  window.location.host.split('.')
        if(origin.indexOf('//www.')>0){
            hostnameArr.shift()
        }
        switch(type){
            case 'base':
                str = origin
                break;
            case 'api':
                hostnameArr.unshift('api')
                str = 'https://' + hostnameArr.join('.')
                break;
            case 'ws':
                str = 'wss://' +hostnameArr.join('.')
                break;
            case 'img':
                // str =
                break;
        }
    }
    return str
}