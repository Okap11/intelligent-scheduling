<template>
  <div class="main">
    <div class="title">我的请假</div>
    <div class="leave_btn">
      <el-button type="primary" size="large" @click="Visible"
        >我要请假</el-button
      >
    </div>
    <div class="statistics">
      <div class="Rest">
        <div
          style="
            margin-top: 10px;
            margin-left: 35px;
            align-items: center;
            display: flex;
          "
        >
          <el-progress
            type="circle"
            :show-text="false"
            :percentage="getLeave(my_compensatory_leave, 16)"
            :width="105"
            color="#15C0E6"
            :stroke-width="4"
            :format="format"
          />
          <div class="text_box_one">
            <p class="text_one">{{ my_compensatory_leave }}</p>
          </div>
        </div>
        <div class="statistics-font">调休</div>
        <div class="statistics-bottom-font">
          {{ my_compensatory_leave }} /16天可用
        </div>
      </div>
      <div class="sick_leave">
        <div
          style="
            margin-top: 10px;
            margin-left: 35px;
            align-items: center;
            display: flex;
          "
        >
          <el-progress
            type="circle"
            :show-text="false"
            :percentage="getLeave(my_sick_leave, 12)"
            :width="105"
            color="#F65160"
            :stroke-width="4"
            :format="format"
          />
          <div class="text_box_two">
            <p class="text_two">{{ my_sick_leave }}</p>
          </div>
        </div>
        <div class="statistics-font">病假</div>
        <div class="statistics-bottom-font">{{ my_sick_leave }} /12天可用</div>
      </div>
      <div class="Leave">
        <div
          style="
            margin-top: 10px;
            margin-left: 35px;
            align-items: center;
            display: flex;
          "
        >
          <el-progress
            type="circle"
            :show-text="false"
            :percentage="getLeave(my_leave_absence, 6)"
            :width="105"
            color="#6D5DD3"
            ::stroke-width="4"
            :format="format"
          />
          <div class="text_box_three">
            <p class="text_three">{{ my_leave_absence }}</p>
          </div>
        </div>
        <div class="statistics-font">事假</div>
        <div class="statistics-bottom-font">
          {{ my_leave_absence }} /6天可用
        </div>
      </div>
    </div>

    <div class="title">提交记录</div>
    <div class="all_recording">
      <el-empty
        description="暂无数据"
        v-if="noteObj.length == 0"
        class="empty"
      ></el-empty>
      <div class="Recording" v-for="(val, index) in noteObj" :key="index">
        <div class="type">
          <div class="Recording_title">请求类型</div>

          <div class="Recording_content" v-if="val.type == '病假'">
            <div class="Recording_icon">
              <svg
                t="1681021439065"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1845"
                data-spm-anchor-id="a313x.7781069.0.i4"
                width="15"
                height="15"
              >
                <path
                  d="M739.555556 0a284.444444 284.444444 0 0 1 284.444444 284.444444v455.111112a284.444444 284.444444 0 0 1-284.444444 284.444444H284.444444a284.444444 284.444444 0 0 1-284.444444-284.444444V284.444444a284.444444 284.444444 0 0 1 284.444444-284.444444h455.111112z m-151.04 227.555556l-91.932445 7.224888 9.728 38.456889H306.062222v166.798223l-7.281778-38.968889c-2.844444-14.392889-6.144-30.151111-9.841777-47.217778l-7.964445-36.067556-49.493333 14.506667 5.233778 26.510222c4.437333 23.722667 9.671111 54.727111 15.530666 93.070222l2.616889 16.896 51.2-14.791111 0.284445 37.888c-22.869333 13.653333-44.259556 25.372444-64.113778 35.100445L227.555556 533.902222l16.156444 83.569778c18.375111-10.979556 37.205333-22.584889 56.547556-34.816-9.671111 58.823111-30.151111 106.268444-61.553778 142.279111 15.587556 11.548444 36.010667 31.004444 61.269333 58.481778 12.8-14.449778 28.899556-45.624889 48.355556-93.411556 17.863111-44.145778 27.534222-106.097778 28.899555-185.912889l0.170667-20.309333V338.944h404.935111V273.237333H599.04L588.515556 227.555556z m184.888888 145.92h-374.328888v63.488h151.836444c-0.113778 10.183111-0.568889 20.081778-1.365333 29.752888l-1.422223 14.222223h-146.773333v297.528889h69.063111V653.084444c14.449778 13.198222 29.525333 27.704889 45.112889 43.463112 29.525333-25.6 53.077333-54.784 70.712889-87.438223 18.261333 18.204444 35.384889 35.953778 51.313778 53.134223l15.530666 17.066666 39.594667-41.244444v35.669333c-0.227556 11.889778-3.697778 20.650667-10.467555 26.282667-5.404444 4.551111-13.255111 7.281778-23.495112 8.192l-8.135111 0.341333-15.303111-0.284444c-23.552 0-43.064889-0.568889-58.481778-1.706667l4.437334 16.042667c3.868444 14.961778 8.362667 34.133333 13.368889 57.457777l31.118222 0.113778c29.013333-0.227556 51.825778-1.479111 68.437333-3.697778 22.186667-2.958222 39.025778-10.922667 50.460445-23.893333 9.784889-11.207111 15.36-25.827556 16.725333-43.918222l0.398222-9.329778V480.995556h-139.264l1.592889-21.845334 0.910222-22.186666h148.48V373.475556z m-237.226666 166.570666c-13.198222 41.016889-35.157333 73.614222-65.763556 97.735111V540.046222h65.706667z m156.444444 0v78.791111c-27.818667-23.210667-55.466667-45.169778-82.944-65.991111l3.584-12.8h79.416889z"
                  fill="#80B7F9"
                  p-id="1846"
                ></path>
              </svg>
            </div>
            <div>病假</div>
          </div>

          <div class="Recording_content" v-else-if="val.type == '调休'">
            <div class="Recording_icon">
              <svg
                t="1680854356745"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3297"
                width="15"
                height="15"
              >
                <path
                  d="M504.4224 510.1056m-437.248 0a437.248 437.248 0 1 0 874.496 0 437.248 437.248 0 1 0-874.496 0Z"
                  fill="#80B7F9"
                  p-id="3298"
                ></path>
                <path
                  d="M747.9808 747.264m-202.2912 0a202.2912 202.2912 0 1 0 404.5824 0 202.2912 202.2912 0 1 0-404.5824 0Z"
                  fill="#80B7F9"
                  p-id="3299"
                ></path>
                <path
                  d="M921.1392 642.7136c-35.4304-58.5728-99.7376-97.7408-173.2096-97.7408-111.7184 0-202.2912 90.5728-202.2912 202.2912 0 75.3664 41.216 141.0048 102.3488 175.8208 129.6384-45.056 231.4752-149.248 273.152-280.3712z"
                  fill="#3E8BF8"
                  p-id="3300"
                ></path>
                <path
                  d="M742.7072 842.6496c-10.3424 0-20.3264-3.8912-27.9552-11.008l-54.9888-51.2512c-16.5376-15.4112-17.4592-41.3696-2.048-57.9072 15.4112-16.5376 41.3184-17.4592 57.9072-2.048l23.2448 21.6576 50.3808-60.7232c14.4384-17.408 40.2944-19.8144 57.6512-5.376a40.9344 40.9344 0 0 1 5.376 57.6512l-78.08 94.1568a40.92928 40.92928 0 0 1-28.928 14.7456c-0.768 0.1024-1.6896 0.1024-2.56 0.1024zM511.3344 585.9328H262.9632c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h207.4112v-197.12c0-22.6304 18.3296-40.96 40.96-40.96s40.96 18.3296 40.96 40.96v238.08c0 22.6304-18.3296 40.96-40.96 40.96z"
                  fill="#FFFFFF"
                  p-id="3301"
                ></path>
              </svg>
            </div>
            <div>调休</div>
          </div>

          <div class="Recording_content" v-else>
            <div class="Recording_icon">
              <svg
                t="1681022435963"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2253"
                width="15"
                height="15"
              >
                <path
                  d="M742.6 483.8c30.3 0 60.3 5.9 88.4 17.3V354.9c0-42.2-34.8-76.7-77.3-76.7H621.1v-76.7c0-42.2-34.8-76.7-77.3-76.7H389.1c-42.5 0-77.3 34.5-77.3 76.7v76.7H179.2c-42.5 0-77.3 34.5-77.3 76.7V777c0 42.2 34.8 76.7 77.3 76.7h381.4c-31.2-38.9-50-88-50-141.4 0-126.2 103.9-228.5 232-228.5zM375.3 193h159.5v68.4H375.3V193z"
                  fill="#80B7F9"
                  p-id="2254"
                ></path>
                <path
                  d="M739.8 534.8c-100.7 0-182.3 81.6-182.3 182.3 0 100.7 81.6 182.3 182.3 182.3 100.7 0 182.3-81.6 182.3-182.3 0-100.7-81.6-182.3-182.3-182.3z m96.9 205H722.8c-2 0-3.9-0.5-5.7-1.1-1.8 0.6-3.7 1.1-5.7 1.1-9.4 0-17.1-7.1-17.1-15.8V618.9c0-8.7 7.7-15.8 17.1-15.8 9.4 0 17.1 7.1 17.1 15.8v89.4h108.2c9.4 0 17.1 7.1 17.1 15.8 0 8.7-7.7 15.7-17.1 15.7z"
                  fill="#80B7F9"
                  p-id="2255"
                ></path>
              </svg>
            </div>
            <div>事假</div>
          </div>
        </div>
        <div class="duration">
          <div class="Recording_title_one">期间</div>
          <div class="Recording_content_one">{{ val.time }}</div>
        </div>
        <div class="start_duration">
          <div class="Recording_title_one">开始日期</div>
          <div class="Recording_content_one">{{ val.startTime }}</div>
        </div>
        <div class="end_duration">
          <div class="Recording_title_one">结束日期</div>
          <div class="Recording_content_one">{{ val.endTime }}</div>
        </div>

        <div class="state_duration" v-if="val.state == 1">
          <div class="state_yes">已批准</div>
        </div>

        <div class="state_duration" v-else-if="val.state == 2">
          <div class="state_no">已驳回</div>
        </div>

        <div class="state_duration" v-else-if="val.state == 0">
          <div class="state_yet">待批准</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="我的请假"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div class="dialog_body" :style="{ height: dialog_height }">
        <div class="leave_type">
          <div class="leave_type_title">请求类型</div>
          <div class="leave_type_body">
            <div class="leave_type_radio">
              <el-radio v-model="radio1" label="Rest" border>调休</el-radio>
              <el-radio v-model="radio1" label="sick_leave" border
                >病假</el-radio
              >
              <el-radio v-model="radio1" label="Leave" border>事假</el-radio>
            </div>
            <div class="radio_group">
              <div
                class="el-radio-group"
                role="radiogroup"
                aria-label="radio-group"
                id="el-id-2567-3"
              >
                <label
                  data-v-b066d947=""
                  class="el-radio-button is-active el-radio-button--large"
                  aria-checked="true"
                  style="margin: 4px 4px 4px 4px"
                >
                  <input
                    class="el-radio-button__orig-radio"
                    v-model="radio2"
                    type="radio"
                    name="el-id-2567-2"
                    value="day"
                  />
                  <span
                    class="el-radio-button__inner"
                    style="border-radius: 56px"
                    @click="open_day"
                    >天</span
                  >
                </label>
                <label
                  data-v-b066d947=""
                  class="el-radio-button el-radio-button--large"
                  style="margin: 4px 4px 4px 4px"
                >
                  <input
                    class="el-radio-button__orig-radio"
                    type="radio"
                    v-model="radio2"
                    name="el-id-2567-2"
                    value="hour"
                  />
                  <span
                    class="el-radio-button__inner"
                    style="border-radius: 56px"
                    @click="open_hour"
                    >小时</span
                  >
                </label>
              </div>
            </div>

            <div class="dialog_data">
              <div class="block" v-show="open_block">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="margin-left: -13px"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
              <div class="block" v-show="!open_block">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  style="margin-left: -34px"
                  popper-class="dialog_data_picker"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['08:00:00', '23:59:59']"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="dialog_hour_message" v-if="dialog_message_hour">
              <div class="Length_of_leave">
                <div class="Length_of_leave_title">请假时长</div>
                <div class="Length">
                  {{ message_length }}
                </div>
              </div>
            </div>
            <div class="dialog_message">
              <el-button
                type="primary"
                icon="el-icon-chat-line-round"
                text
                bg
                v-if="message_icon_state"
                @click="open_message"
                style="margin-left: 14px"
                plain
              ></el-button>
              <div
                data-v-b066d947=""
                class="el-input el-input--small el-input--prefix w-50 m-2"
                style="margin-left: 10px"
                v-if="message_state"
              >
                <div class="el-input__wrapper">
                  <span class="el-input__prefix" @click="close_message">
                    <span class="el-input__prefix-inner">
                      <i class="el-icon el-input__icon" style="color: #3f8cff">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                          ></path>
                        </svg>
                      </i>
                    </span>
                  </span>
                  <input
                    class="el-input__inner"
                    type="textarea"
                    autocomplete="off"
                    tabindex="0"
                    placeholder="Please Input"
                    id="el-id-8464-2"
                    v-model="notes"
                  />
                </div>
              </div>
              <el-button
                type="primary"
                @click="dialog_submit"
                style="margin-right: 16px"
                :disabled="fit"
                >请求提交</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Leave",
  computed: {
    dialog_height() {
      if (this.dialog_message_hour == false) {
        return 313 + "px";
      } else {
        return 431 + "px";
      }
    },
    message_length() {
      const a =
        (Date.parse(new Date(this.value2[1])) -
          Date.parse(new Date(this.value2[0]))) /
        3600000;
      if (a > 0) {
        return (
          Math.round(
            (Date.parse(new Date(this.value2[1])) -
              Date.parse(new Date(this.value2[0]))) /
              3600000
          ) + "小时"
        );
      } else {
        return "0小时";
      }
    },
  },
  data() {
    return {
      radio2: "day",
      radio1: "Rest",
      dialogSalesclerksFormVisible: false,
      message_icon_state: true,
      dialogVisible: false,
      message_state: false,
      dialog_message_hour: false,
      my_compensatory_leave: 0,
      my_sick_leave: 0,
      my_leave_absence: 0,
      obj: {},
      value1: [],
      value2: [],
      fit: true,
      notes: "",
      open_block: true,
      noteObj: [],
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    value1() {
      if (this.value1.length == 0) {
        this.fit = true;
      } else {
        this.fit = false;
      }
    },
    value2() {
      if (this.value2.length == 0) {
        this.fit = true;
      } else {
        this.fit = false;
      }
    },
  },
  methods: {
    Visible() {
      console.log("123");
      this.dialogVisible = true;
    },
    getNotes() {
      this.$http({
        method: "GET",
        url: "http://192.168.1.102:8080/Holiday/notes/" + localStorage.email,
      }).then((result) => {
        this.noteObj = result.data.data;
        this.getNum();
      });
    },
    getNum() {
      for (let i = 0; i < this.noteObj.length; i++) {
        if (this.noteObj[i].type == "调休") {
          this.my_compensatory_leave++;
        } else if (this.noteObj[i].type == "病假") {
          this.my_sick_leave++;
        } else if (this.noteObj[i].type == "事假") {
          this.my_leave_absence++;
        }
      }
    },
    dialog_submit() {
      this.obj.name = localStorage.name;
      this.obj.email = localStorage.email;
      this.obj.type = this.radio1;
      this.obj.notes = this.notes;
      this.obj.state = 0;
      if (this.radio2 == "day") {
        this.obj.startTime = this.value1[0];
        this.obj.endTime = this.value1[1];
      } else {
        this.obj.startTime = this.value2[0];
        this.obj.endTime = this.value2[1];
      }
      this.$http({
        method: "POST",
        url: "http://192.168.1.102:8080/Holiday/Save",
        data: {
          holiday: this.obj,
        },
      }).then((result) => {
        this.open1();
      });
      Object.assign(this.$data, this.$options.data());
      setTimeout(() => {
        this.getNotes();
        this.getNum();
      }, 300);
    },

    format(percentage) {
      return percentage;
    },
    open_message() {
      this.message_icon_state = false;
      this.message_state = true;
    },
    close_message() {
      this.message_icon_state = true;
      this.message_state = false;
    },
    open_day() {
      this.dialog_message_hour = false;
      this.open_block = true;
    },
    open_hour() {
      this.dialog_message_hour = true;
      this.open_block = false;
    },
    getLeave(num, all) {
      return (num / all) * 100;
    },
    open1() {
      this.$notify({
        title: "成功",
        message: "申请成功，待管理员审批！",
        type: "success",
      });
    },
  },
});
</script>

