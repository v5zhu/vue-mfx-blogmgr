<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">添加新任务</Button>
        <Modal v-model="taskModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-clock-outline" size="20"></Icon>
                <span style="font-size:14px;">添加任务</span>
            </p>
            <Form ref="taskForm" :model="task" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                        <ul>
                            <li style="margin: 10px;">
                                <Form-item prop="springId" label="Bean">
                                    <Select v-model="task.springId" filterable clearable @on-change="changeSpringId">
                                        <Option v-for="item in beanList" :value="item" :key="item">{{
                                            item }}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="beanClass" label="类全名">
                                    <Input v-model="task.beanClass" disabled type="text">
                                    </Input>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="methodName" label="方法">
                                    <Select v-model="task.methodName" style="width:200px">
                                        <Option v-for="item in beanMethodList" :value="item" :key="item">
                                            {{item}}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="isConcurrent" label="是否并发">
                                    <Select v-model="task.isConcurrent" style="width:200px">
                                        <Option v-for="item in concurrents" :value="item.value" :key="item.value">
                                            {{item.label}}
                                        </Option>
                                    </Select>
                                </Form-item>
                            </li>

                            <li style="margin: 10px;">
                                <Form-item prop="jobName" label="任务名称">
                                    <Input v-model="task.jobName" type="text">
                                    </Input>
                                </Form-item>
                            </li>

                            <li style="margin: 10px;">
                                <Form-item prop="jobGroup" label="任务分组">
                                    <Input v-model="task.jobGroup" type="text">
                                    </Input>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="cronExpression" label="cron表达式">
                                    <Input v-model="task.cronExpression" type="text">
                                    </Input>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="parameters" label="方法参数">
                                    <Input v-model="task.parameters" type="textarea" :rows="4"
                                           placeholder='JSON格式数据,如:{"key":"value"}'>
                                    </Input>
                                </Form-item>
                            </li>
                            <li style="margin: 10px;">
                                <Form-item prop="description" label="描述信息">
                                    <Input v-model="task.description" type="textarea" :rows="4">
                                    </Input>
                                </Form-item>
                            </li>
                            <li>
                                <div style="text-align: right;margin: 10px;">
                                    <Button type="ghost" @click="clearAll('taskForm')">
                                        <Icon type="ios-checkmark" size="14"></Icon>
                                        清除
                                    </Button>
                                    <Button type="ghost" @click="saveTask">
                                        <Icon type="ios-checkmark" size="14"></Icon>
                                        保存
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align: center">
            </div>
        </Modal>
        <Row>
            <Col span="21">
                <div style="position:relative;margin-top: 10px;">
                    <Table :columns="tableDataList" :data="pageInfo.list" ref="table">

                    </Table>
                    <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                        <Spin size="large"></Spin>
                        <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                    </div>
                </div>
                <Page :total="this.pageInfo.total" placement="top"
                      :page-size-opts="pageSizeOpts"
                      show-elevator show-sizer show-total
                      @on-change="changePage"
                      @on-page-size-change="changePageSize"
                      style="text-align:left;margin:50px 0">
                </Page>
            </Col>
        </Row>

    </div>
</template>

