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
    methods: {
    }
}
</script>