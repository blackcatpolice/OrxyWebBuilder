function element_bind(option,element,context,customeWathcerFunc) {
    var bindFullKey = __getFullKey__(option);
    if(!context.watcherKeyVault.hasOwnProperty(bindFullKey)){
        context.watcherKeyVault[bindFullKey]=[];
    }
    if(customeWathcerFunc)
        context.watcherKeyVault[bindFullKey].push({el:element,func:customeWathcerFunc});  
    else
        context.watcherKeyVault[bindFullKey].push({el:element,func:(element,value)=>{
            element.innerText = value;
    }});   
}