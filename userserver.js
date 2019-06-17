/**
 * 所有用户列表
 */
const path = require('path')
const fs = require('fs')
const Mock = require('mockjs')
let dirName = path.join(__dirname, 'dbuser.json')
let dbuser = require('./xzy.json')
function getAllUserList() {
    let xzyData = {}
    xzyData.user = []
    let data = Mock.mock({
        'xzy|500':[
            {
                'id|+1':1000,
                'name':'@cname',
                'address': '@county(true)',
                'email':'@email("inossem.com")'
            }
        ]
    })
    xzyData.user.push(...data.xzy)
    // #region
    fs.writeFile(path.join(__dirname, 'xzy.json'), JSON.stringify(xzyData), {encoding: 'utf8'}, () => {
    })
    // #endregion
    return xzyData.user
    
}
//#region 列表页数据
function getPageListInfo(page, size) {
	let total = dbuser.user.length
    if(typeof parseInt(page) != 'number' || page < 1) {
        return {
            code: 0,
            msg:'page参数类型不合法'
        }
    }
    if(typeof parseInt(page) != 'number' || size < 1) {
        return {
            code: 2,
            msg:'size参数类型不合法'
        }    
    }
    return {
        code: 1,
        msg:'数据请求成功',
        userList: dbuser.user.slice((page-1)*size, page*size),
        page: page,
        size: size,
        total: total
    }
}
//#endregion
//#region添加数据
function adduser(user) {
	dbuser || {}
	dbuser.user ||  []
	let msg = []
	let num = 0
	for(var key in user) {
		if(!user[key]) {
			num += 1
			msg.push(key) 
		}
    }
    if(num > 0) {
			return {
				msg: msg.join(',') + '不能为空',
				code: 2
			}
		} else {
			let obj = Object.assign({}, user, {id: Date.now()})
			dbuser.user.unshift(obj)
			_saveData(dbuser)
			return {
				msg: '添加成功',
				code: 1
			}
		}
	}
	function _saveData(jsondata) {
	fs.writeFile(path.join(__dirname, 'xzy.json'), JSON.stringify(jsondata), {encoding: 'utf8'}, () => {
    })
  }
//endregion
//#region 删除数据
function delUser(id) {
    let index = dbuser.user.findIndex(a => a.id == id) 
    dbuser.user.splice(index, 1) 
    _saveData(dbuser)
}
//#endregion

//#region
function editUser(id) {
    let index = dbuser.user.findIndex(a => a.id == id) 
    var data = dbuser.user[parseInt(index)] 
    return data
}
function editUserData(data) {
    let index = dbuser.user.findIndex(a => a.id == data.id)
    dbuser.user[parseInt(index)] =  data
    _saveData(dbuser)
    return {
        code:1,
        msg: '修改成功'
    }

}
//#endregion
module.exports = {
    getAllUserList : getAllUserList,
    getPageListInfo : getPageListInfo,
    adduser : adduser,
    delUser : delUser,
    editUser : editUser,
    editUserData : editUserData
}