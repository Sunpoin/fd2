<style scoped>
@import '../styles/index.css';
</style>
<template>
    <div class="index-layout">
        <Row type="flex">
            <Col :span="spanLeft" class="index-layout-left">
            <div class="index-layout-left-header">Form Designer</div>
            <Collapse v-model="accordionActivity" accordion>
                <Panel name="1">
                    基础控件
                    <p slot="content" id="ctrlGrid" class="index-layout-left-ctrl" draggable="true" @dragstart="ctrlDragStart($event)">
                        <Icon type="ios-gear"></Icon>
                        <span>Grid 栅格</span>
                    </p>
                    <p slot="content" id="ctrlArea" class="index-layout-left-ctrl" draggable="true" @dragstart="ctrlDragStart($event)">
                        <Icon type="ios-gear"></Icon>
                        <span>Area 区域</span>
                    </p>
                    <p slot="content" id="ctrlText" class="index-layout-left-ctrl" draggable="true" @dragstart="ctrlDragStart($event)">
                        <Icon type="ios-gear"></Icon>
                        <span>Textbox 单行文本</span>
                    </p>
                    <p slot="content" id="ctrlTexts" class="index-layout-left-ctrl" draggable="true" @dragstart="ctrlDragStart($event)">
                        <Icon type="ios-gear"></Icon>
                        <span>Textarea 多行文本</span>
                    </p>
                    <p id="ctrlButton" ctrlType="sp-button" slot="content" class="index-layout-left-ctrl" draggable="true" @dragstart="ctrlDragStart($event)">
                        <Icon type="ios-gear"></Icon>
                        <span>Button 按钮</span>
                    </p>
                </Panel>
                <Panel name="2">
                    自定义控件
                    <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                </Panel>
            </Collapse>
            </Col>
            <Col :span="spanRight" class="index-layout-right">
            <div class="index-layout-right-header">
                <div class="index-layout-right-header-btns" @drop='ctrlpanelDrop($event)' @dragover='ctrlpanelDragover($event)'>
                    <Button type="primary" icon="refresh" @click="ctrlpanelReset">重置</Button>
                    <Button type="primary" icon="checkmark">保存</Button>
                </div>
            </div>
            <div class="index-layout-right-content">
                <!-- {{SPLib.dataModels['sp-button']}} -->
                <div class="index-layout-right-ctrlpanel" :style="{'height':ctrlpanelHeight,'display':ctrlpanelState}">
                    <template v-for="(n,i) in ctrls">
                        <sp-gridS :item='n' :key="i"></sp-gridS>
                    </template>
                </div>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import SPLib from "../components/splib.js";

export default {
    data() {
        return {
            dragDataTransferID: "drag-tran-ctrlId", // 传递拖拽内容的ID标识
            hearderHeight: 64, // 头部高度（对应CSS中的数值）
            accordionActivity: "1",
            ctrlpanelHeight: "0px",
            ctrlpanelState: "none",
            ctrlpanelContent: "",
            spanLeft: 4,
            spanRight: 20,
            defaultCtrls:[
            ],
            formItem:{
                input:"90234"
            },
            btnItem: SPLib.dataModels['sp-button'],
            ctrls:[
                {
                    type:"sp-gridS",
                    cols:[
                        {
                            span:12,
                            id: 'col1',
                            children:[
                                // {
                                //     type:"sp-input",
                                //     label:"姓名",
                                //     value:"超级飞侠",
                                //     placeholder:"请输入"
                                // }
                            ]
                        },
                        {
                            span:12,
                            id: 'col2',
                            children:[
                                // {
                                //     type:"sp-input",
                                //     label:"姓名",
                                //     value:"超级飞侠2",
                                //     placeholder:"请输入"
                                // }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        onClick: function() {
            alert("Test");
        },
        // 清空控件面板内容
        ctrlpanelReset: function() {
            this.ctrls = [];
        },
        resolver:function(){
            let result = this.SPResolver.processor(this.ctrls);
            return result;
        },

        // 开始拖拽：传递被拖拽控件的ID
        ctrlDragStart: function(evt) {
            var id = evt.target.id;
            evt.dataTransfer.setData(this.dragDataTransferID, id);
        },
        ctrlpanelDrop: function(evt) {
            evt.preventDefault();
            var id = evt.dataTransfer.getData(this.dragDataTransferID);
            var obj = evt.target.type; // 判断当前停留的容器，并开始遍历 ctrls ，找到对应的 type ，然后注入type值，如下：

            console.log(evt);
            // 如果是第一个组件，则使用默认，并启用type值
            // this.ctrls.push(JSON.parse(JSON.stringify(this.defaultCtrls[0])));

            evt.dataTransfer.clearData(this.dragDataTransferID);
        },
        ctrlpanelDragover: function(evt) {
            evt.preventDefault();
        }
    },
    mounted: function() {
        // 调整滚动条
        this.ctrlpanelHeight = window.document.body.offsetHeight - this.hearderHeight + "px";
        this.ctrlpanelState = "block";
    }
}

</script>
