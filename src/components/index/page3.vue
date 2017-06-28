<template>
  <div class="page3">
    <div class="title">
      请选择一个维修方式
    </div>
    <ul class="store_list clearfix">
      <li v-for="(item, index) in stores" :class="{'active': cindex === index}" @click="choose_one(index)">{{item}}</li>
    </ul>
    <!--  上门维修 -->
    <div v-show="order.store[0].id === 0">
      <div class="name">
        请选择上门维修区域：
        <span class="edit_one" @click="edit_one" v-if="order.store[0].area !== '' ">修改</span>
        <div v-if="areas[order.store[0].area]">{{areas[order.store[0].area].city}}({{areas[order.store[0].area].area}})</div>
      </div>
      <ul class="area">
        <li v-for="(area, index) in areas"  :class="{'active': aindex === index || order.store[0].area === index}" @click="choose_area(index)" v-if="aindex === '' ">
          <div>{{area.city}}</div>
          <div class="area_desc">{{area.area}}</div>
        </li>
      </ul>
      <div v-show="order.store[0].area !== '' ">
        <v-date :area="order.store[0].area"></v-date>
      </div>
    </div>
    <!--  到店维修 -->
    <div v-show="order.store[2].id  === 2">
      深圳总部地址
    </div>
    <button class="submit" @click="submit" :class="{'active': order.store[2].id === 2 || order.store[1].id === 1 || this.order.store[0].time.range !== ''}">确认维修</button>

    <!--  显示 -->
    <div class="mask_result" @click="show = !show" v-if="show">
      <div class="inner">
        <p>你选择的是{{order.phone.name}}</p>
        <p>故障类型: {{order.fault.name}}</p>
        <p>故障描述:  {{order.fault.faults['name']}}-{{order.fault.faults['desc']}}</p>
        <p>解决方法:
          <p v-for="item in order.fault.faults['methods']">
            {{item.name}}---{{item.price}}
          </p>
        </p>
        <div v-if="order.store[0].id !== ''">
          <p> 选择： 上门维修</p>
          <p v-for="(area, index) in areas" v-if="index === order.store[0].area">
            区域地址： {{area.city}}--{{area.area}}</p>
          <p>选择时间: {{order.store[0].time.day}}{{order.store[0].time.range}}</p>
        </div>
        <div v-if="order.store[1].id !== ''">
          <p> 选择： 寄送维修</p>
        </div>
        <div v-if="order.store[2].id !== ''">
          <p> 选择： 到店维修</p>
        </div>
        <a href="/#/" class="enter" @click.stop.prevent="goHome">首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  import vDate from '../common/date.vue'

  export default {
    name: 'index',
    data () {
      return {
        show: false,
        stores: ['上门维修', '寄送维修', '到店维修'],
        areas: [{
          'city': '深圳总部',
          'area': '罗湖，福田，南山，龙华，宝安'
        }, {
          'city': '江苏',
          'area': '罗湖，福田，南山，龙华，宝安'
        }, {
          'city': '河南',
          'area': '罗湖，福田，南山，龙华，宝安'
        }],
        cindex: '',
        aindex: ''
      }
    },
    mounted () {

    },
    computed: {
      order: function () {
        return this.$store.getters.getOrder
      }
    },
    methods: {
      editOne: function () {
        this.$store.dispatch('goStep', 1)
      },
      choose_one: function (index) {
        this.cindex = index
        for (let i = 0; i < this.order.store.length; i++) {
          this.order.store[i].id = ''   // 置空
          if (i === index) {
            this.order.store[i].id = index
          }
        }
      },
      choose_area: function (index) {
        this.aindex = index
        this.order.store[0].area = index
        this.order.store[0].time.day = 0
        // 加载  时间  列表
      },
      edit_one: function (index) {
        this.aindex = ''  // 修改置空
      },
      submit: function (event) {
        if (/active/.test(event.target.getAttribute('class'))) {
          this.show = true
        }
      },
      goHome: function () {
        window.location.href = '/'
      }
    },
    components: {
      vDate
    }
  }
</script>

<style lang="less" scoped>
  .page3 {
    .store_list {
      display: -moz-box;
      display: -webkit-box;
      display: box;
      text-align: center;
      margin: 2rem 0;
      li {
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        height: 10rem;
        line-height: 10rem;
        border: 1px solid #313131;
        border-radius: 5px;
        &:nth-child(2) {
          margin: 0 10px;
         }
        &.active {
          color: #0fae6f;
          border: 1px solid #0fae6f;
         }
      }
    }
    .area {
      li {
        height: 3.4rem;
        margin-top: 2rem;
        border-radius: 5px;
        padding: 1.3rem;
        border: 1px solid #313131;
        .area_desc {
          font-size: 1rem;
          color: #7e8c8d;
          margin-top: 1rem;
        }
        &.active {
           border: 1px solid #0fae6f;
         }
      }
    }
    .submit {
      height: 40px;
      width: 100%;
      margin-top: 2rem;
      border: 0;
      border-radius: 5px;
      color: #fff;
      background: #cccccc;
      &.active {
        background: #0fae6f;
       }
    }
  .mask_result {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -moz-box-aling: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    .inner {
      background: #fff;
      width: 70%;
      margin: 0 auto;
      padding: 5%;
      p {
        line-height: 1.7
      }
      .enter {
        display:  inline-block;
        width: 10rem;
        margin-top: 1rem;
        line-height: 3rem;
        background: #0fae6f;
        text-align: center;
        color: #fff;

      }
    }
   }
  }
</style>
