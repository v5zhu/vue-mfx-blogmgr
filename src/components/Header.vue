<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            &#9776;
        </button>
        <a class="navbar-brand" href="/"></a>

        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item" id="sidebar_minimize">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>
        </ul>

        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item header-item "
                @click="changeHeaderStyle">

                <router-link tag="div" to='/admin/mgr/blog' class="nav-link">
                    <p>
                        <Icon type="edit" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> 博客管理 </p>
                </router-link>
            </li>
            <li class="nav-item header-item "
                @click="changeHeaderStyle">

                <router-link tag="div" to='/admin/mgr/log' class="nav-link">
                    <p>
                        <Icon type="ios-paw" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> 日志监控 </p>
                </router-link>
            </li>
            <li class="nav-item header-item "
                @click="changeHeaderStyle">

                <router-link tag="div" to='/admin/mgr/system' class="nav-link">
                    <p>
                        <Icon type="settings" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> 系统管理 </p>
                </router-link>
            </li>
            <li class="nav-item header-item "
                @click="changeHeaderStyle">

                <router-link tag="div" to='/admin/mgr/setting' class="nav-link">
                    <p>
                        <Icon type="settings" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> 设置中心 </p>
                </router-link>
            </li>

            <li class="nav-item header-item "
                @click="changeHeaderStyle">

                <router-link tag="div" to='/admin/mgr/subscribe' class="nav-link">
                    <p>
                        <Icon type="ios-star" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> 订阅中心 </p>
                </router-link>
            </li>
        </ul>


        <ul class="nav navbar-nav ml-auto">

            <li class="nav-item d-md-down-none dropdown">
                <a class="nav-link">
                    <Icon type="android-notifications" size="20"></Icon>
                    <span class="badge badge-pill badge-danger">5</span></a>
            </li>


            <Dropdown trigger="click" class="nav-item" v-if="loginUser && loginUser.token!=undefined">
                <a href="javascript:void(0)" style="position: relative;">
                    <div slot="button">
                        <a href="javascript:void(0)">
                            <img src="/static/img/avatars/man-avatar.png" class="img-avatar" alt="o">
                            {{loginUser.nickname}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                    </div>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item>
                        <a href="" @click="Logout">
                            <p class="dropdown-itemp">
                                <Icon type="power"></Icon>
                                Logout
                            </p>
                        </a>
                    </Dropdown-item>

                </Dropdown-menu>
            </Dropdown>

            <li class="nav-item d-md-down-none">
                <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
            </li>
        </ul>
    </navbar>
</template>
<script>

    import navbar from './Navbar'
    import store from 'store/';

    export default {
        props: ['loginUser'],
        name: 'header',
        components: {
            navbar,
        },
        data() {
            return {
                pageInfo: {
                    pageNum: 1,
                    pageSize: 20,
                    list: [],
                    total: 0
                },
                isActive: -1,
            }
        },
        created() {
        },
        methods: {
            Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(res => {
                    if (res.data.success == true) {
                        this.$router.push({path: '/admin/login'});
                    } else {
                        this.$Message.error('退出失败,请联系管理员');
                    }
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            click() {
                // do nothing
            },
            sidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize(e) {
                e.preventDefault()

                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle(e) {
                e.preventDefault()

                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            },
            changeHeaderStyle(index) {
                this.isActive = index;

            }
        }
    }
</script>

<style type="text/css" scoped>
    .dropdown-itemp {
        text-align: left;
        font-size: 12px;
    }

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item:hover {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .header-item {
        width: 100px;
    }

    .headerItemActiveClass {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize,.dropdown):hover {
        border-bottom: 5px solid #20a0ff;
    }
</style>
