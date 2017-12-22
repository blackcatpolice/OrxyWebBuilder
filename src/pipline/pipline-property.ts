function pipline_property(context) {
    Object.keys(context).forEach(objItme=>{
        __processProperty__(objItme.toLocaleLowerCase(),context[objItme],context);
    });
}

function __processProperty__(name,value,context) {
    switch (name) {
        case 'debug': 
            value && (window['oxercontext'] = context); 
            break;  
        case 'nodes':
            value && pipline_nodes(value,context);
            break;
        case 'data':
            value && pipline_data(value,context);
            break;
        default:
            break;
    }
}