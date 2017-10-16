<template>
    <div>
        <template v-if="item.type == 'sp-button'">
            <Button type="primary" :icon="item.icon" @click="item.onClick">{{item.name}}</Button>
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
                    onClick: function(){
                        alert("This is a button.");
                    }
                }
            }
        },
        methods: {
        }
    }
 </script>