<style lang="scss">
.el-picker-panel el-date-range-picker el-popper has-time dialog_data_picker {
  position: fixed;
  top: 98px;
  left: 435px;
  transform-origin: center top;
  z-index: 2007;
}
.el-picker-panel__body-wrapper {
  background-color: #fff;
  margin-left: -270px;
}
.el-picker-panel__footer {
  margin-left: -270px;
}
.dialog_data_picker {
  .el-data-picker {
    position: fixed;
    top: 98px;
    left: 435px;
    transform-origin: center top;
    z-index: 2007;
  }
}
</style>

<style lang="scss" scoped>
.block {
  margin-bottom: 20px;
}
::v-deep .el-picker-panel el-date-range-picker el-popper has-time {
  transform-origin: center top;
  z-index: 2025;
  position: fixed;
  top: 98px;
  left: 563px;
}
.el-input__prefix {
  width: 18px;
  height: 100%;
  margin-left: 8px;
  left: 5px;
  transition: all 0.3s;
}
.el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.el-input--small .el-input__icon {
  line-height: 50px;
}
.main {
  min-width: 1220px;
  position: relative;
  width: 80%;
  background-color: #f4f9fd;
}
.title {
  width: 100%;
  height: 100px;
  align-items: center;
  padding-left: 55px;
  font-size: 20px;
  display: flex;
}
.leave_btn {
  width: 100%;
  height: 70px;
  align-items: center;
  padding-right: 55px;
  font-size: 20px;
  display: flex;
  font-size: 17px;
  float: right;
  flex-direction: row-reverse;
}

