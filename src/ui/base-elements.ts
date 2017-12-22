function generalElement(option,tagName,elementProc?:any,valueProc?:any) {
    return element_create((param)=>{
        param.extend= {
            option : option,
            tagName : tagName,
            elementProc: elementProc,
            valuePro:valueProc
        }; 
    });
}

function Aside(option){
    return generalElement(option,'aside');
}

function A(option){
    return generalElement(option,'a');
}

function H1(option){
    return generalElement(option,'h1');
}

function H2(option){
    return generalElement(option,'h2');
}

function Strong(option){
    return generalElement(option,'strong');
}

function Section(option) {
    return generalElement(option,'section');
}

function Aticle(option){
    return generalElement(option,'article');
}

function P(option) {
    return generalElement(option,'p');
}

function Span(option){
    return generalElement(option,'span');
}

function Div(option) {
    return generalElement(option,'div');
}

function Form(option) {
    return generalElement(option,'form')
}

function Label(option) {
    return generalElement(option,'section');
}

function Input(option) {
    return generalElement(option,'input',(_element,_option,_contextElement,_context)=>{
        if (_option) {
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data,bindFullKey);
                _element.value = value;

                _element.onkeyup=function (e){
                    __setPropValue__(_context.data,bindFullKey,this.value);
                }
            }
            if(_option.type){
                _element.type = _option.type;
            }
        }        
    },(ele,val)=>{
        ele.value = val; 
    });
}

function  Textarea(option){
    return generalElement(option,'textarea',(_element,_option,_contextElement,_context)=>{
        if (_option) {
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data,bindFullKey);
                _element.value = value;

                _element.onkeyup=function (e){
                    __setPropValue__(_context.data,bindFullKey,this.value);
                }
            }
            if(_option.type){
                _element.type = _option.type;
            }
        }        
    });
}

function Select(option) {
    if(!option.datasourceRender){
        option.datasourceRender = function (_element,_value) {
           _element.innerHTML='';
           _value.forEach(item => {
                var key= Object.keys(item)[0];
                var value =item[key];
                var option= document.createElement('option');
                option.value =key;
                option.innerText=value;
                _element.appendChild(option);
            });
        }
    }
    return generalElement(option,'select',(_element,_option,_contextElement,_context)=>{
        var valueArr = __getPropValue__(_context.data,_option.datasource);
        if(_option){
            if (_option.datasource) {
                //var bindFullKey = __getFullKey__(option);
                if(typeof valueArr ==='object'){
                    if (valueArr instanceof Array) { 
                        valueArr.forEach(item => {
                            var key= Object.keys(item)[0];
                            var value =item[key];
                            var option= document.createElement('option');
                            option.value =key;
                            option.innerText=value;
                            _element.appendChild(option);
                        });
                    }
                }
            }
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data,bindFullKey);
                __setPropValue__(_context.data,bindFullKey,value?value:_element.value); 
                _element.onchange=function(e){
                    __setPropValue__(_context.data,bindFullKey,this.value); 
                 } 
            }
        }
    },(ele,val)=>{
       ele.value = val; 
    })
}

function Footer(option){
    return generalElement(option,'footer'); 
}

function Li(option){
    return generalElement(option,'li');
}

function Ul(option){
   var liArr = [];
   if(option.nodes)
    {
         option.nodes.forEach(nodeElement => {
             liArr.push(Li({
                 nodes:nodeElement
             }))
         });
         option.nodes = liArr;
    }
    return generalElement(option,'ul');
}