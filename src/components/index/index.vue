<template>
  <div class="index">
    <v-header></v-header>
    <page-one v-if="step.done >= 0"></page-one>
    <page-two v-if="step.done >= 1"></page-two>
    <page-three v-if="step.done >= 2"></page-three>
    <ul class="phone_process" v-if="step.done === 0">
      <li v-for="tab in tabs" class="process_list">
        <div class="title" v-on:click.stop="tab.show = !tab.show">{{tab.name}}<span :class="{'icon-add_circle': !tab.show, 'icon-remove_circle_outline': tab.show}"></span></div>
        <transition name="fade" v-if="tab.show">
          <div class="inner">
            <div v-for="list in tab.list" class="list_name"><a :href="list.link">{{list.name}}</a></div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
  import header from '../header/header.vue'
  import pageOne from './page1.vue'
  import pageTwo from './page2.vue'
  import pageThree from './page3.vue'

  export default {
    name: 'index',
    data () {
      return {
        tabs: [
          {show: false, name: '维修流程', list: [{name: '报价', link: 'xx'}, {name: '服务', link: 'javascript:;'}]},
          {show: false, name: '维修流程', list: [{name: '报价', link: 'xx'}, {name: '服务', link: 'javascript:;'}]},
          {show: false, name: '维修流程', list: [{name: '报价', link: 'xx'}, {name: '服务', link: 'javascript:;'}]}
        ]
      }
    },
    created () {
      if (!this.user.id) {
        location.href = '/#'
      }
    },
    components: {
      'v-header': header,
      pageOne,
      pageTwo,
      pageThree
    },
    computed: {
      step: function () {
        return this.$store.getters.getStep
      },
      user: function () {
        return this.$store.getters.getUser
      }
    }
  }
</script>

<style lang="less">
  .index {
    padding-top: 4rem;
  }
  .title {
    margin-top: 1rem;
    font-size: 1.8rem;
  }
  .name {
    position: relative;
    line-height: 40px;
    &:after {
      display: block;
      position: absolute;
      left: 0;
       bottom: 0;
      width: 100%;
      border-top: 1px solid rgba(7,17,27,0.1);
      content: '';
     }
    .edit_one {
      position: absolute;
      right: 0px;
      color: #0fae6f;
    }
  }
  .phone_list {
    width: 80%;
    padding: 1.8rem 10%;
    .list_item {
      box-sizing: border-box;
      float: left;
      &.active {
        .item_texts {
          border: 1px solid #0fae6f;
        }
      }
      .item_texts {
        border: 1px solid #7e8c8d;
        margin: 1rem 1rem;
        height: 4.6rem;
        line-height: 4.6rem;
        text-align: center;
      }
    }
  }
  .phone_process {
    border-top: 1px solid #ccc;
    .process_list {
      border-bottom: 1px solid #ccc;
      position: relative;
      .title {
        font-size: 1.6rem;
        height: 4rem;
        line-height: 4rem;
        span {
          position: absolute;
          right: 10px;
          top: 12px;
          font-size: 2rem;
        }
       }
      .list_name {
        line-height: 2rem;
      }
   }
  }
  .fade-enter-active {
    transition: all .4s ease;
  }
  .fade-leave-active {
    opacity: 1;
  }
  .fade-enter{
    transform: translateX(10px);
    opacity: 0;
  }
  .fade-leave-active {
    opacity: 0;
  }
</style>