<script>
    import store from 'store/';
    import {formatTime} from 'utils/index';
    import expandRow from './../task/task-table-expand.vue';

    export default {
        components: {expandRow},
        name: 'task',
        data() {
            return {
                task: {
                    id: '',
                    jobName: '',
                    jobGroup: '',
                    jobStatus: '',
                    cronExpression: '',
                    description: '',
                    beanClass: '',
                    springId: '',
                    methodName: '',
                    parameters: null,
                    isConcurrent: 0,
                    gmtCreate: '',
                    gmtModified: ''
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                taskModal: false,
                beanList: [],
                beanMethodList: [],
                concurrents: [{label: '并发运行', value: 1}, {label: '排队执行', value: 0}],
                tableDataList: [
                    {
                        type: 'expand',
                        width: "30",
                        ellipsis: 'true',

                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '名称',
                        key: 'jobName',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '状态',
                        key: 'jobStatus',
                        ellipsis: 'true',
                        width: 100,
                        render: (h, params) => {
                            const jobStatus = params.row.jobStatus;
                            if (jobStatus === '1') {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'ghost',
                                            loading: true,
                                            size: 'large'
                                        },
                                        style: {
                                            border: 'none',
                                            marginLeft: '-10px',
                                            color: 'blue'
                                        }
                                    }, ''),
                                ]);
                            }
                            else if (jobStatus === '0') {
                                return h('div', [

                                    h('Icon', {
                                        props: {
                                            type: 'ios-pause',
                                            color: 'red',
                                            size: '20'
                                        },
                                        style: {
                                            marginLeft: '6px'
                                        }
                                    }, ''),
                                ]);
                            }
                        }
                    },
                    {
                        title: '类全名',
                        key: 'beanClass',
                        ellipsis: 'true'
                    },
                    {
                        title: '方法',
                        key: 'methodName',
                        ellipsis: 'true',
                        width: 150,
                    },
                    {
                        title: '参数',
                        key: 'parameters',
                        ellipsis: 'true',
                        width: 150,
                    },
                    {
                        title: '操作',
                        width: '200',
                        key: 'action',
                        align: 'center',
                        ellipsis: 'true',
                        render: (h, params) => {
                            var jobStatus = params.row.jobStatus;
                            var node;
                            if (jobStatus === '0') {
                                node = h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.switchJobStatus(params.row.id, 'start')
                                        }
                                    },
                                }, '启动');
                            } else if (jobStatus === '1') {
                                node = h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.switchJobStatus(params.row.id, 'stop')
                                        }
                                    },
                                }, '停止')
                            }
                            return h('div', [
                                node,
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        disabled: params.row.jobStatus === '1' ? true : false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editTask(params.row);
                                        }
                                    },
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    },
                                }, '删除')
                            ]);

                        }//render
                    },//{
                ],//cloumn
            }
        },
        mounted() {
            var vue = this;
            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.listTask();
            this.listBeans();
        },
        methods: {
            openNewModal() {
                this.clearAll('taskForm');
                this.taskModal = true;
            },
            changePage(pageNum) {
                this.pageInfo.pageNum = pageNum;
                this.listTask();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listTask();
            },
            clearAll(refName) {
                this.beanMethodList = [];
                this.$refs[refName].resetFields();
            },
            changeSpringId() {
                if (this.task.springId) {
                    this.beanFullName(this.task.springId);
                }
            },
            listBeans() {
                store.dispatch('ListComponentsName').then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.beanList = data.payload;
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            beanFullName(beanName) {
                store.dispatch('GetClassFullName', {beanId: beanName}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.task.beanClass = data.payload;
                        this.beanMethodsList(beanName);
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            beanMethodsList(beanName) {
                store.dispatch('ListClassMethodName', {beanId: beanName}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.beanMethodList = data.payload;
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            editTask(row) {
                this.task = row;
                this.taskModal = true;
            },
            switchJobStatus(id, cmd) {
                store.dispatch('SwitchTaskStatus', {
                    id: id,
                    cmd: cmd
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('切换状态成功');
                        this.listTask();
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            listTask() {
                store.dispatch('ListTask', {
                    name: '',
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.pageInfo = data.payload;
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            saveTask() {
                if (!this.task.id) {
                    store.dispatch('AddTask', this.task).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('添加成功');
                            this.listTask();
                        } else {
                            this.$Message.error('加载失败');
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$Message.error({
                            content: err.data.error,
                            duration: 5,
                            closable: true
                        });
                    });
                } else {
                    store.dispatch('EditTask', this.task).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('编辑成功');
                            this.listTask();
                        } else {
                            this.$Message.error('加载失败');
                        }
                    }).catch(err => {
                        console.log(err)
                        this.$Message.error({
                            content: err.data.error,
                            duration: 5,
                            closable: true
                        });
                    });
                }
            },
            remove(id) {
                this.$Modal.confirm({
                    title: '删除任务',
                    content: '<p>点击确定1秒后将删除此任务</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteTask', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listTask();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(err => {
                                console.log("删除任务请求失败");
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            changeModalVisible() {

            },
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d}', false);
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d}', false);
            }
        }
    }
</script>


<style type="text/css" scoped>
    li {
        list-style-type: none;
    }

    .link-piece {
        margin: 10px 25px;
    }

    .echarts {
        border-radius: 4px;
        width: 100%;
        border: 1px solid rgba(255, 165, 0, 0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }

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