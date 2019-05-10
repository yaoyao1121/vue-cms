<template>
    <div class="page">
        <div class="nav-box" :class="isCollapse ? 'Collapse' : '' ">
            <div class="collapseText" @click="handleNav">伸缩</div>
            <el-menu :default-active="isActive" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleSelect">

                <el-submenu v-for="menu in menusData" :index="menu.code" :key="menu.code">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span slot="title" v-if="!isCollapse">{{menu.title}}</span>
                    </template>
                    
                    <el-menu-item level="2" v-for="item in menu.children" :index="item.code" :key="item.code">
                        <template slot="title">
                            <router-link :to="{name: item.route}">
                                <i  class="nav-link-i" :class="[item.icon,{'router-link-text':item.route==$route.name}]"></i>
                                <span class="nav-link-title" :class="[{'router-link-text':item.route==$route.name}]">{{item.title}}</span>
                            </router-link> 
                        </template>
                    </el-menu-item>
                    
                </el-submenu>

            </el-menu>

            <div class="user-box" :class="{'user-collapse-box': isCollapse == true}">
                <div class="user-avatar"></div>
                <div class="user-info">
                    <span>liujianwei</span>
                    <span>退出账号</span>
                </div>
            </div>
        
        </div>

        <transition name="fade">
            <div class="main" :class="{'main-box': isCollapse == true}">
                <router-view></router-view>
            </div>
        </transition>        
    </div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
        isCollapse: false,
        isisActive: false,
        menusData: [

            {
                title: '行业分析', level: 1, icon: 'el-icon-menu', code: '1',
                children: [
                    {
                        title: '销售趋势', route: 'index',icon: 'el-icon-menu', level: 2, code: '11',
                    },
                    
                    {
                        title: '类别分析', route: 'analysis',icon: 'el-icon-location', level: 2, code: '12',
                    },
                ]
            },

            {
                title: '商品模块', level: 1, icon: 'el-icon-menu', code: '2',
                children: [
                    {
                        title: '商品列表', route: 'product',icon: 'el-icon-menu', level: 2, code: '21',
                    },
                ]
            },

        ],

    }
  },
  
  computed: {
      isActive() {
          let code = '11';
          this.menusData.forEach((menu,index)=>{
              menu.children.forEach((item,index)=>{
                  if(item.route == this.$route.name){
                      code = item.code;
                  }
              });
          });

          return code;
      }
  },

  created() {},

    methods: {

        handleNav() {
            this.isCollapse = !this.isCollapse;
        },

        handleSelect(index) {
            if (index.toString().length == 1) {
                this.menusData.forEach((menu,ind)=>{
                    if (menu.code == index) {
                        this.$router.push({ 'name':menu.children[0].route}); 
                    }
                });
            }
        }
    }, 
    mounted() {
        
    },
    watch:{}
}

</script>

<style lang="less" scoped>

    .router-link-active {
        color: #409EFF;
        display: block;
        width: 100%;
        height: 100%;
    }

    .nav-link-title {
        color: #303133;
    }

    .router-link-active .nav-link-i {
        color: #303133;
    }

    .router-link-active .router-link-text {
        color: #409EFF;
    }
    
    .nav-box {
        width: 160px;
        height: 100%;
        transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
        border-right: #ccc solid 1px;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;

        &.Collapse {
            width: 64px;
        }

        .collapseText {
            line-height: 30px;
            text-align: right;
            padding-right: 20px;
            cursor: pointer;
        }

        .nav-link-i {
            color: #303133;
        }

        .nav-link-title {
            color: #303133;
        }
        
        .router-link-text {
            color: #409EFF;
        }


        .user-box {
            position: fixed;
            width: 160px;
            overflow: hidden;
            left: 0;
            bottom: 40px;
            background: #ccc;
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 14px;
            transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;

            .user-avatar {
                width: 60px;
                height: 60px;
                border-radius: 30px;
                background: #eee;
            }

            .user-info {
                line-height: 30px;
                text-align: center;
                
                span:nth-child(2n) {
                    padding-left: 14px;
                }
            }

            &.user-collapse-box {
                width: 64px;
                font-size:  12px;

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                }

                .user-info {
                    
                    span:nth-child(2n) {
                        padding-left: 0px;
                    }
                }
            }
        }

    }  

    .main {
        position: absolute;
        left: 160px;
        top: 0;
        right: 0;
        min-height: 100%;
        background: #f4f9fa;
        padding: 10px;
        box-sizing:border-box;
        display: flex;
        transition: 0.3s left ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;

        &.main-box {
            left: 64px;
            transition: 0.3s left ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 160px;
        min-height: 100%;
    }
</style>