.statistics {
  width: 100%;
  height: 200px;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
}

.Rest {
  background: url(@/assets/Rest_background.png);
  background-size: 100% 100%;
  border-radius: 20px;
  width: 27%;
  height: 96%;
  background-color: #fff;
}

.sick_leave {
  background: url(@/assets/Leave_background.png);
  background-size: 100% 100%;
  border-radius: 20px;
  width: 27%;
  height: 90%;
  background-color: #fff;
}

.Leave {
  background: url(@/assets/sick_leave_background2.png);
  background-size: 100% 100%;
  border-radius: 20px;
  width: 27%;
  height: 90%;
  background-color: #fff;
}

.statistics-font {
  margin-top: 10px;
  margin-left: 56px;
  align-items: center;
  display: flex;
}

.statistics-bottom-font {
  font-size: 10px;
  color: #ccc;
  margin-left: 56px;
  align-items: center;
  display: flex;
  margin-top: 3px;
}

.text_box_two {
  position: absolute;
  margin-top: 25px;
  margin-left: 52px;

  transform: translate(-50%, -50%);
}

.text_box_one {
  position: absolute;
  margin-top: 25px;
  margin-left: 52px;

  transform: translate(-50%, -50%);
}

.text_box_three {
  position: absolute;
  margin-top: 25px;
  margin-left: 52px;

  transform: translate(-50%, -50%);
}

