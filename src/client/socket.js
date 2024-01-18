import {io} from 'socket.io-client'

export const initSocket=async()=>{
    
    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:16000,
        transports:['websocket']
    }
    return io('https://real-code-nexus-fdbp.onrender.com/',options)
}