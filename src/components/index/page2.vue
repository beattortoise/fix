<template>
    <div class="page2">
      <transition name="fade">
      <div class="name  border-1px" v-if="step.done > 1 || order.fault.name !== ''">
        {{order.fault.name}}<span v-if="order.fault.faults.name">({{order.fault.faults.name}})<br /></span>
        <span class="edit_one" @click="editOne" v-if="order.fault.faults !== '' ">修改</span>
        <div>{{order.fault.faults.desc}}</div>
        <div class="fault_detail" v-for="data in result.data" v-if="order.fault.name === data.name">
          <div v-for="(fault,index) in data.faults">
            <!-- 故障方案 -->
            <div v-if="order.fault.faults.name !== '' && fault === order.fault.faults" class="method_wrap">
              <div class="method_name">相关维修方案</div>
              <div v-for="method in fault.methods" class="method">
                {{method.name}}<span class="price">¥{{method.price}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
      <transition name="fade">
      <div class="choose" v-if="step.done === 1 || step.current === 2">
        <!-- 选择故障大类 -->
        <div v-if="order.fault.name === '' || order.fault.faults !== '' ">
          <div class="title">
          选择故障
         </div>
          <ul class="phone_list clearfix">
            <li v-for="item in items" class="list_item col-xs-6 col-sm-3" @click="choose_one($event, item)" :class="{'active': step.done >= 1 && item.name === order.fault.name}">
              <div class="item_texts">{{item.name}}</div>
            </li>
          </ul>
        </div>
        <!-- 选择故障小类 -->
        <div class="fault_detail" v-for="data in result.data" v-if="order.fault.name === data.name && order.fault.faults === '' ">
          <div class="name">请选择:</div>
          <div v-for="(fault,index) in data.faults"   @click="choose_next(index, fault)">
            <div class="fault" :class="{'active': cindex === index }"   v-if="order.fault.name != '' ">
              <h3>{{fault.name}} <span :class="{'icon-check_circle': cindex === index }"></span></h3>
              <div>{{fault.desc}}</div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  // 发送请求获取屏幕数据
  export default {
    name: 'index',
    data () {
      return {
        cindex: '',
        type: 'fault',
        result: {
          data: [{
            name: '屏幕类',
            id: 1,
            faults: [{
              'id': 1,
              'name': '屏幕破碎',
              'desc': '屏幕破裂或出现气泡,暂不支持单独内外屏更换',
              'methods': [{
                'name': '更换屏幕总成',
                'price': 100
              }, {
                'name': '触摸线路维修',
                'price': 300
              }]
            }, {
              'id': 2,
              'name': '屏幕破碎2',
              'desc': '屏幕破裂或出现气泡,暂不支持单独内外屏更换',
              'methods': [{
                'name': '更换屏幕',
                'price': 100
              }]
            }]
          }, {
            name: '电池类',
            id: 2,
            faults: [{
              'id': 1,
              'name': '电池损毁',
              'desc': '屏幕破裂或出现气泡,暂不支持单独内外屏更换',
              'methods': [{
                'name': '更换电池总成',
                'price': 100
              }, {
                'id': 2,
                'name': '触摸线路维修',
                'price': 300
              }]
            }, {
              'name': '电池损毁2',
              'desc': '屏幕破裂或出现气泡,暂不支持单独内外屏更换'
            }]
          }]
        }
      }
    },
    computed: Vuex.mapGetters({
      items: 'getFaults',
      step: 'getStep',
      order: 'getOrder'
    }),
    methods: {
      editOne: function () {
        // this.order.fault.faults = ''
        this.$store.dispatch('goStep', 2)    // 编辑故障分类（1是机型分类，2是故障分类，3是门店)
      },
      choose_one: function (event, item) {    //  分解此处存数据
        // 操作相关数据
        this.order.fault.name = item.name
        this.order.fault.id = item.id
        this.order.fault.faults = '' // 重选置空
        this.cindex = ''
      },
      choose_next: function (index, faults) {
        this.cindex = index
        this.order.fault.faults = faults
        this.$store.dispatch('chooseOne')
      }
    }
  }
</script>

<style lang="less" scoped>
  .page2 {
    .fault_detail {
      padding-bottom: 1px;
      line-height: 2rem;
      .fault {
        border-radius: 5px;
        padding: 2%;
        margin-bottom: 2rem;
        border: 1px solid #313131;
        &.active {
          border: 1px solid #0fae6f;
         }
      }
    }
    .method_wrap {
      margin-bottom: 20px;
      background: #f7f7f7;
      padding: 2%;
      border: 1px solid #f8f8f8;
      border-radius: 5px;
    }
    .method {
      position: relative;
      line-height: 20px;
      margin-top: 10px;
      .price {
        position: absolute;
        right: 10px;
      }
    }
    .method_name {
      font-size: 1.6rem;
    }
  }
</style>
