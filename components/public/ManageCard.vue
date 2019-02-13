<template>
  <transition name="el-zoom-in-top">
    <div class="manage__card">
      <h1 class="manage__card-title"><i class="icon iconfont myhr-setting"></i>{{addForm.name}}管理</h1>
      <div class="toggle-icon"
           @click="onToggle">
        <i class="icon iconfont myhr-upward"
           :class="showCard ? 'hide' : ''"></i>
      </div>
      <div v-show="showCard">
        <div v-if="!editing">
          <ul class="manage__card-meta">
            <li>
              <h2>Title</h2>
              <div>{{addForm.title}}</div>
            </li>
            <li>
              <h2>Description</h2>
              <div>{{addForm.description}}</div>
            </li>
            <li>
              <h2>Keywords</h2>
              <div>{{addForm.keywords}}</div>
            </li>
          </ul>
          <el-button class="button__custom"
                     type="primary"
                     v-if="!editing"
                     @click="show = true">新增文档</el-button>

          <el-button class="button__custom"
                     v-if="!editing"
                     @click="onEdit">编辑分类</el-button>

          <el-button class="button__custom button__danger"
                     type="danger"
                     @click="onDelete"
                     v-if="!editing">删除分类</el-button>

        </div>
        <div v-else>
          <el-form ref="addForm"
                   class="add-form  edit-form"
                   label-position="top"
                   :rules="addRules"
                   :model="addForm">
            <el-form-item label="分类名称"
                          :inline-message="true"
                          prop="name">
              <el-input v-model="addForm.name"
                        autocomplete="off"></el-input>
            </el-form-item>

            <!-- <div class="tip">
            以下项目为Metadata，这部分项目本身并不出现在页面中，主要的目的在于供爬虫进行索引和收录
          </div> -->

            <el-form-item label="url"
                          :inline-message="true"
                          prop="route">
              <div class="clearfix">
                <div class="left">{{baseApi}}</div>
                <div class="left-input">
                  <el-input v-model="addForm.route"
                            autocomplete="off"></el-input>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="Title"
                          :inline-message="true"
                          prop="title">
              <el-input v-model="addForm.title"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Description(内容描述)"
                          :inline-message="true"
                          prop="description">
              <el-input type="textarea"
                        v-model="addForm.description"
                        autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Keywords"
                          :inline-message="true"
                          prop="keywords">
              <el-input v-model="addForm.keywords"
                        autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <el-button class="button__custom"
                     type="primary"
                     @click="onSave">保存分类</el-button>

          <el-button class="button__custom"
                     @click="onCancel">取消</el-button>
        </div>
      </div>
      <add-document :show.sync="show" />
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { SET_META, SET_MENU } from '@/utils/constants'
import AddDocument from '@/components/public/AddDocument'

export default {

  data () {
    const validate = (rule, value, callback) => {
      if (/^\s*$/.test(value)) {
        callback(new Error('url不能为空'));
      } else if (!/^\w+$/.test(value)) {
        callback(new Error('请输入数字、英文字母、_'));
      } else {
        callback();
      }
    };
    return {
      baseApi: process.env.BASE_API === 'prod' ? 'https://doc.mayihr.com/' : 'https://doc.mayitest.cn/',
      addForm: {
        name: this.$store.state.meta.name,
        title: this.$store.state.meta.title,
        route: this.$store.state.meta.route,
        description: this.$store.state.meta.description,
        keywords: this.$store.state.meta.keywords
      },
      addRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~10个字符', trigger: 'blur' }
        ],
        route: [
          { validator: validate, trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~20个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入meta标题', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入1~20个字符', trigger: 'blur' }
        ],
        description: [
          { max: 250, message: '最多250个字符', trigger: 'blur' }
        ],
        keywords: [
          { max: 50, message: '最多50个字符', trigger: 'blur' }
        ]
      },
      show: false,
      showCard: true,
      editing: false
    }
  },
  components: {
    AddDocument
  },
  methods: {
    onToggle () {
      this.showCard = !this.showCard
    },
    onEdit () {
      this.editing = true;
    },
    onSave () {
      this.$refs.addForm && this.$refs.addForm.validate((valid) => {
        if (valid && !this.canClick) {
          this.canClick = true;
          this.$axios.post(`/menu/update/${this.$store.state.meta.id}`, this.addForm)
            .then(res => {
              this.$store.commit(SET_META, res.meta);
              this.$store.commit(SET_MENU, res.menu);
              this.editing = false;
              this.$router.replace(`/${res.meta.route}`);
              delete this.canClick
            }).catch(err => {
              delete this.canClick
            })
        }
      });
    },
    onCancel () {
      const { title, description, keywords, name, route } = this.$store.state.meta;
      this.addForm.name = name;
      this.addForm.route = route;
      this.addForm.title = title;
      this.addForm.description = description;
      this.addForm.keywords = keywords;
      this.editing = false;
    },
    onDelete () {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!!this.canDel) return;
        this.$axios.post(`/menu/destroy/${this.$store.state.meta.id}`)
          .then(res => {
            delete this.canDel;
            this.$router.replace('/');
          }).catch(err => {
            delete this.canDel;
          });
      }).catch(() => {
        delete this.canDel;
      });
    }
  }
}
</script>

<style scoped lang='scss'>
.button__danger {
  float: right;
}
.upload {
  width: 348px;
}
.tip {
  width: 320px;
  margin: 20px 0;
}
.left {
  float: left;
  width: 145px;
}
.clearfix {
  width: 320px;
  float: left;
}
</style>
