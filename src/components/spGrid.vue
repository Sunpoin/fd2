<template id="spGrid">
    <Form>
        <template v-if="item.type == 'sp-grid'">
            <Row>
                <template v-for="(colItem, colIndex) in item.cols">
                    <Col :span="colItem.span" :key="colIndex">
                    <template v-for="(childItem, childIndex) in colItem.children">
                        <component :is="childItem.type" :item="childItem" :key="childIndex"></component>
                    </template>
                    </Col>
                </template>
            </Row>
        </template>
    </Form>
</template>

<script>
export default {
    name: "sp-grid",
    props: ["item"],
    data() {
        return {
            construct: {
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
    }
}


</script>