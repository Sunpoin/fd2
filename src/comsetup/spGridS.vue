<style scoped>
    .spRow {

    }

    .dragDot {
        position: absolute;
        z-index: 99;
        top: -5px;
        left: -5px;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #c3c3c3;
    }

    .spCol {
        margin-left: -1px;
        min-height: 50px;
        border: 1px solid #c3c3c3;
    }

    .bkWhite {
        background-color: white;
    }

    .bkDragOver {
        background-color: #F0F0F0;
    }
</style>

<template>
    <Form style="position: relative">
        <div class="dragDot"></div>
        <template v-if="item.type == 'sp-gridS'">
            <div >
            <Row>
                <template v-for="(colItem, colIndex) in item.cols">
                    <div :key="colIndex" :colIndex="colIndex" :rowId="item.id" @drop.stop='ctrlpanelDrop($event)' @dragenter.stop='onDragEnter($event)' @dragleave.stop='onDragLeave($event)' @dragover.stop='ctrlpanelDragover($event)'>
                        <Col :class="[dragOverCol == colIndex ? 'bkDragOver' : 'bkWhite']" class="spCol" :span="colItem.span" :key="colIndex">
                            <template v-for="(childItem, childIndex) in colItem.children">
                                <component :is="childItem.type" :item="childItem" :parent="item" :childIndex="childIndex" :key="childIndex" v-on:deleteItem="onDelete(colIndex, childIndex)"></component>
                            </template>
                        </Col>
                    </div>
                </template>
            </Row>
            </div>
        </template>
    </Form>
</template>

<script>
import SPSetup from "./spSetup.js";
import Util from "../libs/util.js";

export default {
    name: "sp-gridS",
    props: ["item"],
    data() {
        return {
            dragOverCol: -1,
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
            this.dragOverCol = -1;

            //拖动源组件的数据
            let dragItem = SPSetup.dragItem;
            let dragId = evt.dataTransfer.getData(SPSetup.dragFlag.dragDataTransferID);
            let dragType = evt.dataTransfer.getData(SPSetup.dragFlag.dragDataTransferType);
            let oldColIndex = evt.dataTransfer.getData(SPSetup.dragFlag.dragDataTransferColIndex);;
            let oldChildIndex = evt.dataTransfer.getData(SPSetup.dragFlag.dragDataTransferChildIndex);;
            let obj = evt.target.type;

            //console.log(evt);
            let childIndex = -1;
            let colIndex = -1;
            let rowId = "null";
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
                            rowId = item.attributes.rowId.value;
                            break;
                        }
                    }
                }
            }

            //console.log("oldCol: " + oldColIndex + " oldChild: " + oldChildIndex + " Col: " + colIndex + " Child: " + childIndex);

            //组件移到自身直接返回
            if(dragType == "move" && rowId === dragId) {
                evt.dataTransfer.clearData();
                return;
            }

            if (dragType == "move" && dragItem === this.item && oldColIndex === colIndex) {
                if (oldChildIndex === childIndex || oldChildIndex === childIndex + 1){
                    evt.dataTransfer.clearData();
                    return;
                }
            }

            if (colIndex != -1) {
                if (dragType === "new") { //添加组件
                    let itemNew = this.createItem(dragId, colIndex, childIndex);

                    this.item.cols[colIndex].children.splice(childIndex+1, 0, itemNew);
                } else { //更换组件位置
                    if (colIndex === oldColIndex) {
                        if (oldChildIndex < childIndex)
                            childIndex--;
                    } 

                    let oldItem = dragItem.cols[oldColIndex].children[oldChildIndex];
                    dragItem.cols[oldColIndex].children.splice(oldChildIndex, 1);

                    this.item.cols[colIndex].children.splice(childIndex+1, 0, oldItem);
                }

                if (dragType === "move") {
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

            evt.dataTransfer.clearData(SPSetup.dragFlag.dragDataTransferID);
            evt.dataTransfer.clearData(SPSetup.dragFlag.dragDataTransferType);
            evt.dataTransfer.clearData(SPSetup.dragFlag.dragDataTransferColIndex);
            evt.dataTransfer.clearData(SPSetup.dragFlag.dragDataTransferChildIndex);
        },
        ctrlpanelDragover: function(evt) {
            evt.preventDefault();

            var colIndex = -1;
            //遍历path，从目标的div中找到colIndex和childIndex属性
            if (evt.path != undefined && evt.path.length > 0) {
                for (let i = 0; i < evt.path.length; i++) {
                    let item = evt.path[i];
                    if (item.attributes != null) {
                        if (item.attributes.colIndex != undefined) {
                            colIndex = parseInt(item.attributes.colIndex.value);
                            break;
                        }
                    }
                }
            }
            
            //console.log("ctrlpanelDragover", colIndex);
            this.dragOverCol = colIndex;
        },
        onDragEnter: function(evt) {
            var colIndex = -1;
            //遍历path，从目标的div中找到colIndex和childIndex属性
            if (evt.path != undefined && evt.path.length > 0) {
                for (let i = 0; i < evt.path.length; i++) {
                    let item = evt.path[i];
                    if (item.attributes != null) {
                        if (item.attributes.colIndex != undefined) {
                            colIndex = parseInt(item.attributes.colIndex.value);
                            break;
                        }
                    }
                }
            }
            
            //console.log("onDragEnter", colIndex);
            this.dragOverCol = colIndex;
        },
        onDragLeave: function(evt) {
            //console.log("onDragLeave", evt);

            this.dragOverCol = -1;
        },
        onDelete: function(colIndex, childIndex) {
            this.item.cols[colIndex].children.splice(childIndex, 1);

            for(let i = 0; i < this.item.cols[colIndex].children.length; i++) {
                this.item.cols[colIndex].children[i].childIndex = i;
            } 
        },
        createItem: function(id, colIndex, childIndex) {
            let itemNew = {};
            let idNew = Util.newGuid();
            switch (id) {
                case "ctrlGrid":
                    itemNew = {
                        type: "sp-itemS",
                        colIndex: colIndex,
                        childIndex: childIndex,
                        content: {
                            type:"sp-gridS",
                            id: idNew,
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
                            id: idNew,
                            icon: "",
                            long: 'false',
                            enable: 'enable',
                            size: 'default',
                            fontSize: 12,
                            color: 'white',
                            name: "Button",
                            clickStr: ""
                        }
                    };
                break;
            }

            return itemNew;
        }
    }
}


</script>