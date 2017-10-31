<style scoped>
</style>

<template>
    <div class="index-layout" >
        <sp-grid :item='ctrls'></sp-grid>
        <!-- <template v-for="(n, i) in ctrls">
            <component :is="n.content.type" :id="n.content.id" :item="n.content" :key="i"></component>
        </template> -->
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
            ctrls: SPSetup.preCtrls
        }
    },
    created: function() {
    },
    computed: {
    },
    methods: {
    }
}

</script>
