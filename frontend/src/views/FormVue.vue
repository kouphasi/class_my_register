<template>
    <div class="app">
        <div class="head">あなたの情報を入力！</div>
        <div class="bottom2"></div>
        <div class="set">
            <div class="question">団体名(正式名称)</div>
            <el-input v-model="input_name" class="input" placeholder="サークル名" />
        </div>
        <div class="set">
            <div class="question">名前</div>
            <el-input v-model="input_name" class="input" placeholder="上智  太郎" />
        </div>
        <div class="set">
            <div class="question">学生番号</div>
            <el-input v-model="input_name" class="input" placeholder="A1234567" />
        </div>
        <div class="set">
            <div class="question">E-mailアドレス</div>
            <el-input v-model="input_name" class="input" placeholder="english.speaking@society.com" />
        </div>
        <div class="set">
            <div class="question">電話番号</div>
            <el-input v-model="input_name" class="input" placeholder="012-3456-7890" />
        </div>
        <div class="set">
            <div class="question">申請Form URL</div>
            <el-input v-model="input_name" class="input" placeholder="https://sophiaess2021.wixsite.com/sophiaess" />
        </div>

        <div class="head">申請教室</div>
        <br>
        <el-button type="primary" v-on:click="delete_name">実行</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input_name: ""
        }
    },
    methods: {
        delete_name() {
            this.input_name = ""
        }
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Wendy+One&display=swap');

.question {
    font-family: 'Wendy One', sans-serif;
}

.app {
    align-items: center;
    /* margin: auto; */
}


.set {
    align-items: center;
    width: 50%;
    margin: auto
}

.head {
    font-weight: 500;
    font-size: larger;
    text-decoration: underline;
}
</style>