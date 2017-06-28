<template>
  <div>
    <div class="name time">
      请选择上门维修时间：
    </div>
    <div id="d_wrapper" ref='date'>
      <ul>
        <li v-for="(item,index) in range" :class="{'active': index === cindex}" @click="choose_range(index,item)">{{item.month}}月{{item.day}}日</li>
      </ul>
    </div>
    <transition name="fade">
      <template  v-for="(item, index) in range" v-if="index === cindex" >
        <ul class="phone_list clearfix" >
          <li class="list_item col-xs-6 col-sm-3" v-for="(time,index) in item.time" :class="{'active': index === tindex}" @click="choose_time(index, times[index])" >
            <div class="item_texts"  style="line-height: 2.4rem">{{times[index]}}<div>{{time}}</div></div>
          </li>
        </ul>
      </template>
    </transition>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'date',
    props: {
      area: {
      }
    },
    data () {
      return {
        tindex: '',
        range: [],
        cindex: 0
      }
    },
    created () {
    },
    watch: {
      area: function () {
        this.cal()
        this.$nextTick(function () {
          this.dateScroll = new BScroll(this.$refs.date, {
            click: true,
            scrollX: true
          })
        })
      }
    },
    computed: {
      times () {
        return ['9:00 ~ 11:00', '11:00 ~ 13:00', '12:00 ~ 13:00', '11:00 ~ 13:00', '11:00 ~ 13:00', '11:00 ~ 13:00']
      },
      order: function () {
        return this.$store.getters.getOrder
      }
    },
    methods: {
      choose_time: function (index, item) {
        this.tindex = index
        this.order.store[0].time.range = item   //  具体13:00 － 14:00
      },
      choose_range: function (index, item) {
        this.cindex = index
        this.order.store[0].time.day = `${item.month}月${item.day}日`
      },
      cal: function () {
        let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]  // 定义月份
        let now = new Date()
        const date = {
          year: now.getFullYear(),   //  2017年
          month: now.getMonth() + 1,  // 3月  2+1月
          day: now.getDate(),    // 2日
          week: now.getDay(),   //  周三  week = 0周日
          time: [1, 4, 5, 3, 2, 1]
        }
        if ((date.year % 400 === 0) || (date.year % 4 === 0) && (date.year % 100 !== 0)) {
          month[1] = 29
        }

        this.order.store[0].time.day = `${date.month}月${date.day}日`  // 初始化首日
        //  创建两个星期
        let range = []
        for (let i = 0; i < 14; i++) {
          var endDay = date.day + i
          var endMonth = date.month
          var endYear = date.year
          if (endDay > month[date.month]) {
            endDay = endDay - month[date.month]
            endMonth = endMonth + 1
            if (endMonth > 12) {
              endYear = endYear + 1
            }
          }
          let obj = {
            year: endYear,
            month: endMonth,
            day: endDay,
            time: date.time
          }
          range.push(obj)
        }
        range[0].time = [3, 4, 11, 22, 33, 11]
        this.range = range
      }
    }
  }
</script>

<style lang="less" scoped>
  #d_wrapper {
    width: 100%;
    overflow: hidden;
    height: 2.2rem;
    line-height: 2rem;
    margin-top: 2rem;
    position: relative;
    ul {
      width: 500px;
      li {
        display: inline-block;
        margin-right: 20px;
      &.active {
         border-bottom: 1px solid #0fae6f;
       }
      }
    }
  }
</style>
