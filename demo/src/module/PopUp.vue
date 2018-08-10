<template>
  <div v-if="isshow">
    <div class="shade"></div>
    <div class="frame">
      <p class="hint">温馨提示</p>
      <p class="bey">{{matter}}</p>
      <div class="button" v-if="jud" >
        <p class="one" @click="affirm">确定</p><!---->
      </div>
      <div class="button" v-if="!jud">
        <p class="close" @click="affirm">取消</p>
        <p class="goon" @click="keep">继续</p>
      </div>
    </div>
  </div>
</template>

<script>
// import {Header}  from 'mint-ui'
export default {
  data () {
    return {
      
    }
  },
  components : {
    //   MtHeader : Header ,
  },
  props:{
    isshow:{default:false,type:Boolean},
    jud:{default:true,type:Boolean},
    matter:''
  },
  methods:{
     affirm(){
        let self=this
        self.$emit("affirms")
        self.$emit('update:jud',true)
        //当在子组件中出现self.$emit("update:jud",true)时  在父组件中在给jud传值时要用jud.sync绑定下 
        //也就是说父组件需要让子组件改变子组件的数据时 但是父组件也可以通过给子组件传值来改变其子组件数据的值
     },
     keep(){
        let self=this
        self.$emit("affirms")
        self.$emit('update:jud',true)
     },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .shade{
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index:1000;
      background:#000;
      opacity: 0.5;
    }
    .frame{
      width:70%;
      padding:0 0.2rem;
      -min-height:2rem;
      background:#fff;
      position:fixed;
      z-index: 1001;
      top: 20%;
      left: 50%;
      margin-left: -40%;
      border-radius: 0.1rem;
    }
    .hint{
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      font-weight: bold;
      font-family: cursive;
      border-bottom: 1px solid #999;
    }
    .bey{
      margin-top: 0.2rem;
      margin-bottom:0.2rem;
    }
    .button{
      width:100%;
      -height:0.5rem;
      margin-bottom:0.2rem;
      float:left;
    }
    .one{
        min-width: 30%;
        display: inline-block;
        height: 0.4rem;
        background: blue;
        border-radius: 0.2rem;
        color: #fff;
        line-height: 0.4rem;
    }
    .close{
      min-width: 30%;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #999;
      border-radius: 0.3rem;
      float: left;
      margin-left: 0.3rem;
      color:#fff;
    }
    .goon{
      min-width: 30% !important;
      height: 0.4rem;
      line-height: 0.4rem;
      background: blue;
      border-radius: 0.3rem;
      float: right;
      margin-right: 0.3rem;
      color:#fff;
    }
</style>
