function element_nodes(nodes,element,contextElement,context) {
    if (nodes) {
        if( nodes instanceof Array ){
            nodes.forEach(item => {
                   if(typeof item == 'string')
                    {
                        element.append(item);
                    }
                    else{ 
                        item && element.append(item(contextElement,context));
                    } 
            });
         }
         else if (typeof nodes == 'string'){
            element.innerText=nodes;element.innerText=nodes;
         } else{
            element.append(nodes(contextElement,context))
         }
    }
}