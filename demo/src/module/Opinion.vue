<template>
  <div>
    <div class="opinion">
        <p class="idea">意见类型</p>
        <div>
            <ul style="float:left">
                <li v-for="(item,index) in list" class="li" :key="index" :style="{backgroundColor:item.backgroundColor,color:item.color}" @click="select(index)">{{item.center}}</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {} from 'mint-ui'
export default {
  data () {
    return {
        list:[
            {
            center:'吐槽界面1',
            backgroundColor:"#fff",
            color:'#000'
        }
        ],
        arr:['可以更好1','可以更好2','可以更好3','可以更好4','可以更好5','可以更好6','可以更好7']
    }
  },
  components:{

  },
  methods:{
    select(index,e){
        let self=this;
        var e=e||window.event
        
        console.log(this.list[index].color)
        var l=0
        for(var i in this.list){
            if(this.list[i].color=="#fff"){
                l++;
            }
        }
        console.log(l)
        if(this.list[index].color=="#fff"){
            this.list[index].backgroundColor='#fff'
            this.list[index].color='#000'
        }else{
            
            if(l>=2){
                return
            }else{
                this.list[index].backgroundColor='red'
                this.list[index].color='#fff'
            }   
        }
    },
    ajax(){
        let self=this
        $.ajax({
            url : "https://www.baidu.com/",
            type : "POST",
            contentType: "application/json;charset=utf-8",
            data : JSON.stringify({}),
            dataType : "text",
            success : function(result) {
             console.log(result)
            },
            error:function(msg){
                console.log(msg)
            }
         })
    },
  },
  mounted() {
      this.list=[]
      for(var i in this.arr){
          console.log(i)
          var obj={}
          obj.center=this.arr[i]
          obj.backgroundColor='#fff'
          obj.color="#000"
          this.list.push(obj)
      }
      console.log(this.list)
      this.ajax()
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    li{
        list-style: none;
        float: left;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        margin: 0.1rem 0.03rem;
        background: #fff;
        padding: 0rem 0.05rem;
    }
    .opinion{
        width:90%;
        min-height:2rem;
        background:#eee;
        margin-top:0.6rem;
        padding:5%;
    }
    .idea{
        -float:left;
        font-size: 0.18rem;
        width: 100%;
        text-align: left;
    }
</style>

