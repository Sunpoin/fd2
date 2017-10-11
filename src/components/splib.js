import SPGrid from "./spGrid";
import SPInput from "./spInput";

export default {
    init: function (Vue) {
        for (var key in this.kits) {
            if (this.kits.hasOwnProperty(key)) {
                Vue.component(key, this.kits[key]);
            }
        }
    },
    kits: {
        "sp-grid": SPGrid,
        "sp-input": SPInput
    }
};