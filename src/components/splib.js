import SPGrid from "./spGrid";
import SPInput from "./spInput";

/** 组件协作器
 * 辅助解析组件的公共方法：
 *      1）实现将组件动态注册到 Vue 实例中
 *      2）提供组件模板字典
 * 实现组件方法
 *      1）编写 template.vue 文件
 *      2）在本文件中  import 组件名称(如：SPGrid) from ./组件文件路径/SPGrid
 *      3）在 SPLib.templates 中添加对应的字典如： {"sp-grid": SPGrid}
 * 调用方法：
 *      import SPLib from ./splib.js
 *      Vue.use(SPLib);
 * 
*/
let SPLib = function () {

}

/** 组件安装方法 在 Vue.user(SPLib) 时触发 */
SPLib.install = function(Vue, options){
    Vue.prototype.SPLib = SPLib;
    SPLib.init(Vue);
}

/** 动态将组件字典中的组件注册到 Vue 中 */
SPLib.init = function (Vue) {
    for (var key in this.templates) {
        if (this.templates.hasOwnProperty(key)) {
            Vue.component(key, this.templates[key]);
        }
    }
}

/** 组件模板字典集合 */
SPLib.templates = {
    "sp-grid": SPGrid,
    "sp-input": SPInput
}

export default SPLib;