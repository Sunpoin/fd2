import Vue from "vue";

let SPSetup = function () {
    
}

/** 拖拽操作的标识 */
SPSetup.dragFlag = {
    dragDataTransferID: "drag-tran-ctrlId",             // 传递拖拽内容的ID标识
    dragDataTransferType: "drag-tran-type",             // 传递拖拽标识，new：新建 move：移动
    dragDataTransferColIndex: "drag-tran-colIndex",     // 传递拖拽内容的colIndex
    dragDataTransferChildIndex: "drag-tran-childIndex", // 传递拖拽内容的childIndex
}

/** 用于传递拖拽组件的对象数据 */
SPSetup.dragItem = {};

/** 全局消息总线 */
SPSetup.Bus = new Vue();

SPSetup.preCtrls = [];
SPSetup.indexCtrls = null;

export default SPSetup;