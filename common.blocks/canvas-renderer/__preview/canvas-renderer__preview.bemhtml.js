block('canvas-renderer').elem('preview')(
    tag()('pre'),
    content()(
        function() {
            var ctx = this.ctx;
            return [{
                elem: 'style-set',
                tag: 'link',
                attrs: {
                    href: '/_/hljs/default.css',
                    rel: 'stylesheet'
                }
            }, {
                elem: 'code-container',
                content: ctx.text
            }];
        }
    )
);
