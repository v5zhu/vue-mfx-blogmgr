<template>
    <div>
        <transition name="fade">
            <header-float-navbar v-show="floatLayerShow" transiton="fade">
                <ul class="nav navbar-nav-left d-md-down-none">
                    <li class="nav-item header-item">
                        加入我们不仅可以更好的解决您的问题，同时还可以和业界大师近距离接触交流，管理您的技术积累!
                    </li>
                </ul>
                <ul class="nav navbar-nav d-md-down-none">

                    <li class="nav-item header-item reg-login-btn">
                        <Button class="reg-login-btn" type="default" icon="ios-pulse" size="large" @click="showRegModalFunction">免费注册</Button>
                    </li>

                    <li class="nav-item header-item reg-login">
                        <Button class="reg-login-btn" type="info" icon="log-in" size="large" @click="showLoginModalFunction">立即登录</Button>
                    </li>
                </ul>
                <ul>
                    <li class="nav-item d-md-down-none" style="position: absolute;right:-5px;top:5px;">
                        <a class="nav-link navbar-toggler aside-menu-toggler"
                           @click="closeTheHeaderFloat()">
                            <Icon type="close-circled" color="white"></Icon>
                        </a>
                    </li>
                </ul>
            </header-float-navbar>
        </transition>
    </div>
</template>
<script>

    import HeaderFloatNavbar from './HeaderFloatNavbar';

    export default {
        name: 'header',
        props: [],
        data() {
            return {
                floatLayerShow: true
            }
        },
        components: {HeaderFloatNavbar},
        methods: {
            showRegModalFunction() {
                this.$emit('showRegModalFunction');
            },
            showLoginModalFunction() {
                this.$emit('showLoginModalFunction');
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
            closeTheHeaderFloat() {
                this.$emit('closeHeaderFloat')
            }
        }
    }
</script>

<style type="text/css" scoped>
    .header-item .reg-login-btn:hover {
        background: inherit;
        border-radius: 2px;
        box-shadow: 0px 0px 20px 3px orange;
    }

    .navbar-nav {
        position: absolute;
        top: 50px;
        right: 50px;

    }

    .navbar-nav-left {
        position: absolute;
        left: 50px;
        top: 50px;
        color: white;
        font-size: 16px;
        font-weight: 700;
    }

    .header-item {
        padding: 15px;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
