<template>
  <div>
    <Header></Header>
    <br>
    <div class="mblog">
      <h2 class="mtitle">{{ blog.title }}</h2>
      <div class="edit" v-show="ownBlog">
        <el-link icon="el-icon-edit">
          <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑文章</router-link>
        </el-link>
      </div>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>

</template>

<script>
import Header from "@/components/Header";
import "github-markdown-css/github-markdown.css"

export default {
  name: "BlogDetail",
  components: {Header},
  data() {
    return {
      blog: {
        id: '',
        title: '',
        content: ''
      },
      ownBlog: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    if (blogId) {
      this.$axios.get('/blogs/' + blogId).then(res => {
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title

        var MarkdownIt = require("markdown-it")
        var md = new MarkdownIt()
        var result = md.render(blog.content)
        _this.blog.content = result

        _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
      })
    }
  }
}

</script>

<style scoped>
.mtitle {
  text-align: center;
}

.edit {
  text-align: right;
}

.mblog {
  box-shadow: 0px 2px 12px 0 rgba(0, 0, 0, .5);
  padding: 20px;
}


</style>