<template>
    <div>
        <el-steps :active="active" align-center>
            <el-step title="Step 1" description="開始" />
            <el-step title="Step 2" v-bind:description="message" />
            <el-step title="Step 3" description="終了" />
            <!-- <el-step title="Step 4" description="Some description" /> -->
        </el-steps>
        <el-button style="margin-top: 12px" @click="next">Next step</el-button>
        <!-- <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button> -->
    </div>
</template>
<script>
// import { ref } from 'vue'
// import { Eleme } from '@element-plus/icons-vue'
// const active = ref(0)

export default {
    props: ["nowsData"],
    data() {
        return {
            active: 1,
            // Eleme
            message: "hello"
        }
    },
    methods: {
        next() {
            this.active++
        }
    },
}
</script>
<style>
pre.commandline {

    /*fontの指定（google web font）*/
    font-family: 'Source Code Pro';

    /*境界との位置関係を調整*/
    margin: 0px 0px 0px 0px;
    padding: 5px 0px 5px 5px;
    border: 1px solid #7a7a7a;

    /*色*/
    background-color: #000000;
    color: greenyellow;

    /*角を丸くする*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    /*影をつける（外と中の両方）*/
    -webkit-box-shadow: 3px 3px 5px 0 #aaa, 1px 1px 5px 0 rgba(0, 0, 0, 0.3) inset;
    -moz-box-shadow: 3px 3px 5px 0 #aaa, 1px 1px 5px 0 rgba(0, 0, 0, 0.3) inset;
    box-shadow: 3px 3px 5px 0 #aaa, 1px 1px 5px 0 rgba(0, 0, 0, 0.3) inset;

    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>