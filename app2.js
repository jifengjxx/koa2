const Koa = require('koa');
const Router = require('@koa/router');
const ejs = require('ejs');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const static = require("koa-static")
const { join } = require('path');
//创建koa实例
const app = new Koa();
const router = new Router();

app.use(static(__dirname+"/static"))
app.use(bodyParser());
app.use(
    views("pages", {
        map:{ html: "ejs"}
    })
)

//配置路由
router.post("/save", async (ctx, next) =>{
    let data = ctx.request.body;
    ctx.body = data;
})

router.get("/", async (ctx, next)=>{ 
    const txt = '路由数据txt'
    console.log("路由级中间件1")
    //ctx.body = "路由级中间件1";
     await ctx.render("index", { txt })
    //await next(); //控制先进后出的机制 
})

router.get("/", async (ctx, next)=>{ 
    console.log("路由级中间件2")
    ctx.body = "路由级中间件2"; 
    //await next(); //控制先进后出的机制 
})


//中间引擎  洋葱模型 先进后出 和栈很像  ctx 上下文 操作先进后出  有控制先进后出的机制   有提前结束的机制
//中间件1  应用级中间件
const m1 = async(ctx, next) =>{
    ctx.state.commondata = "我是公共数据，每个页面都可以使用"
    console.log("应用级中间件")
    console.log(1);
    await next();  //控制先进后出的机制 
    console.log(6)
    //错误的捕获
    if(ctx.status == 404){
        ctx.body = "404"
    }
}
//中间件2  应用级中间件
const m2 = async(ctx, next) =>{
    console.log("应用级中间件")
    console.log(2);
    await next(); //控制先进后出的机制 
    console.log(5)
}

//中间件3  应用级中间件
const m3 = async(ctx, next) =>{
    console.log("应用级中间件")
    console.log(3);
    await next(); //控制先进后出的机制 
    console.log(4)
}

app.use(m1);
app.use(m2);
app.use(m3);
app.use(router.routes())


app.listen(3000);
/**
 * //中间件的类型
 * 应用级中间件   vue全局导航守卫   app.use()来使用
  路由级中间件   
  错误处理中间件
  第三方中间件 koa-bodyparser
 */

 /**
  * 模板渲染引擎 ejs koa-swig  npm i ejs  npm i koa-views
  * 
  */
