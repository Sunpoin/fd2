let spAttrs = {
}

spAttrs['sp-button'] = [
    {name: "id", label: "ID", type: "input", placeholder: "请输入ID"},
    {name: "name", label: "按钮名", type: "input", placeholder: "请输入按钮名"},
    {name: "size", label: "大小", type: "select", opts: [{value: 'large', label: 'Large'}, {value: 'default', label: 'Default'}, {value: 'small', label: 'Small'}]},
    {name: "long", label: "占满", type: "select", opts: [{value: 'false', label: 'False'}, {value: 'true', label: 'True'}]},
    {name: "enable", label: "默认禁用", type: "select", opts: [{value: 'enable', label: 'Enable'}, {value: 'disabled', label: 'Disabled'}]},
    {name: "fontSize", label: "字体大小", type: "input", placeholder: "FontSize"},
    {name: "color", label: "字体颜色", type: "input", placeholder: "Color"},
    {name: "clickStr", label: "点击事件", type: "input", placeholder: "onClick"},
];


export default spAttrs;