<style scoped>
    .spRow {

    }

    .spCol {
        min-height: 50px;
        border: 1px solid #c3c3c3;
    }
</style>

<template>
    <Form>
        <template v-if="item.type == 'sp-gridS'">
            <Row>
                <template v-for="(colItem, colIndex) in item.cols">
                    <div :colIndex="colIndex" @drop.stop='ctrlpanelDrop($event)' @dragover.stop='ctrlpanelDragover($event)'>
                        <Col class="spCol" :span="colItem.span" :key="colIndex" >
                            <template v-for="(childItem, childIndex) in colItem.children">
                                <component :is="childItem.type" :item="childItem" :parent="item" :childIndex="childIndex" :key="childIndex" v-on:deleteItem="onDelete(colIndex, childIndex)"></component>
                            </template>
                        </Col>
                    </div>
                </template>
            </Row>
        </template>
    </Form>
</template>

<script>
import SPSetup from "./spSetup.js";
export default {
    name: "sp-gridC",
    props: ["item"],
    data() {
        return {
            dragDataTransferID: "drag-tran-ctrlId", // 传递拖拽内容的ID标识
            dragDataTransferColIndex: "drag-tran-colIndex", // 传递拖拽内容的colIndex
            dragDataTransferChildIndex: "drag-tran-childIndex", // 传递拖拽内容的childIndex
            count: 0,
            dataModel: {
                type: "sp-gridS",
                cols: [
                    {
                        span: 12,
                        children: [
                            {
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        ctrlpanelDrop: function(evt) {
            evt.preventDefault();

            //拖动源组件的数据
            var dragItem =SPSetup.dragItem;
            var idDrag = evt.dataTransfer.getData(this.dragDataTransferID);
            var oldColIndex = evt.dataTransfer.getData(this.dragDataTransferColIndex);;
            var oldChildIndex = evt.dataTransfer.getData(this.dragDataTransferChildIndex);;
            var obj = evt.target.type;

            // console.log(evt);
            var childIndex = -1;
            var colIndex = -1;
            //遍历path，从目标的div中找到colIndex和childIndex属性
            if (evt.path != undefined && evt.path.length > 0) {
                for (let i = 0; i < evt.path.length; i++) {
                    let item = evt.path[i];
                    if (item.attributes != null) {
                        if (item.attributes.childIndex != undefined) {
                            childIndex = parseInt(item.attributes.childIndex.value);
                        }

                        if (item.attributes.colIndex != undefined) {
                            colIndex = parseInt(item.attributes.colIndex.value);
                            break;
                        }
                    }
                }
            }

            //console.log("oldCol: " + oldColIndex + " oldChild: " + oldChildIndex + " Col: " + colIndex + " Child: " + childIndex);

            if (colIndex != -1) {
                if (idDrag != "") { //添加组件
                    let itemNew = this.createItem(idDrag, colIndex, childIndex);

                    this.item.cols[colIndex].children.splice(childIndex+1, 0, itemNew);
                } else { //更换组件位置
                    if (colIndex == oldColIndex) {
                        if (oldChildIndex < childIndex)
                            childIndex--;
                    } 

                    let btn = dragItem.cols[oldColIndex].children[oldChildIndex];
                    dragItem.cols[oldColIndex].children.splice(oldChildIndex, 1);

                    this.item.cols[colIndex].children.splice(childIndex+1, 0, btn);
                }

                if (idDrag == "") {
                    //重新排序children组件
                    for(let i = 0; i < dragItem.cols[oldColIndex].children.length; i++) {
                        dragItem.cols[oldColIndex].children[i].childIndex = i;
                    }
                }

                //重新排序children组件
                for(let i = 0; i < this.item.cols[colIndex].children.length; i++) {
                    this.item.cols[colIndex].children[i].colIndex = colIndex;
                    this.item.cols[colIndex].children[i].childIndex = i;
                } 
            }

            evt.dataTransfer.clearData(this.dragDataTransferID);
            evt.dataTransfer.clearData(this.dragDataTransferColIndex);
            evt.dataTransfer.clearData(this.dragDataTransferChildIndex);
        },
        ctrlpanelDragover: function(evt) {
            evt.preventDefault();
        },
        onDelete: function(colIndex, childIndex) {
            this.item.cols[colIndex].children.splice(childIndex, 1);

            for(let i = 0; i < this.item.cols[colIndex].children.length; i++) {
                this.item.cols[colIndex].children[i].childIndex = i;
            } 
        },
        createItem: function(id, colIndex, childIndex) {
            let itemNew = {};
            switch (id) {
                case "ctrlGrid":
                    itemNew = {
                        type: "sp-itemS",
                        colIndex: colIndex,
                        childIndex: childIndex,
                        content: {
                            type:"sp-gridS",
                            cols:[
                                {
                                    span:12,
                                    children:[
                                    ]
                                },
                                {
                                    span:12,
                                    children:[
                                    ]
                                }
                            ]
                        }
                    };                        
                break;
                case "ctrlButton":
                default:
                    itemNew = {
                        type: "sp-itemS",
                        colIndex: colIndex,
                        childIndex: childIndex,
                        content: {
                            type: "sp-button",
                            icon: "",
                            name: "Button" + this.count++,
                            onClick: function() {
                                alert("This is a button.");
                            }
                        }
                    };
                break;
            }

            return itemNew;
        }
    }
}


</script>