.all_recording {
  height: 100%;
  width: 100%;
}

.Recording {
  margin-bottom: 20px;
  display: flex;
  border-radius: 10px;
  width: 90%;
  height: 80px;
  background-color: #fff;
  margin-left: 5%;
}
.type {
  margin-left: 4%;
  width: 25%;
  height: 100%;
}
.duration {
  width: 13%;
  height: 100%;
}

.start_duration {
  width: 25%;
  height: 100%;
}

.end_duration {
  width: 20%;
  height: 100%;
}

.state_duration {
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 100%;
}

.Recording_title {
  margin-left: 2px;
  margin-top: 20px;
  font-size: 10px;
  color: #ccc;
  display: flex;
  margin-bottom: 5px;
}

.Recording_content {
  font-size: 14px;
  display: flex;
}

.Recording_icon {
  margin-right: 3px;
  margin-left: 2px;
  margin-top: 1px;
}

.Recording_title_one {
  margin-top: 20px;
  font-size: 10px;
  justify-content: center;
  color: #ccc;
  display: flex;
  margin-bottom: 5px;
}

.Recording_content_one {
  display: flex;
  font-size: 14px;
  justify-content: center;
}

.state_yet {
  width: 66px;
  height: 30px;
  background-color: #fdc748;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
}

.state_no {
  width: 66px;
  height: 30px;
  background-color: #d43030;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
}

