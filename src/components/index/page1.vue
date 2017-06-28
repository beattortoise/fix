<template>
    <div class="page1">
      <transition name="fade">
      <div class="name border-1px" v-if="step.done > 0">
        {{order.phone.name}}
        <span class="edit_one" @click="editOne">修改</span>
      </div>
      </transition>
      <transition name="fade">
      <div class="choose" v-if="step.done === 0 || step.current === 1">
        <div class="title">
          选择机型
        </div>
        <ul class="phone_list clearfix">
          <li v-for="item in items" class="list_item col-xs-6 col-sm-3" @click="choose_one($event, item)"  :class="{'active': step.done >= 1 && item.name === order.phone.name}">
            <div class="item_texts">{{item.name}}</div>
          </li>
        </ul>
      </div>
      </transition>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    export default {
      name: 'page1',
      computed: Vuex.mapGetters({
        items: 'getGoods',
        step: 'getStep',
        order: 'getOrder'
      }),
      methods: {
        editOne: function () {
          this.$store.dispatch('goStep', 1)  // 带参数编辑
        },
        choose_one: function (event, item) {
          this.order.phone = item
          this.$store.dispatch('chooseOne')
        }
      }
    }
</script>

<style lang="less" scoped>
</style>
