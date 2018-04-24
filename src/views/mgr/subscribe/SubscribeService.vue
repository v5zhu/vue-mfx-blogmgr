<template>
    <div class="animated fadeIn">


        <Row>
            <Col :md="24">
                <div>
                    Welcome<br/><Input type="text" v-model="content"/>
                </div>
                <div>
                    <Button type="warning" @click="send()">发送消息</Button>
                </div>
                <div>
                    <hr/>
                    <Button type="warning" @click="openConnection()">重连WebSocket</Button>
                    <Button type="warning" @click="closeWebSocket()">关闭WebSocket连接</Button>
                    <hr/>
                    <div v-html="messages"></div>
                </div>
            </Col>

        </Row>

    </div>
</template>

<script>

    import websocket from 'utils/websocket';

    export default {
        components: {},
        name: 'subscribe',
        data() {
            return {
                content: '',
                stompClient: null,
                messages: ''

            }
        },
        methods: {
            openConnection() {
                websocket.openConnection();
            },
            closeWebSocket() {
                websocket.closeConnection();
            }
        },
        mounted() {
            this.openConnection();
        }
    }
</script>


<style type="text/css" scoped>
    .time {
        font-size: 14px;
        font-weight: bold;
    }

    .content {
        padding-left: 5px;
    }

    .dashboard_feature {
        text-align: center;
    }

    .demo-carousel {
        height: 600px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }

    .demo-carousel img {
        height: 100%;
        width: 100%;
    }

    h3, h4, h5 {
        margin: 12px;
    }

    h3 {
        margin-bottom: 20px;
    }

    p {
        margin: 12px;
    }

    .row-margin-top {
        margin-top: 30px;
    }
</style>