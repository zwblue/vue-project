<template>
  <div class="home">
    <Header></Header>
    <section class="section">
      <div class="content">
        <div class="leftContent">
          <div class="proHeader">
            项目列表
          </div>
          <div class="proContent">
            <div :class="`item ${activeIndex == item ? 'active' : ''}`" :key="item" v-for='item in 10' @click="updateActiveIndex(item)">
              项目名称{{item}}
            </div>
          </div>
        </div>
        <div class="rightContent">
          <div v-if='!information && !edit'>
            <Button icon='md-add' type='primary'>添加</Button>
            <Table :style='{marginTop: "15px"}'  :columns="columns7" :data="data6"></Table>
            <Table :style='{marginTop: "15px"}'  :columns="columns7" :data="data6"></Table>
          </div>
          <div v-if='information'>
            <Button icon='md-return-left' type='primary' @click="updateInformation">返回</Button>
            <WatchInfomation></WatchInfomation>
          </div>
           <div v-if='edit'>
            <Button icon='md-return-left' type='primary' @click="updateInformation">返回</Button>
            <EditInformation></EditInformation>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from './Header'
  import WatchInfomation from './WatchInfomation'
  import EditInformation from './EditInformation'
  import {
    Button,
    Table
  } from 'iview'
  export default {
    components: {
      Header,
      Button,
      Table,
      WatchInfomation,
      EditInformation
    },
    data() {
      return {
        information: false,
        edit:false,
        activeIndex: 2,
        columns7: [{
            title: '代码',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '名称',
            key: 'age',
            align: 'center'
          },
          {
            title: '版本号',
            key: 'address',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(Button, {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.information = true
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h(Button, {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit = true
                      this.show(params.index)
                    }
                  }
                }, '编辑'),
                h(Button, {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [{
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },
    methods: {
      updateActiveIndex(item) {
        this.activeIndex = item
      },
      updateInformation(){
        this.information = false
        this.edit = false
      }
    },
  }
</script>

<style scoped lang="scss">
  .home {
    color: #333;
    .section {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0px;
      padding-top: 24px;
      overflow-y: scroll;
    }
    .content {
      width: 1100px;
      margin: 0 auto;
      display: flex;
    }
    .leftContent {
      background: #FFF;
      width: 200px;
      border: 1px solid $border;
      border-radius: $radiusSize;
      //  border-radius: $radiusSize 0 0 $radiusSize;
      .proHeader {
        color: #666;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #eef2f9;
      }
      .item {
        padding: 10px;
        margin: 8px 0;
        text-align: center;
        &:hover {
          background: #f3f7f9;
          color: $lightPrimary;
        }
        &.active {
          background: #f3f7f9;
          color: $darkPrimary;
        }
      }
    }
    .rightContent {
      padding: 15px;
      background: #FFF;
      margin-left: 20px;
      border-radius: $radiusSize;
      flex: 1;
      border: 1px solid #eee;
    }
  }
</style>
