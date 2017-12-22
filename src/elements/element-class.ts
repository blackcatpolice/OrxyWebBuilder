function element_class(classObj,element) {
    if (typeof classObj =='string' ){
        element.classList.add(classObj);
    }else if(typeof classObj == 'object' && classObj instanceof Array){
        classObj.forEach(item => {
            element.classList.add(item);
        });
    }
}