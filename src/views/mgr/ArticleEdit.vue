<template>
    <div>
        <Form ref="articleForm" :rules="articleRule" :model="article" :label-width="70" label-position="right">
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="typeList" label="类型">
                        <Select v-model="article.type" filterable>
                            <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="22">
                    <Form-item prop="title" label="文章标题">
                        <Input v-model="article.title" size="large" placeholder="请输入文章标题"/>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="categoriesList" label="分类">
                        <Select v-model="article.categoriesList" multiple filterable>
                            <Option v-for="item in categories" :value="item.name" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col span="2">
                    <Button type="ghost" shape="circle" icon="plus-circled" @click="categoryModel=true">添加分类</Button>
                </Col>

            </Row>
            <Row>
                <Col span="12" style="margin-right: 10px;">
                    <Form-item prop="tagsList" label="标签">
                        <Select v-model="article.tagsList" multiple filterable>
                            <Option v-for="item in tags" :value="item.name" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col span="2">
                    <Button type="ghost" shape="circle" icon="plus-circled" @click="tagModel=true">添加标签</Button>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item prop="path" label="访问路径">
                        <Input v-model="article.path" size="default" placeholder="请输入文章访问路径"/>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="22">
                    <Form-item prop="content">
                        <mavon-editor style="margin-top: 20px;position: static;" v-model="article.content"/>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="5" style="margin-left: 80px;">
                    <Form-item prop="allowComment" label="开启评论">
                        <iSwitch v-model="article.allowComment" size="large">
                            <span slot="open">允许</span>
                            <span slot="close">禁止</span>
                        </iSwitch>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item prop="allowPing" label="允许Ping">
                        <iSwitch v-model="article.allowPing" size="large">
                            <span slot="open">允许</span>
                            <span slot="close">禁止</span>
                        </iSwitch>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item prop="allowFeed" label="允许订阅">
                        <iSwitch v-model="article.allowFeed" size="large">
                            <span slot="open">允许</span>
                            <span slot="close">禁止</span>
                        </iSwitch>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Form-item>
                        <Button type="ghost" @click="goBack()">《 返回</Button>
                        <Button type="default" @click="clearAll('articleForm')">全部清空</Button>
                        <Button type="warning" v-if="article.status!='audit'"
                                @click="handleSubmit('draft','articleForm')"
                                style="margin-left: 15px">
                            保存为草稿
                        </Button>
                        <Button type="primary" v-if="article.status!='audit'"
                                @click="handleSubmit('audit','articleForm')"
                                style="margin-left: 15px">
                            提交审核
                        </Button>
                    </Form-item>
                </Col>
            </Row>
        </Form>

        <Modal v-model="categoryModel"
               title="添加分类"
               :loading="true"
               @on-ok="addCategory">
            <Form ref="categoryForm" :model="category" :label-width="60" label-position="right">
                <Row style="padding-left: 50px;">
                    <Col span="16">
                        <Form-item prop="name" label="名称">
                            <Input v-model="category.name" size="default" placeholder="请输入分类名称(必填)"/>
                        </Form-item>
                    </Col>
                </Row>
                <Row style="padding-left: 50px;">
                    <Col span="16">
                        <Form-item prop="description" label="描述">
                            <Input v-model="category.description" type="textarea" :autosize="true"
                                   placeholder="请输入分类描述(可不填)"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal v-model="tagModel"
               title="添加标签"
               :loading="true"
               @on-ok="addTag">
            <Form ref="tagForm" :model="tag" :label-width="60" label-position="right">
                <Row style="padding-left: 50px;">
                    <Col span="16">
                        <Form-item prop="name" label="名称">
                            <Input v-model="tag.name" size="default" placeholder="请输入标签名称(必填)"/>
                        </Form-item>
                    </Col>
                </Row>
                <Row style="padding-left: 50px;">
                    <Col span="16">
                        <Form-item prop="description" label="描述">
                            <Input v-model="tag.description" type="textarea" :autosize="true"
                                   placeholder="请输入标签描述(可不填)"/>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>

