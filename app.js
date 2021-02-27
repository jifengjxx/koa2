const Koa = require('koa');
const Router = require('@koa/router')
//创建实例
const app = new Koa();
const router = new Router();


//配置路由
router.get("/:id", async ctx =>{ 
    //动态路由
    //http://localhost:3000/123
    console.log(ctx.params.id)
    ctx.body ="路由 主页面"
})
router.get("/about", async ctx =>{
    console.log(ctx.request.query);//{ title: 'my', age: '18' }
    console.log(ctx.request.querystring)//title=my&age=18
    ctx.body ="路由 介绍页面"
})

//创建一个中间件
app
    .use(router.routes())
   .use(router.allowedMethods())
// .use(async ctx =>{
//     ctx.body = 'hello world'
// })

app.listen(3000);