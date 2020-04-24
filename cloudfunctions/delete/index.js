// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  return await db.collection('tasks').where(_.or([{
    projectId: event.a
  },{
    _id:event.a
  }])).update({
      data:{
        isDelete:true
      }
      })
}