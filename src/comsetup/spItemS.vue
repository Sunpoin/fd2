<style scoped>
    .spItemC {
        padding: 5px;
        /* border: 1px solid #c3c3c3;
        border-radius: 5px;
        margin: 3px; */
    };

    .toolBar {
        text-align: right;
        padding: 5px;
    }
</style>

<template>
    <div draggable="true"  @dragstart.stop="ctrlDragStart($event)" class="spItemC">
        <div>
            <div class="toolBar">
                <Button type="primary" size="small">edit</Button>
                <Button type="primary" size="small">拖动</Button>
                <Button type="primary" size="small" @click="onDelete">删除</Button>
            </div>
        </div>
        <component :is="item.content.type" :item="item.content"></component>
    </div>
</template>

<script>
import SPSetup from "./spSetup.js";

    export default {
        props: ['item', 'parent'],//item: 组件属性对象 partent: 组件所在row的数据对象,用于拖曳操作
        data() {
            return {
                dragDataTransferID: "drag-tran-ctrlId", // 传递拖拽内容的ID标识
                dragDataTransferColIndex: "drag-tran-colIndex", // 传递拖拽内容的colIndex
                dragDataTransferChildIndex: "drag-tran-childIndex" // 传递拖拽内容的childIndex
            }
        },
        methods: {
            // 开始拖拽：传递被拖拽控件的ID
            ctrlDragStart: function(evt) {
                var id = evt.target.id;
                evt.dataTransfer.setData(this.dragDataTransferID, "");
                evt.dataTransfer.setData(this.dragDataTransferColIndex, this.item.colIndex);
                evt.dataTransfer.setData(this.dragDataTransferChildIndex, this.item.childIndex);

                SPSetup.dragItem = this.parent;
            },
            onDelete: function() {
                this.$emit('deleteItem', this.item.colIndex, this.item.childIndex);
            }
        }
    }
 </script>