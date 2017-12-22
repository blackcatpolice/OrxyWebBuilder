function  Level(opts){
    if(opts.class)
    {
        if(opts.class instanceof Array)
        {
            opts.class.push('level')
        }
        else{
            var classArr = [];
            classArr.push(opts.class);
            classArr.push('level');
        }
    }
    else{
        opts.class = 'level'
    }
    return Div(opts);
}

function LevelItem(opts){
    opts.class='level-item';
    return Div(opts);
}

function LevelLeft(opts){
    opts.class = 'level-left';
    return Div(opts);
}

function LevelRight(opts){
    opts.class='level-right';
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
    })
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
    })
}

function Menu(opts) {
    var groupArr = [];
    opts.dataItem && opts.dataItem.forEach(groupElement => {
        var eleP = P({
            class: 'menu-label',
            nodes: groupElement.name
        })
        var eleList = [];
        groupElement.list.forEach(groupElementElement => {
            if (!groupElementElement.sub) {
                eleList.push(Li({
                    nodes:[A({
                        href: groupElementElement.href,
                        nodes: groupElementElement.name
                    })]
                }))
            }
            else {
                eleList.push(Li({
                    nodes: [A({ 
                        nodes: groupElementElement.name
                    }),Ul({
                        nodes:groupElementElement.sub.map(subItem => {
                            return A({
                                href: subItem.href,
                                nodes: subItem.name
                            })
                        })
                    })]
                }))
            }
        });
        var eleUl = Ul({
            class:'menu-list',
            nodes: eleList
        })
        groupArr.push(eleP);
        groupArr.push(eleUl);
    });
    return Aside({
        nodes: groupArr
    })
}

function bField(opts){
    return Div({
        class:'field',
        nodes:[
            Label({
                class:'label',
                nodes:opts.name
            }),
            Div({
               class:'control' ,
               nodes:[
                   Input({
                       class:'input',
                       bind:opts.bind
                   })
               ]
            })
        ]
    })
}

function bSelect(opts){
   return Div({
        class:'field',
        nodes:[
            Label({
                class:'label',
                nodes:opts.name
            }),
            Div({
               class:'control' ,
               nodes:[
                   Div({
                       class:'select',
                       nodes:[
                            Select({
                                datasource:opts.datasource,
                                bind:opts.bind
                            })
                       ]
                   })
                //    Input({
                //        class:'input',
                //        bind:opts.bind
                //    })
               ]
            })
        ]
    })
}

function bForm(opts){

}