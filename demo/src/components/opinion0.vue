<template>
  <div class="opinion0">
    <zy-header :headtitle='$route.meta.title' three="意见与反馈" @rightBtn="rightBtn" :fixed='false'></zy-header>
    <div class='center' v-if='flge'>近期无评价记录</div>
    <div class="opinion" ref='op' v-if="!flge">
      <div class="son" v-for="(item,index) in opone" :key="index">
        <!-- <p class="dian"></p> -->
        <p class="size">
          {{item.advContent}}
        </p>
        <p class="right" style="" >
          <img src="../img/xll.png" style="width:0.1rem" @click="pulldown(index)" class="Img"/>
        </p>
        <p class="time">{{item.createDateShow}}</p>
        <p class="da" v-if="item.pull" v-for='(value,index2) in push' :key="index2">
          <span style='display: inline-block; width: 80%;text-align: left;'>{{value.advContent}}</span>
          <span style='display: inline-block; width: 100%;text-align: right;'>{{value.createDateShow}}</span>
        </p>
      </div>
      <div class="dxian">我也是有底线的~</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      opone:[],
      da:false,
      flge:false,
      push:[]
    }
  },
  methods:{
    rightBtn(){
      this.$router.push({name:'Opinion1'})
    },
    pulldown(index,e){
        let self=this
        var e=e||window.event
        var right=document.querySelectorAll('.Img')
        if(this.opone[index].pull==false){
          for(var l in self.opone){
            self.opone[l].pull=false
            right[l].style.transform='none'
          }
            self.opone[index].pull=true
            e.target.style.transform='rotate(90deg)'
        }else{
          this.opone[index].pull=false
          e.target.style.transform='rotate(0deg)'
        }
        self.push=[]
        var url="http://118.89.27.88:8080/zyyxd/yxdAdvise/hisAdviseChild.do"
       $.ajax({
          type:"post",    //请求方式
          async:true,    //是否异步
          url:url,
          dataType:"json",    //跨域json请求一定是jsonp
          data:JSON.stringify({
            "empNum":"001155",
            'oldId':self.opone[index].oldId
          }),    //请求参数
          success: function(data) {
            for(var i in data.yxdAdviseFollowList){
              var obj={}
              obj.advContent=data.yxdAdviseFollowList[i].advContent
              obj.createDateShow=data.yxdAdviseFollowList[i].createDateShow
              self.push.push(obj)
            }
          },
          error:function(data) {
              console.log('首贴失败:',data)
          }
        });
    },
    getst(){
      let self=this
      var url="http://118.89.27.88:8080/zyyxd/yxdAdvise/hisAdviseOld.do"
       $.ajax({
          type:"post",    //请求方式
          async:true,    //是否异步
          url:url,
          dataType:"json",    //跨域json请求一定是jsonp
          data:JSON.stringify({"empNum":"001155"}),    //请求参数
          success: function(data) {
              console.log('首贴成功:',data)
              for(var i in data.yxdAdviseFirstList){
                var obj={}
                obj.advContent=data.yxdAdviseFirstList[i].advContent
                obj.createDateShow=data.yxdAdviseFirstList[i].createDateShow
                obj.oldId=data.yxdAdviseFirstList[i].advId
                obj.pull=false
                self.opone.push(obj)
              }
              console.log(self.opone)
              if(self.opone.length==0){
                self.flge=true
              }
              setTimeout(function(){
                self.setheight()
              },300)
          },
          error:function(data) {
              console.log('首贴失败:',data)
          }
      });
    },
    setheight(){
      let self=this
      // window.onresize=function(){
        var innerHeight = window.innerHeight || document.documentElement.clientinnerHeight || document.body.clientinnerHeight
        var opinion = document.querySelector(".opinion")
        var height=innerHeight-self.$refs.op.offsetTop
        console.log(innerHeight,height)
        opinion.style.height=height+'px'
      // }
    },
  },
  mounted() {
    let self=this
    this.opone=[]
    this.da=false
    this.push=[]
    this.flge=false
    this.getst()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .opinion0{
        height:100%;
        width:100%;
        background:#eee;
    }
    .center{
        margin-top: 1rem;
        text-align: center;
    }
    .opinion{
      width:100%;
      min-height:0.5rem; 
      background: #fff;
      float: left;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .son{
      margin: 0rem 0.1rem 0.1rem 0.2rem;
      float: left;
      width: 95%;
      border-top: 0.01rem solid #ccc;
      background: #ffffff;
      padding-top: 0.1rem;
    }
    .size{
      width: 80%;
      float: left;
    }
    .right{
      width: 10%;
      float: right;
      font-size: 0.2rem;
      margin-top: 0.3rem;
      text-align: center;
      /* transition: all 0.1s; */
      /* transform-origin: center; */
      
    }
    .time{
      float: right;
      width: 100%;
      text-align: left;
      -margin-right: 0.4rem;
      margin-top: 0.1rem;
    }
    .da{
      float: left;
      padding-top: 0.1rem;
      width: 90%;
      /* display: none; */
      background: rgb(230, 240, 250);
      margin-top: 0.1rem;
      padding: 0.05rem 0.1rem;
      border-radius: 0.02rem;
    }
    .dian{
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 0.05rem;
        background: #999;
        float: left;
        margin-top: 0.4rem;
        margin-right: 0.5rem;
    }
    .Img{
      transition: all 0.1s;
      transform-origin: center;
    }
    .dxian{
      width: 100%;
      height: 0.3rem;
      text-align: center;
      float: left;
      line-height: 0.3rem;
      color: #999;
      background: #eee;
    }
</style>
