<template>
  <div class="opinion0">
    <zy-header :headtitle='$route.meta.title' three="意见与反馈" :rightbtn='false' :fixed='false'></zy-header>
    <div class="big" ref="Big">
    <div class="opinion">
        <p class="idea">意见类型</p>
        <div>
            <ul style="float:left;margin-bottom: 0.1rem;min-height: 1rem;">
                <li v-for="(item,index) in list" class="li" :key="index" :style="{backgroundColor:item.backgroundColor,color:item.color}" @click="select(index)">{{item.type}}</li>
            </ul>
            <div style="width: 100%; float: left;">
                <p class="you">您的反馈意见</p>
                <p class="thod">您还可以输入<span style="color:red;">{{num}}</span>个字</p>
            </div>
        </div>
    </div>
    <div style="padding:0.1rem;background:#fff">
        <textarea cols='2' rows='7' class="area" placeholder="写下您的宝贵意见" :maxlength='120' v-model="value"></textarea>
    </div>
    <div class="plus">
        <div class="small">
            <p>+</p>
        </div>
        <p class="img">0/4</p>
    </div>
    <div class="phone">您的手机号</div>
    
    <input class="tel" type="tel" v-model="phone" placeholder="请填写您的手机号"  :maxlength='11'/>
    <div class="btnn" @click="btn">
        提交
    </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
        list:[
            {
                center:'吐槽界面1',
                backgroundColor:"#fff",
                color:'#999'
            }
        ],
        arr:[],
        value:'',
        num:120,
        phone:'',
        }
    },
    watch:{
        
        value:function(){//实时监听 当exec发生变化时执行所对应的函数
            let self=this
            self.num=120-(self.value.length)
            console.log(self.value)
        }
    },
    components:{
        MessageBox
    },
    methods:{
        // select(index,e){//选择两个或者两个以上
        //     let self=this;
        //     var e=e||window.event
            
        //     console.log(this.list[index].color)
        //     var l=0
        //     for(var i in this.list){
        //         if(this.list[i].color=="#fff"){
        //             l++;
        //         }
        //     }
        //     console.log(l)
        //     if(this.list[index].color=="#fff"){
        //         this.list[index].backgroundColor='#fff'
        //         this.list[index].color='#999'
        //     }else{
                
        //         if(l>=2){
        //             return
        //         }else{
        //             this.list[index].backgroundColor='red'
        //             this.list[index].color='#fff'
        //         }   
        //     }
        // },
        select(index){
            let self= this
            for (var i in this.list){
                this.list[i].backgroundColor='#fff'
                this.list[i].color="#999"
            }
            this.list[index].backgroundColor='#26a2ff'
            this.list[index].color="#fff"
        },
        ajax(){
            let self=this
            // var url='http://118.89.27.88:8080/zyyxd/yxdAdvise/adviseSubmit.do'
            var  url="http://118.89.27.88:8080/zyyxd/yxdAdvise/searchYxdAdviseType.do"
            $.ajax({
                type:"post",    //请求方式
                async:true,    //是否异步
                url:url,
                dataType:"json",    //跨域json请求一定是jsonp
                data:JSON.stringify({}),    //请求参数
                success: function(data) {
                    console.log('成功:',data)
                    self.arr=data.yxdAdviseTypeVOList
                    self.chzi()
                },
                error:function(data) {
                    console.log('失败:',data)
                }
            });
        },
        chzi(){
            let self= this
            for(var i in this.arr){
                var obj={}
                obj.type=this.arr[i].type
                obj.id=this.arr[i].id
                obj.backgroundColor='#fff'
                obj.color="#999"
                this.list.push(obj)
            }
            this.list[0].backgroundColor='#26a2ff'
            this.list[0].color="#fff"
            this.height()
        },
        btn(){
            let self=this
            if(self.phone.length>1){
                if(/^1[3|4|5|6|7|8|9]\d{9}$/.test(self.phone)){

                }else{
                    MessageBox('提示', '手机号码不正确');
                    return
                }
            }
            if(self.value.length<=0){
                MessageBox('提示', '请写下您宝贵的意见');
                return
            }
            var typeone=''
            for(var i in this.list){
                if(this.list[i].backgroundColor=='#26a2ff'){
                    typeone=this.list[i].id
                }
            }
            console.log("dddddd",typeone)
            var  url="http://118.89.27.88:8080/zyyxd/yxdAdvise/adviseSubmit.do"
            $.ajax({
                type:"post",    //请求方式
                async:true,    //是否异步
                url:url,
                dataType:"json",    //跨域json请求一定是jsonp
                data:JSON.stringify({
                    "typeId":typeone,
                    "advContent":self.value,
                    "advPhone":self.phone
                }),    //请求参数
                success: function(data) {
                    console.log('成功:',{
                            "typeId":typeone,
                            "advContent":self.value,
                            "advPhone":self.phone
                        })
                    if(data.code==0){
                        
                        MessageBox.alert('哇，反馈建议提交成功。棒棒哒~').then(action => {
                            self.$router.push({name:'Opinion0'})
                        });
                    }else{
                        MessageBox.alert(data.desc).then(action => {

                        });
                    }
                },
                error:function(data) {
                    console.log('失败:',data)
                }
            });
        },
        height(){
            let self=this
            var innerHeight = window.innerHeight || document.documentElement.clientinnerHeight || document.body.clientinnerHeight
            var big=document.querySelector(".big")
            var height=innerHeight-self.$refs.Big.offsetTop
            console.log(height)
            big.style.height=height+'px'
            big.style.backgroundColor='#eee'
        },
    },
    mounted() {
        this.list=[]
        this.arr=[]
        this.value=''
        this.num=120
        this.phone=''
        this.ajax()
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .opinion0{
        height:100%;
        width:100%;
        background:#eee;
        float: left;
    }
    li{
        font-size: 0.14rem;
        border-radius: 0.01rem;
        list-style: none;
        float: left;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        margin: 0.1rem 0.08rem;
        background: #fff;
        padding: 0rem 0.05rem;
    }
    .opinion{
        width:90%;
        min-height:1.5rem;
        background:#eee;
        -margin-top:0.6rem;
        padding:5% 5% 2.8%;
        float: left;
    }
    .idea{
        -float:left;
        font-size: 0.16rem;
        width: 100%;
        text-align: left;
    }
    .you{
        color: #000;
        width: 50%;
        font-size: 0.16rem;
        float: left;
    }
    .thod{
        width: 50%;
        float: right;
        text-align: right;
    }
    .area{
        width:96%;
        font-size:0.15rem;
        border:none;
        cursor:default;
        -webkit-appearance:none;
        -webkit-tap-heighlight-color:rgba(0,0,0,0);
        background:transparent;
        outline:none;
        resize:none;
        padding: 0.1rem 0.1rem 0 0.05rem; 
    }
    .plus{
        width: 100%;
        height: 0.5rem;
        padding: 0.1rem;
        padding-top:0;
        -border-bottom:1px solid #eee;
        background:#fff;
        display: none;
    }
    .small{
        width: 0.5rem;
        height: 0.5rem;
        border: 1px solid #999;
        line-height:0.5rem;
        text-align:center;
        float:left;
    }
    .img{
        height: 0.2rem;
        width: 20%;
        float: right;
        margin-top: 0.3rem;
        text-align:center;
        font-size:0.2rem;
    }
    .phone{
        width: 100%;
        height: 0.45rem;
        background: #eee;
        line-height:0.45rem;
        margin-left:5%;
        color:#000;
        font-size:0.16rem;
        -border-top: 1px solid #999;
        -border-bottom: 1px solid #999;
    }
    .tel{
        width: 100%;
        height: 0.5rem;
        border: none;
        outline: none;
        font-size: 0.16rem;
        padding-left:5%;
        -border-bottom:1px solid #999;
        border-bottom: 1px solid #eee;
    }
    .btnn{
        width: 88%;
        height: 0.45rem;
        line-height: 0.45rem;
        text-align: center;
        background: #26a2ff;
        margin: 0.2rem auto;
        color: #fff;
        font-size: 0.18rem;
        letter-spacing: 0.1rem;
        border-radius: 0.25rem;
    }
</style>
