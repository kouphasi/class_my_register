<template>
    <div>
        <h1>教室申請アプリ</h1>
        <div class="set">
            <div>ID</div>
            <el-input type="text" name="" id="form" class="form" v-model="user_id" />
        </div>
        <div class="set">
            <div>パスワード</div>
            <el-input v-model="user_pass" type="password" placeholder="Please input password" show-password />
        </div>
        <br>
        <div class="set">
            <el-alert v-if="wrong" title="*IDまたはパスワードが間違えています" type="warning" />
            <el-alert v-if="have_error" title="*エラーが発生しました、管理者にお問い合わせください" type="error" />
        </div>
        <!-- <div class="warn" v-if="have_error">*エラーが発生しました、管理者にお問い合わせください</div> -->
        <!-- <div>{{ error_content }}</div> -->
        <el-button type="primary" plain v-on:click="login">ログイン</el-button>
        <!-- <button v-on:click="change_page">ページ遷移</button>
        <button v-on:click="check">ページ遷移</button> -->
    </div>
</template>
<script>
import { login_check, check_api } from '@/functions/req';
export default {
    data() {
        return {
            user_id: "",
            user_pass: "",
            wrong: false,
            have_error: false,
            error_content: "",
        }
    },
    methods: {
        async login() {
            const obj = {
                "id": this.user_id,
                "pass": this.user_pass
            }
            const response = await login_check(obj)
            this.error_content = response
            console.log(response)
            if (response.error) {
                this.have_error = true
            }
            if (response.check) {
                // console.log("before push")
                try {
                    this.$router.push({ path: "/main" })
                } catch (e) {
                    console.log(e)
                }

            } else {
                this.wrong = true
            }
        },
        change_page() {
            this.$router.push({ path: "/main" })
        },
        check() {
            check_api()
        }
    },

}
</script>
<style>
.warn {
    color: red;
}

.form {
    width: 50%;
}
</style>