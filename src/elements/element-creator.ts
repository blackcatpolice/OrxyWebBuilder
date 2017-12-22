function element_create(processCallback) {
    return function (contextElement,context) { 
        var param = {
            extend :{
                option:null,
                tagName:null,
                elementProc:null
            }
        };
        processCallback(param);
        var option = param.extend.option;
        var tagName = param.extend.tagName;
        var elementProc = param.extend.elementProc;
        var element = document.createElement(tagName);
        
        if(!contextElement.children){
            contextElement.children = [];
        }
        
        // backup code
        contextElement.children.push(option);
        option.parent = contextElement;
        elementProc&&elementProc(element,option,contextElement.children[contextElement.children.length-1],context)
        element_property(option,element,contextElement.children[contextElement.children.length-1],context,elementProc);
        if(option.route)
        {
            if(!context.routeTable)
            {
                context.routeTable = []
            }
            var tmpElement =  document.createElement('div');
            context.routeTable.push({
                path:option.route,
                tmpElement :tmpElement,
                element:element
            })
            return tmpElement; 
        } 
        return element;
    }   
}