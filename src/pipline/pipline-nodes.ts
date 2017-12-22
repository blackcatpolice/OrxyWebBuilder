function pipline_nodes(nodes,context) {
    if(nodes instanceof Array ){
        nodes.forEach(item => {
                item && document.body.appendChild(item(context.elements, context));
        });
    }
    if(context.enableRoute){
        pipline_router(context);
    }
    if(context.watcherKeyVault) {
        Object.keys(context.watcherKeyVault).forEach(bindFullKey=>{
          context.watcherKeyVault[bindFullKey].forEach(item => { 
            var value = __getPropValue__(context.data,bindFullKey);
                item.func(item.el,value);
            });
        })
    } 
}