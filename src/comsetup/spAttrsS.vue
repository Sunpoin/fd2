<style scoped>
    .spAttrSRow {
        border-bottom: 1px solid #c3c3c3;
        padding: 0 4px;
    }

    .spAttrSLabel {
        display: block;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        border-right: 1px solid #c3c3c3;
    }

    .spAttrSInput {
        width: 100%;
        border: none;
        padding-left: 5px;
        /* border-bottom: 1px solid #c3c3c3; */
        height: 30px;
        line-height: 30px;
    }
    
    .spAttrSelect {
        padding: 2px;
    }
</style>

<template>
<div>
    <template v-for="(n, i) in attrs">
        <Row type="flex" :key="i" class="spAttrSRow">
            <Col :span="8" class="">
                <label class="spAttrSLabel">{{n.label}}</label>
            </Col>
            <Col :span="16">
                <div v-if="n.type === 'input'">
                    <input v-model="item[n.name]" :value="item[n.name]" :placeholder="n.placeholder" class="spAttrSInput"></input>
                </div>
                <div v-else-if="n.type === 'select'" class="spAttrSelect">
                <Select v-model="item[n.name]" size="small">
                    <Option v-for="opt in n.opts" :value="opt.value" :key="opt.value">{{ opt.label }}</Option>
                </Select>
                </div>
            </Col>
        </Row>
    </template>
</div>
</template>

<script>
import SPSetup from "./spSetup.js";

export default {
    props: ['item', 'attrs'],
    data() {
        return {
            cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ]
        }
    },
    methods: {
        
    }
}

</script>