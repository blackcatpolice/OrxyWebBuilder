function pageForm() {
    return Div({
        route: '/form',
        nodes: 'Hey , this is page form'
    });
}
function pageIndex() {
    return Div({
        route: '/',
        nodes: [
            Div({
                nodes: [
                    bField({
                        name: 'Name',
                        bind: 'user.name'
                    }),
                    Div({
                        bind: 'user.name'
                    }),
                    bSelect({
                        datasource: 'select',
                        bind: 'selected'
                    }),
                    Div({
                        name: 'subject',
                        bind: 'selected'
                    })
                ]
            })
        ]
    });
}
function Oxer(option) {
    var context = {};
    context.extend({
        watcherKeyVault: {},
        elements: {}
    });
    context.extend(option);
    pipline_property(context);
}
function element_bind(option, element, context, customeWathcerFunc) {
    var bindFullKey = __getFullKey__(option);
    if (!context.watcherKeyVault.hasOwnProperty(bindFullKey)) {
        context.watcherKeyVault[bindFullKey] = [];
    }
    if (customeWathcerFunc)
        context.watcherKeyVault[bindFullKey].push({ el: element, func: customeWathcerFunc });
    else
        context.watcherKeyVault[bindFullKey].push({ el: element, func: function (element, value) {
                element.innerText = value;
            } });
}
function element_class(classObj, element) {
    if (typeof classObj == 'string') {
        element.classList.add(classObj);
    }
    else if (typeof classObj == 'object' && classObj instanceof Array) {
        classObj.forEach(function (item) {
            element.classList.add(item);
        });
    }
}
function element_create(processCallback) {
    return function (contextElement, context) {
        var param = {
            extend: {
                option: null,
                tagName: null,
                elementProc: null
            }
        };
        processCallback(param);
        var option = param.extend.option;
        var tagName = param.extend.tagName;
        var elementProc = param.extend.elementProc;
        var element = document.createElement(tagName);
        if (!contextElement.children) {
            contextElement.children = [];
        }
        contextElement.children.push(option);
        option.parent = contextElement;
        elementProc && elementProc(element, option, contextElement.children[contextElement.children.length - 1], context);
        element_property(option, element, contextElement.children[contextElement.children.length - 1], context, elementProc);
        if (option.route) {
            if (!context.routeTable) {
                context.routeTable = [];
            }
            var tmpElement = document.createElement('div');
            context.routeTable.push({
                path: option.route,
                tmpElement: tmpElement,
                element: element
            });
            return tmpElement;
        }
        return element;
    };
}
function element_datasource(option, element, context) {
    if (!context.watcherKeyVault.hasOwnProperty(option.datasource)) {
        context.watcherKeyVault[option.datasource] = [];
    }
    if (option.datasourceRender)
        context.watcherKeyVault[option.datasource].push({ el: element, func: option.datasourceRender });
    else
        context.watcherKeyVault[option.datasource].push({ el: element, func: function (element, value) {
                element.innerText = value;
            } });
}
function element_nodes(nodes, element, contextElement, context) {
    if (nodes) {
        if (nodes instanceof Array) {
            nodes.forEach(function (item) {
                if (typeof item == 'string') {
                    element.append(item);
                }
                else {
                    item && element.append(item(contextElement, context));
                }
            });
        }
        else if (typeof nodes == 'string') {
            element.innerText = nodes;
            element.innerText = nodes;
        }
        else {
            element.append(nodes(contextElement, context));
        }
    }
}
function element_property(option, element, contextElement, context, customeWathcerFunc) {
    option && Object.keys(option).forEach(function (item) {
        switch (item) {
            case 'nodes':
                option[item] && element_nodes(option[item], element, contextElement, context);
                break;
            case 'bind':
                option[item] && element_bind(option, element, context, customeWathcerFunc);
                break;
            case 'datasource':
                option[item] && element_datasource(option, element, context);
                break;
            case 'class':
                option[item] && element_class(option[item], element);
                break;
            case 'data':
                option[item] && pipline_data(option[item], element);
                break;
            default:
                option[item] && (element[item] = option[item]);
                break;
        }
    });
}
function pipline_data(dataObj, context) {
    __processRootProp__(dataObj, null, context);
}
function __processRootProp__(obj, contextName, context) {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                if (typeof element == 'object' && !(element instanceof Array)) {
                    __processRootProp__(element, contextName && (contextName + '.' + key) || key, context);
                    continue;
                }
                else {
                    __setPropWatcher__(obj, key, contextName && (contextName + '.' + key) || key, context.watcherKeyVault);
                }
            }
        }
    }
}
function __getFullKey__(option) {
    var key = '';
    if (option && option.bind) {
        if (option.parent && option.parent.bind) {
            key = __getFullKey__(option.parent) + "." + option.bind;
        }
        else {
            key = option.bind;
        }
    }
    return key;
}
function __setPropValue__(obj, key, value) {
    if (obj && key) {
        var dataKeyStack = key.split('.').reverse();
        var targetProp = obj;
        while (dataKeyStack.length > 0) {
            var _key = dataKeyStack.pop();
            if (dataKeyStack.length > 0)
                targetProp = targetProp[_key];
            else
                targetProp[_key] = value;
        }
        return targetProp;
    }
}
function __getPropValue__(obj, key) {
    if (obj && key) {
        var dataKeyStack = key.split('.').reverse();
        var targetProp = obj;
        while (dataKeyStack.length > 0) {
            var _key = dataKeyStack.pop();
            targetProp = targetProp[_key];
        }
        return targetProp;
    }
}
function __setPropWatcher__(obj, key, fullKeyName, watcherKeyVault) {
    var tmpValue = obj[key];
    Object.defineProperty(obj, key, {
        get: function () {
            return this['_' + key];
        },
        set: function (v) {
            this['_' + key] = v;
            watcherKeyVault[fullKeyName] && watcherKeyVault[fullKeyName].forEach(function (item) {
                item.func(item.el, v);
            });
        },
        enumerable: true,
        configurable: true
    });
    obj[key] = tmpValue;
}
function pipline_nodes(nodes, context) {
    if (nodes instanceof Array) {
        nodes.forEach(function (item) {
            item && document.body.appendChild(item(context.elements, context));
        });
    }
    if (context.enableRoute) {
        pipline_router(context);
    }
    if (context.watcherKeyVault) {
        Object.keys(context.watcherKeyVault).forEach(function (bindFullKey) {
            context.watcherKeyVault[bindFullKey].forEach(function (item) {
                var value = __getPropValue__(context.data, bindFullKey);
                item.func(item.el, value);
            });
        });
    }
}
function pipline_property(context) {
    Object.keys(context).forEach(function (objItme) {
        __processProperty__(objItme.toLocaleLowerCase(), context[objItme], context);
    });
}
function __processProperty__(name, value, context) {
    switch (name) {
        case 'debug':
            value && (window['oxercontext'] = context);
            break;
        case 'nodes':
            value && pipline_nodes(value, context);
            break;
        case 'data':
            value && pipline_data(value, context);
            break;
        default:
            break;
    }
}
var pipline_router = function (context) {
    __renderRouter__(context);
    window.onhashchange = function () {
        __renderRouter__(context);
    };
};
function __renderRouter__(context) {
    if (!window.location.hash) {
        window.location.hash = '#/';
    }
    var path = window.location.hash.substring(1);
    context['routeTable'] && context['routeTable'].forEach(function (routerItem) {
        routerItem.tmpElement.innerHTML = '';
    });
    var routerItem = context['routeTable'] && context['routeTable'].find(function (item) {
        return item.path.toLowerCase() == path.toLowerCase();
    });
    routerItem && routerItem.tmpElement.appendChild(routerItem.element);
}
function generalElement(option, tagName, elementProc, valueProc) {
    return element_create(function (param) {
        param.extend = {
            option: option,
            tagName: tagName,
            elementProc: elementProc,
            valuePro: valueProc
        };
    });
}
function Aside(option) {
    return generalElement(option, 'aside');
}
function A(option) {
    return generalElement(option, 'a');
}
function H1(option) {
    return generalElement(option, 'h1');
}
function H2(option) {
    return generalElement(option, 'h2');
}
function Strong(option) {
    return generalElement(option, 'strong');
}
function Section(option) {
    return generalElement(option, 'section');
}
function Aticle(option) {
    return generalElement(option, 'article');
}
function P(option) {
    return generalElement(option, 'p');
}
function Span(option) {
    return generalElement(option, 'span');
}
function Div(option) {
    return generalElement(option, 'div');
}
function Form(option) {
    return generalElement(option, 'form');
}
function Label(option) {
    return generalElement(option, 'section');
}
function Input(option) {
    return generalElement(option, 'input', function (_element, _option, _contextElement, _context) {
        if (_option) {
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data, bindFullKey);
                _element.value = value;
                _element.onkeyup = function (e) {
                    __setPropValue__(_context.data, bindFullKey, this.value);
                };
            }
            if (_option.type) {
                _element.type = _option.type;
            }
        }
    });
}
function Textarea(option) {
    return generalElement(option, 'textarea', function (_element, _option, _contextElement, _context) {
        if (_option) {
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data, bindFullKey);
                _element.value = value;
                _element.onkeyup = function (e) {
                    __setPropValue__(_context.data, bindFullKey, this.value);
                };
            }
            if (_option.type) {
                _element.type = _option.type;
            }
        }
    });
}
function Select(option) {
    if (!option.datasourceRender) {
        option.datasourceRender = function (_element, _value) {
            _element.innerHTML = '';
            _value.forEach(function (item) {
                var key = Object.keys(item)[0];
                var value = item[key];
                var option = document.createElement('option');
                option.value = key;
                option.innerText = value;
                _element.appendChild(option);
            });
        };
    }
    return generalElement(option, 'select', function (_element, _option, _contextElement, _context) {
        if (_option) {
            if (_option.datasource) {
                var value = __getPropValue__(_context.data, _option.datasource);
                if (typeof value === 'object') {
                    if (value instanceof Array) {
                        value.forEach(function (item) {
                            var key = Object.keys(item)[0];
                            var value = item[key];
                            var option = document.createElement('option');
                            option.value = key;
                            option.innerText = value;
                            _element.appendChild(option);
                        });
                    }
                }
            }
            if (_option.bind) {
                var bindFullKey = __getFullKey__(option);
                var value = __getPropValue__(_context.data, bindFullKey);
                _element.onchange = function (e) {
                    __setPropValue__(_context.data, bindFullKey, this.value);
                };
            }
        }
    }, function (ele, val) {
        ele.value = val;
    });
}
function Footer(option) {
    return generalElement(option, 'footer');
}
function Li(option) {
    return generalElement(option, 'li');
}
function Ul(option) {
    var liArr = [];
    if (option.nodes) {
        option.nodes.forEach(function (nodeElement) {
            liArr.push(Li({
                nodes: nodeElement
            }));
        });
        option.nodes = liArr;
    }
    return generalElement(option, 'ul');
}
function Level(opts) {
    if (opts.class) {
        if (opts.class instanceof Array) {
            opts.class.push('level');
        }
        else {
            var classArr = [];
            classArr.push(opts.class);
            classArr.push('level');
        }
    }
    else {
        opts.class = 'level';
    }
    return Div(opts);
}
function LevelItem(opts) {
    opts.class = 'level-item';
    return Div(opts);
}
function LevelLeft(opts) {
    opts.class = 'level-left';
    return Div(opts);
}
function LevelRight(opts) {
    opts.class = 'level-right';
    return Div(opts);
}
function Tile(opts) {
    return Div({
        class: ['tile'],
        nodes: [
            Aticle({
                class: ['notification'].concat(opts.class),
                nodes: [
                    P({
                        nodes: opts.title
                    }),
                    P({
                        nodes: opts.subtitle
                    }),
                    Div({
                        class: 'content',
                        nodes: [
                            P({
                                nodes: opts.content
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function Hero(opts) {
    return Section({
        class: [
            'hero'
        ].concat(opts.class || []),
        nodes: [
            Div({
                class: "hero-body",
                nodes: [
                    Div({
                        class: [
                            "container"
                        ],
                        nodes: [
                            H1({
                                class: [
                                    'title'
                                ],
                                nodes: opts.title
                            }),
                            H2({
                                class: [
                                    'subtitle'
                                ],
                                nodes: opts.subtitle
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function bFooter(opts) {
    return Footer({
        class: ['footer'],
        nodes: [
            Div({
                class: ['container'],
                nodes: [
                    Div({
                        class: ['content', 'has-text-centered'],
                        nodes: [
                            P({
                                nodes: [
                                    Strong({
                                        nodes: 'Bulma'
                                    }),
                                    'by',
                                    A({
                                        href: 'https://oryxl.com',
                                        nodes: 'Oryx Labs'
                                    }),
                                    'The source code is licensed'
                                ]
                            }),
                            A({
                                href: 'http://github.com',
                                nodes: 'MIT'
                            }),
                            '.',
                            'The website content is licensed',
                            A({
                                href: 'https://oryxl.com',
                                nodes: 'copyright at Oryxl'
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function Menu(opts) {
    var groupArr = [];
    opts.dataItem && opts.dataItem.forEach(function (groupElement) {
        var eleP = P({
            class: 'menu-label',
            nodes: groupElement.name
        });
        var eleList = [];
        groupElement.list.forEach(function (groupElementElement) {
            if (!groupElementElement.sub) {
                eleList.push(Li({
                    nodes: [A({
                            href: groupElementElement.href,
                            nodes: groupElementElement.name
                        })]
                }));
            }
            else {
                eleList.push(Li({
                    nodes: [A({
                            nodes: groupElementElement.name
                        }), Ul({
                            nodes: groupElementElement.sub.map(function (subItem) {
                                return A({
                                    href: subItem.href,
                                    nodes: subItem.name
                                });
                            })
                        })]
                }));
            }
        });
        var eleUl = Ul({
            class: 'menu-list',
            nodes: eleList
        });
        groupArr.push(eleP);
        groupArr.push(eleUl);
    });
    return Aside({
        nodes: groupArr
    });
}
function bField(opts) {
    return Div({
        class: 'field',
        nodes: [
            Label({
                class: 'label',
                nodes: opts.name
            }),
            Div({
                class: 'control',
                nodes: [
                    Input({
                        class: 'input',
                        bind: opts.bind
                    })
                ]
            })
        ]
    });
}
function bSelect(opts) {
    return Div({
        class: 'field',
        nodes: [
            Label({
                class: 'label',
                nodes: opts.name
            }),
            Div({
                class: 'control',
                nodes: [
                    Div({
                        class: 'select',
                        nodes: [
                            Select({
                                datasource: opts.datasource,
                                bind: opts.bind
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function bForm(opts) {
}
if (!Object.prototype['clone']) {
    Object.defineProperty(Object.prototype, 'clone', {
        value: function () {
            if (!this) {
                throw new TypeError('Cannot read property "clone" of undefined ');
            }
            var _this = this;
            var o = new Object();
            Object.keys(_this).forEach(function (item) {
                if (typeof _this[item] === "Object")
                    o[item] = _this[item];
                else
                    o[item] = _this[item];
            });
            return o;
        }
    });
}
if (!Object.prototype['extend']) {
    Object.defineProperty(Object.prototype, 'extend', {
        value: function (extObj) {
            if (!this) {
                throw new TypeError('Cannot read property "extend" of undefined ');
            }
            var _this = this;
            var o = new Object();
            Object.keys(extObj).forEach(function (item) {
                if (_this.hasOwnProperty(item)) {
                    if (typeof _this[item] === "Object") {
                        _this[item].extend(extObj[item]);
                    }
                }
                else {
                    _this[item] = extObj[item];
                }
            });
            return o;
        }
    });
}
