const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
let dirName = path.join(__dirname, 'public')
let art_express = require('express-art-template')
let userJson = require('./dbuser.json')
let userListInfo = require('./userserver.js') 
app.disable('etag')
app.engine('art', art_express)
app.use(express.static(dirName))
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user/list', (req,res) => {
res.render('index.art', {
        userList : userListInfo.getAllUserList()
    })
})
//用户列表页面
app.use('/xzy/cool', (req, res) => {
       let page = req.query.page || 1
       let size = req.query.size || 10
     res.render('index.art', {
        data : userListInfo.getPageListInfo(page, size)
    })
})
//获取添加页面
app.get('/user/add', (req, res) => {
	res.render("useradd.art")
})
//添加接口
app.post('/user/add', (req, res) => {
	let data = userListInfo.adduser(req.body)
	res.redirect('/xzy/cool')

})
//删除借口
app.get('/user/del', (req, res) => {
	let id = req.query.id
	userListInfo.delUser(id)
	res.redirect('/xzy/cool')
})
//获取编辑详情接口
app.get('/user/edit', (req, res) => {
    let id = req.query.id
    let data = userListInfo.editUser(id)
    res.render('useredit.art', {
        editData: data
    })
})
//编辑数据写入json数据
app.post('/user/edit', (req, res) => {
    let data = userListInfo.editUserData(req.body)
    //成功跳转到列表页
    if(data.code == 1) {
        res.redirect('/xzy/cool') 
    }
})
app.listen(58888, () => {
    console.log('服务启动了')
})