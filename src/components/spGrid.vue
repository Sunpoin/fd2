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
        <template v-if="item.type == 'sp-grid'">
        <div @drop='ctrlpanelDrop($event)' @dragover='ctrlpanelDragover($event)'>
            <Row>
                <template v-for="(colItem, colIndex) in item.cols">
                    <Col class="spCol" :span="colItem.span" :colIndex="colIndex" :key="colIndex" >
                    <template v-for="(childItem, childIndex) in colItem.children">
                        <component :is="childItem.type" :item="childItem" :key="childIndex"></component>
                    </template>
                    </Col>
                </template>
            </Row>
        </div>
        </template>
    </Form>
</template>

<script>
export default {
    name: "sp-grid",
    props: ["item"],
    data() {
        return {
            dataModel: {
                type: "sp-grid",
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
            var id = evt.dataTransfer.getData(this.dragDataTransferContent);
            var obj = evt.target.type; // 判断当前停留的容器，并开始遍历 ctrls ，找到对应的 type ，然后注入type值，如下：

            console.log(this.item.cols);
            // 如果是第一个组件，则使用默认，并启用type值
            let btn = {
                type: "sp-buttonS",
                content: {
                    type: "sp-button",
                    icon: "",
                    name: "Button",
                    onClick: function(){
                        alert("This is a button.");
                    }}
                }
            this.item.cols[0].children.push(btn);

            evt.dataTransfer.clearData(this.dragDataTransferContent);
        },
        ctrlpanelDragover: function(evt) {
            evt.preventDefault();
        }
    }
}


</script>