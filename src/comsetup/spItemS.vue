<style scoped>
    .spItemC {
        margin: 10px;
        /* border: 1px solid #c3c3c3;
        border-radius: 5px;
        margin: 3px; */
    };
</style>

<template>
    <div draggable="true" @click.stop="onClick($event)" @dragstart.stop="ctrlDragStart($event)" @contextmenu.stop="onShowMenu($event)" class="spItemC">
        <component :is="item.content.type" :id="item.id" :item="item.content"></component>
    </div>
</template>

<script>
import SPSetup from "./spSetup.js";

    export default {
        props: ['item', 'parent'],//item: 组件属性对象 partent: 组件所在row的数据对象,用于拖曳操作
        data() {
            return {
            }
        },
        methods: {
            // 开始拖拽：传递被拖拽控件的ID
            ctrlDragStart: function(evt) {
                var id = evt.target.id;
                evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferID, this.item.content.id);
                evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferType, "move");
                evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferColIndex, this.item.colIndex);
                evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferChildIndex, this.item.childIndex);

                SPSetup.dragItem = this.parent;
            },
            onShowMenu: function(evt) {
                evt.preventDefault();

                SPSetup.Bus.$emit('showMenu', evt.clientX, evt.clientY, this.onEdit, this.onDelete);
            },
            onEdit: function() {
                alert("edit");
            },
            onDelete: function() {
                this.$emit('deleteItem', this.item.colIndex, this.item.childIndex);
            },
            onClick: function (evt) {
                SPSetup.Bus.$emit('clickItem', this.item.content);
            }
        }
    }
 </script>