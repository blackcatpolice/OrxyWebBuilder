function Oxer(option){
    var context :any= {};
    context.extend({ 
        watcherKeyVault:{},
        elements:{}
    });
    context.extend(option); 
    // context.debug && (window["oxercontext"]=context)
    // pipline_router(context);
    pipline_property(context);
} 