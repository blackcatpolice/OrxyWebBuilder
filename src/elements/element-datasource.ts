function element_datasource(option,element,context) {
    if (!context.watcherKeyVault.hasOwnProperty(option.datasource)) {
        context.watcherKeyVault[option.datasource] = [];
    }
    if(option.datasourceRender)
        context.watcherKeyVault[option.datasource].push({el:element,func:option.datasourceRender});  
    else
        context.watcherKeyVault[option.datasource].push({el:element,func:(element,value)=>{
            element.innerText = value;
        }}); 
}