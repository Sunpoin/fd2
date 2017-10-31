<template>
    <div>
        <template v-if="item.type == 'sp-button'">
            <Button :id="item.id" type="primary" @click="onClick" :style="styleObject" :icon="item.icon" :size="item.size" :enable="item.enable" :long="item.long == 'true'? '' : null" :disabled="item.enable == 'enable'? null : ''">{{item.name}}</Button>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'sp-button',
        props: ['item'],
        data() {
            return {
                dataModel: {
                    type: this.name,
                    icon: "",
                    name: "Button",
                    clickStr: ""
                }
            }
        },
        computed: {
            styleObject: function () {
                return {
                    'font-size': this.item.fontSize + 'px',
                    color: this.item.color
                };
            }
        },
        methods: {
            onClick: function() {
                try  {
                    eval(this.item.clickStr);
                } catch (exception) {
                    console.error("按钮点击事件执行错误：", exception);
                }
            }
        }
    }
 </script>