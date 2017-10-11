export default {
    processor: function (ctrlAry) {
        let childrenStr = '';

        for(let cur in ctrlAry){
            childrenStr += this.proxy(ctrlAry[cur]);
        }

        return childrenStr;
    },
    grid : function (item) {
       return   '<Row>\
                    <template v-for="(colItem,colIndex) in item.cols">\
                        <Col :span="colItem.span" :key="colIndex">\
                        {{SPResolver.processor(colItem.children)}}\
                        </Col>\
                    </template>\
                </Row>';

    },
    proxy : function (item) {
        switch (item.type) {
            case 'grid':
                return this.grid(item);
            default:
                return '';
        }
    }
};