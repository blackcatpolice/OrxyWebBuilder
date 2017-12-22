function pageIndex() {
    return Div({
        route: '/',
        nodes: [
            Div({
                nodes:[
                    bField({
                        name:'Name',
                        bind:'user.name'
                    }), 
                    Div({
                        bind:'user.name'
                    }),
                    bSelect({
                        datasource:'select',
                        bind:'selected'
                    }),
                    Div({
                        name:'subject',
                        bind:'selected'
                    })
                ]
            })
        ]
    });
}