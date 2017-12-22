function pipline_data(dataObj,context) {
    __processRootProp__(dataObj,null,context)
}

function __processRootProp__(obj,contextName,context) { 
    if(obj){
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                if (typeof element =='object'&& !(element instanceof Array)){
                    __processRootProp__(element,contextName && (contextName + '.' + key)||key,context)
                    continue;
                }  else{ 
                    __setPropWatcher__(obj,key,contextName&&(contextName+'.'+key)||key,context.watcherKeyVault);
                } 
            }
        }
    }
} 

function __getFullKey__(option){
    var key = '';
    if (option&&option.bind) {
        if (option.parent&&option.parent.bind) {
            key = __getFullKey__(option.parent)+"."+option.bind;
        }
        else{
            key = option.bind;
        }
    }
    return key;
}

function __setPropValue__(obj,key,value) {
    if (obj&&key) {
        var dataKeyStack = key.split('.').reverse();
        dataKeyStack.length==0&&dataKeyStack.push(key);
        var targetProp = obj;
        while (dataKeyStack.length>0) {
            var _key=dataKeyStack.pop();
            if(dataKeyStack.length>0)
                targetProp =targetProp[_key];
            else
                targetProp[_key] = value;
        }
        return targetProp;
    }
} 

function __getPropValue__(obj,key) {
    if (obj&&key) {
        var dataKeyStack = key.split('.').reverse();
        var targetProp = obj;
        while (dataKeyStack.length>0) {
            var _key=dataKeyStack.pop();
            targetProp =targetProp[_key];
        }
        return targetProp;
    }
}

function __setPropWatcher__(obj,key,fullKeyName,watcherKeyVault) {
    var tmpValue = obj[key]; 
    Object.defineProperty(obj,key,{
        get:function () {
            return this['_'+key]
        },
        set:function (v) {
            this['_'+key]=v;
            watcherKeyVault[fullKeyName] && watcherKeyVault[fullKeyName].forEach(item => {
                item.func(item.el,v);
            });
        },
        enumerable: true,
        configurable: true
    })
    obj[key]=tmpValue;
}