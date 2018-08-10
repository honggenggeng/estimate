<template>
  <div class="head">
    <mt-header :fixed="fixed" :title="headtitle" class="zy">
        <span slot="left" icon="back" v-show="lefrbtn" @click="goback">
            <img src="../img/fh.png" style="width:0.12rem;margin-left:0.15rem">
        </span>
        <span icon="more" slot="right" v-show="rightbtn" @click="rightxx">{{three}}</span>
    </mt-header>
  </div>
</template>

<script>
import {Header}  from 'mint-ui'
export default {
  data () {
    return {
      
    }
  },
  components : {
      MtHeader : Header ,
  },
  props:{
      lefrbtn:{type:Boolean,default:true},
      rightbtn:{type:Boolean,default:true},
      headtitle:{default:'嘀嘀嘀'},
    //   back:{default:"返回"},
      three:{default:'...'},
      fixed:{type:Boolean, default:true}
  },
  methods:{
      goback(){
          this.$router.back()
      },
      rightxx(){
          this.$emit('rightBtn')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .head{
        width:100%;
        height:0.6rem;
        background:#26a2ff;
        color:#FFF;
    }
    .zy{
        height:0.6rem
    }
    .mint-header{
        background:#26a2ff;
        color:#fff;
    }
    
</style>
<style>
    .mint-header-title{
        color:#fff;
        font-weight: 600;
        font-size: 0.18rem;
    }
</style>