</template>
<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import {mavonEditor} from 'mavon-editor';
    import Cookies from 'js-cookie';
    import 'mavon-editor/dist/css/index.css';

    export default {
        data() {
            return {
                article: {
                    id: '',
                    title: '',
                    cover: '',
                    path: '',
                    type: '',
                    status: '',
                    authorId: '',
                    tags: '',
                    tagsList: [],
                    categories: '',
                    categoriesList: [],
                    hits: '',
                    commentsNum: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                },
                category: {
                    id: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parent: ''
                },
                tag: {
                    id: '',
                    name: '',
                    value: '',
                    type: '',
                    description: '',
                    sort: '',
                    parent: ''
                },
                categories: [],
                types: [
                    {name: '原创作品', value: 'original'},
                    {name: '转载', value: 'reshipment'},
                    {name: '翻译', value: 'translation'}
                ],
                tags: [],
                articleRule: {
                    title: [
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    categoriesList: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个分类', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个分类', trigger: 'change'}
                    ],
                    tagsList: [
                        {required: true, type: 'array', min: 1, message: '至少选择一个标签', trigger: 'change'},
                        {type: 'array', max: 3, message: '最多选择三个标签', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入文章正文', trigger: 'blur'},
                        {type: 'string', min: 5, message: '正文不能少于5字', trigger: 'blur'}
                    ]
                },
                categoryModel: false,
                tagModel: false,
                loginUser: {}
            }
        },//data
        components: {
            mavonEditor
        },
        mounted() {
            const vue = this;
            var id = this.$route.params.id;
            if (id) {
                this.articlePreview(id);
            }
            this.categoryList();
            this.tagList();
            var jsonString = Cookies.get('LOGIN-ADMIN');
            if (jsonString) {
                this.loginUser = JSON.parse(jsonString);
            }
        },
        methods: {
            addCategory() {
                setTimeout(() => {
                    this.category.type = 'category';
                    store.dispatch('CategoryAdd', this.category).then(res => { // 拉取user_info
                        var resp = res.data;
                        if (resp.success == true) {
                            this.category = {
                                id: '',
                                name: '',
                                value: '',
                                type: '',
                                description: '',
                                sort: '',
                                parent: ''
                            }
                            this.categoryList();
                            this.$Message.success('添加分类成功');
                        } else {
                            this.$Message.error('添加分类失败');
                        }
                    }).catch(() => {
                        this.$Message.error("添加分类异常");
                    })
                    this.categoryModel = false;
                }, 1000);
            },
            addTag() {
                setTimeout(() => {
                    this.tag.type = 'tag';
                    store.dispatch('TagAdd', this.tag).then(res => { // 拉取user_info
                        var resp = res.data;
                        if (resp.success == true) {
                            this.tag = {
                                id: '',
                                name: '',
                                value: '',
                                type: '',
                                description: '',
                                sort: '',
                                parent: ''
                            }
                            this.tagList();
                            this.$Message.success('添加标签成功');
                        } else {
                            this.$Message.error('添加标签失败');
                        }
                    }).catch(() => {
                        this.$Message.error("添加标签异常");
                    })

                    this.tagModel = false;
                }, 1000);
            },
            articlePreview(id) {
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data.payload;
                    var tags = article.tags.split(",");
                    var categories = article.categories.split(",");
                    article.tagsList = tags;
                    article.categoriesList = categories;
                    this.article = article;

                }).catch(() => {
                    console.log("请求文章详情失败");
                })
            },
            categoryList() {
                store.dispatch('CategoryList', {token: null}).then(res => { // 拉取user_info
                    var cates = res.data.payload;
                    this.categories = cates;

                }).catch(() => {
                    console.log("请求分类列表失败");
                })
            },
            tagList() {
                store.dispatch('FilterTagList', {token: null}).then(res => { // 拉取user_info
                    var tags = res.data.payload;
                    this.tags = tags;

                }).catch(() => {
                    console.log("请求标签列表失败");
                })
            },
            goBack() {
                this.$router.push({
                    path: '/admin/mgr/blog/article'
                });
            },
            handleSubmit(status, refName) {
                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        if (this.loginUser && this.loginUser.id) {
                            this.article.authorId = this.loginUser.id;
                        } else {
                            this.$Message.error('您未登录!');
                        }
                        this.article.status = status;
                        this.article.categories = this.article.categoriesList.join(",");
                        this.article.tags = this.article.tagsList.join(",");

                        var msg = status == 'audit' ? '提交审核' : '保存草稿';
                        if (!this.article.id) {
                            this.article.id = null;

                            store.dispatch('ArticlePublish', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success(msg + '成功!');
                                    this.$router.push({path: '/admin/mgr/blog/article'});
                                } else {
                                    this.$Message.error(msg + '失败!');
                                }
                            }).catch(() => {
                                this.$Message.error('提交失败!');
                            })
                        } else {
                            store.dispatch('ArticleEdit', {article: this.article}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success(msg + '成功!');
                                    this.$router.push({path: '/admin/mgr/blog/article'});
                                } else {
                                    this.$Message.error(msg + '失败!');
                                }
                            }).catch(() => {
                                this.$Message.success('提交失败!');
                            })
                        }
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();
            },
            handleAdd() {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove(index) {
                this.formDynamic.items.splice(index, 1);
            },
        }

    }
</script>
<style scoped>

</style>


