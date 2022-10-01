<template>
    <div class="app">
        <div class="head">あなたの情報を入力！</div>
        <div class="bottom2"></div>
        <div class="set">
            <div class="question">団体名(正式名称)</div>
            <el-input v-model="input_circle" class="input" placeholder="サークル名" />
            <!-- <el-alert v-if="!check_club1.flag" v-bind:title="check_club1.comment" type="error" /> -->
        </div>
        <br>
        <div class="set">
            <div class="question">名前</div>
            <el-input v-model="input_name" class="input" placeholder="上智  太郎" />
            <!-- <el-alert v-if="!check_name1.flag" v-bind:title="check_name1.comment" type="error" /> -->
        </div>
        <br>
        <div class="set">
            <div class="question">学生番号</div>
            <el-input v-model="input_id" class="input" placeholder="A1234567" />
        </div>
        <br>
        <div class="set">
            <div class="question">E-mailアドレス</div>
            <el-input v-model="input_mail" class="input" placeholder="english.speaking@society.com" />
        </div>
        <br>
        <div class="set">
            <div class="question">電話番号</div>
            <el-input v-model="input_phone" class="input" placeholder="012-3456-7890" />
        </div>
        <br>
        <div class="set">
            <div class="question">申請Form URL</div>
            <el-input v-model="input_url" class="input" placeholder="https://sophiaess2021.wixsite.com/sophiaess" />
        </div>
        <br><br>
        <div class="head">申請教室</div>
        <div class="set">
            <div class="question">年(西暦)</div>
            <el-input-number v-model="input_year" :min="2022" :max="3000" @change="handleChange" />
        </div>
        <br>
        <div class="set">
            <div class="question">月</div>
            <el-input-number v-model="input_months" :min="1" :max="12" @change="handleChange" />
        </div>
        <div class="check list">
            <h3>教室選択の時の注意</h3>
            <ul>
                <li class="left">教室名は{施設略称}-{教室番号}の形式で入力してください</li>
                <li class="left">施設略称は、1:1号館教室、11:11号館教室、14:14号館教室、k:紀尾井坂ビル教室</li>
                <li class="left">例えば、11号館505教室は「11-505」、紀尾井坂ビル202教室は「k-202」</li>
                <li class="left">開始/終了時刻に関してはHH:mmの形式(時間は24時間表記)で入力してください</li>
                <li class="left">例えば、13時35分は「13:35」、午前9時5分は「9:05」</li>
            </ul>
        </div>
        <div class="list">
            <div v-for="details in input_details" v-bind:key="details">
                <div class="lis">
                    <div>
                        <div class="num">{{ details.id }}.</div>
                        <ul>
                            <li>
                                <div class="days details">
                                    <div class="question">日：</div>
                                    <br>
                                    <el-input-number v-model="details.input_day" :min="1" :max="31"
                                        @change="handleChange" />
                                </div>
                            </li>
                            <li>
                                <div class="days details">
                                    <div class="question">時間：</div>
                                    <div class="input2">
                                        <el-input v-model="details.input_start_time" class="input" placeholder="開始時刻" />
                                    </div>
                                    <div>～</div>
                                    <div class="input2">
                                        <el-input v-model="details.input_end_time" class="input" placeholder="終了時刻" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="days details">
                                    <div class="question">申請教室：</div>
                                    <div class="input1">
                                        <el-input v-model="details.input_class" class="input" placeholder="教室名" />
                                    </div>
                                </div>

                            </li>
                            <li>
                                <div class="days details">
                                    <div class="question">特記事項：</div>
                                    <div class="input3">
                                        <el-input v-model="details.input_comment" class="input" placeholder="" />
                                    </div>
                                </div>
                            </li>
                            <el-alert class="error"
                                v-if="!check_time(details.input_start_time,details.input_end_time)+!check_class(details.input_class).flag"
                                v-bind:title="check_class(details.input_class).comment" type="error" />
                        </ul>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <el-button type="success" v-on:click="add_simple_dates" v-bind:disabled="!entrying" round>add
                </el-button>
                <el-button v-on:click="add_copied_dates" v-bind:disabled="!entrying" round>copy</el-button>
                <el-button type="danger" v-on:click="delete_days" v-bind:disabled="!entrying" round>delete</el-button>
            </div>
        </div>
        <br>
        <el-button v-if="entrying" type="primary" v-on:click="execute">実行</el-button>
        <el-button v-else type="primary" :loading-icon="Eleme" loading>実行中</el-button>
        <!-- <el-button type="primary" v-on:click="check_club">change page</el-button> -->
    </div>
