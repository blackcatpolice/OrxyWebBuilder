var pipline_router = function (context) {
        __renderRouter__(context);
        window.onhashchange=function(){
            __renderRouter__(context);
         } 
} 
function __renderRouter__(context) {
    if(!window.location.hash)
    {
        window.location.hash = '#/';
    }
    var path = window.location.hash.substring(1)
    
    context['routeTable']&&context['routeTable'].forEach(routerItem => {
        routerItem.tmpElement.innerHTML ='';
    });
    var routerItem =  context['routeTable']&&context['routeTable'].find(item=>{
        return item.path.toLowerCase() == path.toLowerCase();
    })
    routerItem && routerItem.tmpElement.appendChild(routerItem.element)
}