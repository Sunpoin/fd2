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
        <template v-if="item.type === 'sp-grid'">
        <div>
            <Row>
                <template v-for="(colItem, colIndex) in item.cols">
                    <Col :span="colItem.span" :colIndex="colIndex" :key="colIndex" >
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
        
    }
}


</script>