.state_yes {
  width: 66px;
  height: 30px;
  background-color: #00d097;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
}

.leave_type {
  width: 65%;
  height: 100px;
}

.leave_type_title {
  margin-left: 16px;
}

.leave_type_radio {
  margin-left: 16px;
  margin-top: 8px;
}

.radio_group {
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-radio-button__original-radio:checked + .el-radio-button__inner {
  border-radius: 56px;
  padding: 10px 20px;
  font-size: 14px;
  width: 166px;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-left: 0px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  box-shadow: none !important;
}
.el-radio-button--large .el-radio-button__inner {
  border-radius: 56px;
  padding: 10px 20px;
  font-size: 14px;
  width: 166px;
}

.el-radio-button__inner {
  background-color: #e6edf5;
  border: 0px;
}

.el-radio-group {
  background-color: #e6edf5;
  border-radius: 56px;
  margin-left: -9px;
}

.dialog_body {
  width: 100%;
  display: flex;
  justify-content: center;
}

.dialog_data {
  width: 490px;
  margin-top: 29px;
  margin-left: 22px;
}

.dialog_hour_message {
  height: 88px;
  width: 119%;
  margin-left: -17px;
}

.dialog_hour_message_title {
  display: flex;
  justify-content: space-between;
}

.Length_of_leave {
  display: flex;
  align-items: center;
  width: 93%;
  border-radius: 10px;
  height: 67px;
  margin-top: 20px;
  background-color: #f4f9fd;
}

.Length_of_leave_title {
  font-size: 15px;
  color: black;
  display: flex;
  justify-content: center;
  margin-left: 30px;
  align-items: center;
}

.Length {
  margin-left: 163px;
  font-size: 21px;
  color: #15c0e6;
  align-items: center;
}

.dialog_message {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
}

.el-input__wrapper {
  margin-left: 6px;
}
.dialog_data
  ::v-deep
  .el-picker-panel
  .el-date-range-picker
  .el-popper
  has-time
  .dialog_data_picker {
  background-color: #d43030;
}
</style>