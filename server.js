const express=require('express')
const ACTIONS = require('./src/ACTIONS')
const app=express()
app.use(express.static('build'))
const PORT=3300 || process.env.PORT

const userMap={}
const server=app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})

const io=require('socket.io')(server)
const getAllConnectedClients=(roomId)=>{
    const clientMap=io.sockets.adapter.rooms.get(roomId)
    const clientList=Array
    .from(clientMap || [])
    .map((socketId)=>{
        return {
            socketId,
            username:userMap[socketId]
        }
    })
    return clientList
}
io.on('connection',(socket)=>{
    
    socket.on(ACTIONS.JOIN,({roomId,username})=>{
            console.log(`join ${roomId} ${username}`)
            userMap[socket.id]=username
            socket.join(roomId) 
            const clientList=getAllConnectedClients(roomId)
            clientList.forEach(({socketId})=>{
                io.to(socketId).emit(ACTIONS.JOINED,{
                    clientList,
                    username,
                    socketId:socket.id
                })
            })
            socket.on(ACTIONS.DISCONNECTING,()=>{
                    const rooms=[...socket.rooms]
                    rooms.forEach((roomId)=>{
                        socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                            socketId:socket.id,
                            username:userMap[socket.id]
                        })
                    })
                    delete userMap[socket.id]
                    socket.leave()
            })

            socket.on(ACTIONS.CODE_CHANGE,({code,roomId})=>{
                socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code})
            })
            socket.on(ACTIONS.SYNC_CODE,({code,socketId,lang})=>{
                io.to(socketId).emit(ACTIONS.SYNC_CODE,{code,lang})
            })
            socket.on(ACTIONS.PLATFORM_CHANGE,({roomId,language})=>{
                io.to(roomId).emit(ACTIONS.PLATFORM_CHANGE,{language})
            })
        })
    
})