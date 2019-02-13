<template>
  <transition name="el-zoom-in-top">
    <div class="manage__card">
      <h1 class="manage__card-title"><i class="icon iconfont myhr-setting"></i>首页管理</h1>
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
                     @click="onEdit">编辑Metadata</el-button>
        </div>
        <div v-else>
          <el-form ref="addForm"
                   class="add-form edit-form"
                   label-position="top"
                   :rules="addRules"
                   :model="addForm">
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
                     @click="onSave">保存Metadata</el-button>

          <el-button class="button__custom"
                     @click="onCancel">取消</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { SET_META, SET_MENU } from '@/utils/constants'

export default {
  data () {
    return {
      addForm: {
        title: this.$store.state.meta.title,
        description: this.$store.state.meta.description,
        keywords: this.$store.state.meta.keywords
      },
      addRules: {
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
              delete this.canClick
            }).catch(err => {
              delete this.canClick
            })
        }
      });
    },
    onCancel () {
      const { title, description, keywords } = this.$store.state.meta;
      this.addForm.title = title;
      this.addForm.description = description;
      this.addForm.keywords = keywords;
      this.editing = false;
    }
  }
}
</script>
