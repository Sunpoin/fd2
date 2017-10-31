<template>
    <div>
        <template v-if="item.type == 'sp-input'">
            <FormItem :label="item.label" :label-width="80" >
                <Input :v-model="item.value" :placeholder="item.placeholder"></Input>
            </FormItem>
        </template>
    </div>
</template>

<script>
export default {
    name: "sp-input",
    props: ["item"],
    data() {
        return {
            dataModel: {
                type: this.name,
                label:"姓名",
                value:"超级飞侠",
                placeholder:"请输入"
            }
        }
    },
    methods: {
    }
}
</script>