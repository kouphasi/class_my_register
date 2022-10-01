<template>
    <div class="app">
        <div class="head">あなたの情報を入力！</div>
        <div class="bottom2"></div>
        <div class="set">
            <div class="question">団体名(正式名称)</div>
            <el-input v-model="input_circle" class="input" placeholder="サークル名" />
        </div>
        <br>
        <div class="set">
            <div class="question">名前</div>
            <el-input v-model="input_name" class="input" placeholder="上智  太郎" />
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
                        </ul>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <el-button type="success" v-on:click="add_simple_dates" round>add</el-button>
                <el-button v-on:click="add_copied_dates" round>copy</el-button>
                <el-button type="danger" v-on:click="delete_days" round>delete</el-button>
            </div>
        </div>
        <br>
        <el-button type="primary" v-on:click="execute">実行</el-button>
        <!-- <el-button type="primary" v-on:click="change_page">change page</el-button> -->
    </div>
</template>
<script>
import { ElMessage, ElMessageBox } from 'element-plus'
// import router from '../router'
// import { useRouter } from "vue-router"
// const router = useRouter()
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
        change_page() {
            this.$router.push({ path: "/login" })
        },

        execute() {
            let obj = {
                club_data: {
                    "TEXT": {
                        "CLUB_NAME": this.input_circle,
                        "REPRESENT_NAME": this.input_name,
                        "STUDENT_NUMBER": this.input_id,
                        "MAIL": this.input_mail,
                        "TEL": this.input_phone,
                    },
                    schedule: {
                        "FORM": this.input_url,
                        "YEAR": String(this.input_year),
                        "MONTH": String(this.input_months),
                        "SCHEDULE": []
                    }
                }

            }
            let dates = []
            for (let i = 0; i < this.input_details.length; i++) {
                const sche = {
                    "DAY": this.input_details[i].input_day,
                    "CLASS_ROOM": this.input_details[i].input_class,
                    "TIME": this.input_start_time + "~" + this.input_end_time,
                    "NOTICES": this.input_comment,
                }
                dates.push(sche)
            }
            obj = { ...obj, dates }
            console.log(obj)
            this.$router.push({ path: "/execute", params: { obj: obj } })
        },
    },
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