</template>
<script>
import { ElMessage, ElMessageBox } from 'element-plus'
// import router from '../router'
// import { useRouter } from "vue-router"
// const router = useRouter()
import { entry } from '@/functions/req'
const reg_exp = {//正規表現とエラーメッセージ
    "CLUB_NAME": [".*", ""],
    "REPRESENT_NAME": [".+　.+", "＊姓と名の間に全角スペースを入れてください"],
    "STUDENT_NUMBER": ["^[ABCDE][0-9]{7}$", "＊学生番号を半角で正しく入力してください"],
    "MAIL": [".+@.+", "＊メールアドレスを正しく入力してください"],
    "TEL": [/^0\d{2,3}-\d{1,4}-\d{4}$/, "＊電話番号(ハイフンあり)を半角で正しく入力してください"],
    "FORM_URL": [/https?:\/\/[\w!?/+\-_~;.,*&@#$%()'[\]]+/, "＊URLを正しく入力してください"],
    "YEAR": ["^[0-9]{4}$", "＊年を半角数字で入力してください(ex:2022年なら「2022」)"],
    "MONTH": ["^[1-9]|1[0-2]$", "＊月を半角数字で入力してください(ex:6月なら「6」)"],
    "DAY": ["^[1-9]|[1-2][0-9]|3[0-1]$", "＊注意事項に従い、正しく入力してください"],
    "CLASS_ROOM": [/^(1|11|14|k)-/, "＊注意事項に従い、正しく入力してください"],
    "TIME": ["^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", "＊注意事項に従い、時間を正しく入力してください"]
}
export default {
    data() {
        return {
            input_circle: "",
            input_name: "",
            input_id: "",
            input_mail: "",
            input_phone: "",
            input_url: "",
            input_year: 2022,
            input_months: 1,
            input_details: [{
                id: 1,
                input_day: 1,
                input_class: "",
                input_start_time: "",
                input_end_time: "",
                input_comment: "",
            }],
            entrying: true,
            error_content: false
        }
    },
    methods: {
        delete_name() {
            this.input_name = ""
        },
        add_simple_dates() {
            const num = this.input_details.length
            this.input_details.push(
                {
                    id: num + 1,
                    input_day: 1,
                    input_class: "",
                    input_start_time: "",
                    input_end_time: "",
                    input_comment: "",
                }
            )
        },
        add_copied_dates() {
            const num = this.input_details.length
            const last = this.input_details[num - 1]
            this.input_details.push(
                {
                    id: num + 1,
                    input_day: last.input_day,
                    input_class: last.input_class,
                    input_start_time: last.input_start_time,
                    input_end_time: last.input_end_time,
                    input_comment: last.input_comment,
                }
            )
        },
        delete_days() {
            const num = this.input_details.length
            if (num <= 1) {
                ElMessage({
                    message: 'Warning: これ以上は削除できません',
                    type: 'warning',
                })
            } else {
                ElMessageBox.confirm(
                    `${num}.の日程を削除しますか?`,
                    'Warning',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                )
                    .then(() => {
                        this.input_details.pop()
                        ElMessage({
                            type: 'success',
                            message: 'Delete completed',
                        })
                    }
                    )
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: 'Delete canceled',
                        })
                    })
            }
        },
        async change_page() {
            return 1 + 1
        },
        form_check(value, key) {
            let flg = true;
            let regex = new RegExp(reg_exp[key][0]);
            let comment = ""
            if (value === "") {//空白チェック
                comment = "＊入力必須項目です";
                flg *= false;
            } else {//ここの情報チェック
                if (regex.test(value)) {//個別の入力書式確認
                    comment = "";
                    flg *= true;
                } else {//マッチしていなければ
                    comment = `${reg_exp[key][1]}`;
                    flg *= false;
                }
            }
            const obj = {
                flag: flg,
                comment: comment
            }
            return obj
        },
        form_check1(value, key) {
            let flg = true;
            let regex = new RegExp(reg_exp[key][0]);
            let comment = ""

            if (regex.test(value)) {//個別の入力書式確認
                comment = "";
                flg *= true;
            } else {//マッチしていなければ
                comment = `${reg_exp[key][1]}`;
                flg *= false;
            }

            const obj = {
                flag: flg,
                comment: comment
            }
            return obj
        },

        async execute() {
            this.entrying = false
            let dates = []
            for (let i = 0; i < this.input_details.length; i++) {
                const sche = {
                    "DAY": this.input_details[i].input_day,
                    "CLASS_ROOM": this.input_details[i].input_class,
                    "TIME": this.input_details[i].input_start_time + "~" + this.input_details[i].input_end_time,
                    "NOTICES": this.input_details[i].input_comment,
                }
                dates.push(sche)
            }
            const obj = {
                club_data: {
                    "TEXT": {
                        "CLUB_NAME": this.input_circle,
                        "REPRESENT_NAME": this.input_name,
                        "STUDENT_NUMBER": this.input_id,
                        "MAIL": this.input_mail,
                        "TEL": this.input_phone,
                    }
                },
                schedule: {
                    "FORM_URL": this.input_url,
                    "YEAR": String(this.input_year),
                    "MONTH": String(this.input_months),
                    "SCHEDULE": dates
                }
            }


            console.log(obj)
            const response = await entry(obj)
            this.error_content = response
            this.entrying = true
            if (response.error) {
                ElMessage({
                    message: 'Warning: エラーが発生しました',
                    type: 'warning',
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: '完了しました',
                    type: 'success',
                })
            }
        },
        // check_club() {
        //     const check = this.form_check(this.input_circle, "CLUB_NAME")
        //     // const check = this.change_page()
        //     return check
        // }
    },
    computed: {
        check_club() {
            const check = this.form_check(this.input_circle, "CLUB_NAME")
            // const check = this.change_page()
            return check
        },
        check_club1() {
            const check = this.form_check1(this.input_circle, "CLUB_NAME")
            // const check = this.change_page()
            return check
        },
        check_name() {
            const check = this.form_check(this.input_circle, "REPRESENT_NAME")
            // const check = this.change_page()
            return check
        },
        check_name1() {
            const check = this.form_check1(this.input_circle, "REPRESENT_NAME")
            // const check = this.change_page()
            return check
        },
        check_id() {
            const check = this.form_check(this.input_circle, "STUDENT_NUMBER")
            // const check = this.change_page()
            return check
        },
        check_mail() {
            const check = this.form_check(this.input_circle, "MAIL")
            // const check = this.change_page()
            return check
        },
        check_phone() {
            const check = this.form_check(this.input_circle, "TEL")
            // const check = this.change_page()
            return check
        },
        check_url() {
            const check = this.form_check(this.input_circle, "FORM_URL")
            // const check = this.change_page()
            return check
        },
        check_class() {
            return (inputs) => {
                const check = this.form_check(inputs, "CLASS_ROOM")
                console.log(inputs)
                return check
            }
        },
        check_time() {
            return (inputs1, inputs2) => {
                const check1 = this.form_check(inputs1, "TIME")
                const check2 = this.form_check(inputs2, "TIME")
                const check = {
                    flag: check1.flag * check2.flag,
                    message: check1.message
                }
                return check
            }
        },
    }
}
</script>
<style>
/* @import url('https://fonts.googleapis.com/css2?family=Wendy+One&display=swap');

.question {
    font-family: 'Wendy One', sans-serif;
} */

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

.check {
    background-color: rgba(255, 213, 0, 0.53);
    border-radius: 15px;
}

.list {
    width: 70%;
    margin: auto;
}

.left {
    text-align: left;
}

.details {
    display: flex;
    align-items: center;
}

.input1 {
    width: 50%;
}

.input2 {
    width: 30%;
}

.input3 {
    width: 70%
}

.lis {
    border: 0.3em solid;
    padding-left: 8%;
    border-color: rgba(50, 224, 255, 0.473);
}

.buttons {
    display: flex;
    justify-content: space-around;
}

.num {
    display: flex;
}
</style>