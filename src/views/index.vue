<style scoped>
@import '../styles/index.css';
</style>
<template>
    <div class="index-layout" @click="onClickDoc">
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
            <Col :span="spanCenter" class="index-layout-center">
            <div class="index-layout-center-header">
                <div class="index-layout-center-header-btns" @drop='ctrlpanelDrop($event)' @dragover='ctrlpanelDragover($event)'>
                    <Button type="primary" icon="refresh" @click="ctrlpanelReset">重置</Button>
                    <Button type="primary" icon="checkmark">保存</Button>
                    <Button type="primary" icon="android-open" @click="onPreview">预览</Button>
                    <Button type="text" class="index-btnsetup" @click="onShowSetupPanel">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
            </div>
            <div class="index-layout-center-content" v-on:showMenu="onShowMenu(x, y, onMenuEdit, onMenuDelete)">
                <!-- {{SPLib.dataModels['sp-button']}} -->
                <div class="index-layout-center-ctrlpanel" :style="{'height':ctrlpanelHeight,'display':ctrlpanelState}">
                    <sp-gridS :item='ctrls.content'></sp-gridS>
                </div>
            </div>
            </Col>
            <Col :span="spanRight" >
            <div :hidden="spanRight < 4">
                <div class="index-layout-right-header">属性</div>
                <sp-attrsS :item="setupItem" :attrs="setupAttrs"></sp-attrsS>
            </div>
            </Col>
        </Row>

        <div class="index-menu" v-bind:style="{left: menuData.menuLeft + 'px', top: menuData.menuTop + 'px'}" :hidden="!menuData.isShowMenu">
            <a @click="menuData.onMenuEdit">
                编辑
            </a>
            <a @click="menuData.onMenuDelete" style="border-top: 1px solid #c3c3c3">
                删除
            </a>
        </div>
    </div>
</template>
<script>
import SPLib from "../components/splib.js";
import Util from "../libs/util.js";
import SPSetup from "../comsetup/spSetup.js";
import SPAttrs from "../comsetup/spAttrs.js";

export default {
    data() {
        return {
            hearderHeight: 64, // 头部高度（对应CSS中的数值）
            accordionActivity: "1",
            ctrlpanelHeight: "0px",
            ctrlpanelState: "none",
            ctrlpanelContent: "",
            spanLeft: 4,
            spanCenter: 16,
            spanRight: 4,
            menuData: {
                isShowMenu: false,
                menuLeft: 0,
                menuTop: 0,
                onMenuEdit: function() {},
                onMenuDelete: function() {}
            },
            defaultCtrls: {
                content: {
                    type:"sp-gridS",
                    id: Util.newGuid(),
                    cols:[
                        {
                            span: 24,
                            children:[
                            ]
                        }
                    ]
                }
            },
            formItem:{
                input:"90234"
            },
            testData: SPSetup.preCtrls,
            btnItem: SPLib.dataModels['sp-button'],
            ctrls: SPSetup.indexCtrls != null? SPSetup.indexCtrls: {
                content: {
                    type:"sp-gridS",
                    id: Util.newGuid(),
                    cols:[
                        {
                            span: 24,
                            children:[
                            ]
                        }
                    ]
                }
            },
            setupItem: {},  //配置的数据
            setupAttrs: []  //配置的属性
        }
    },
    created: function() {
        SPSetup.Bus.$on('showMenu', this.onShowMenu);
        SPSetup.Bus.$on('clickItem', this.onClickItem);
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        // 清空控件面板内容
        ctrlpanelReset: function() {
            this.ctrls = this.defaultCtrls;
        },
        resolver:function() {
            let result = this.SPResolver.processor(this.ctrls);
            return result;
        },
        // 开始拖拽：传递被拖拽控件的ID
        ctrlDragStart: function(evt) {
            var id = evt.target.id;
            evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferID, id);
            evt.dataTransfer.setData(SPSetup.dragFlag.dragDataTransferType, "new");
        },
        ctrlpanelDrop: function(evt) {
            evt.preventDefault();
            var id = evt.dataTransfer.getData(this.dragDataTransferID);
            var obj = evt.target.type; // 判断当前停留的容器，并开始遍历 ctrls ，找到对应的 type ，然后注入type值，如下：

            //console.log(evt);
            // 如果是第一个组件，则使用默认，并启用type值
            // this.ctrls.push(JSON.parse(JSON.stringify(this.defaultCtrls[0])));

            evt.dataTransfer.clearData(this.dragDataTransferID);
        },
        ctrlpanelDragover: function(evt) {
            evt.preventDefault();
        },
        onClickDoc: function() {
            this.menuData.isShowMenu = false;
        },
        onShowMenu: function(x, y, onMenuEdit, onMenuDelete) {
            this.menuData = {
                isShowMenu: true,
                menuLeft: x,
                menuTop: y,
                onMenuEdit: onMenuEdit,
                onMenuDelete: onMenuDelete
            };
        },
        onClickItem: function(itemData) {
            this.setupItem = itemData;
            this.setupAttrs = SPAttrs[itemData.type];
        },
        onShowSetupPanel: function() {
            if(this.spanRight === 4) {
                this.spanCenter = 20;
                this.spanRight = 0;
            } else {
                this.spanCenter = 16;
                this.spanRight = 4;
            }
        },
        getContentData: function(item) {
            let ctrl = item.content;
            if (ctrl.type === "sp-gridS") {
                let gridObj = {};
                gridObj.id = ctrl.id;
                gridObj.type = "sp-grid";
                gridObj.cols = [];

                for (let i = 0; i < ctrl.cols.length; i++) {
                    let colObj = {};
                    colObj.span = ctrl.cols[i].span;
                    colObj.children = [];
                    for (let j = 0; j < ctrl.cols[i].children.length; j++) {
                        let child = this.getContentData(ctrl.cols[i].children[j]);
                        colObj.children.push(child);
                    }

                    gridObj.cols.push(colObj);
                }

                return gridObj;
            } else {
                return ctrl;
            }
        },
        onPreview: function() {
            SPSetup.indexCtrls = this.ctrls;
            SPSetup.preCtrls = this.getContentData(this.ctrls);
            //this.ctrls = SPSetup.preCtrls;
            //SPSetup.preCtrls = {a : 1};
            console.log(SPSetup.preCtrls);
            this.$router.push({ path: 'preview' });
            // router.go(1);
        }
    },
    mounted: function() {
        // 调整滚动条
        this.ctrlpanelHeight = window.document.body.offsetHeight - this.hearderHeight + "px";
        this.ctrlpanelState = "block";
    }
}

</script>
