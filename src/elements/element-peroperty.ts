
function element_property (option,element,contextElement,context,customeWathcerFunc){
    option && Object.keys(option).forEach(item=>{
        switch (item) {
            case 'nodes':
                option[item] &&  element_nodes(option[item],element,contextElement,context)
                break;
            case 'bind':
                option[item] && element_bind(option,element,context,customeWathcerFunc)
                break;
            case 'datasource':
                option[item]  && element_datasource(option,element,context)
                break;
            case 'class':
                option[item] && element_class(option[item],element);
                break;
            case 'data':
                option[item] &&  pipline_data(option[item],element);
                break;  
            default:
                option[item] && (element[item]=option[item])
                break;
        }
    });  
} 