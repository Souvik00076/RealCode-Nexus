import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/php/php';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/perl/perl';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../ACTIONS';
import MESSAGES from '../MESSAGES';
import './style.scss'
import Languages from './Languages';
const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);

  
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = CodeMirror(document.getElementById('realtime-editor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        scrollbarStyle: 'null'
      });
      editorRef.current.setSize(null, '100%');
      editorRef.current.on(ACTIONS.CHANGE,(instance,changes)=>{
        const {origin}=changes
        const code=instance.getValue()
        console.log('onCodeChange called')
        onCodeChange(code)
        if(origin!==ACTIONS.SET_VALUE){
          socketRef.current.emit(ACTIONS.CODE_CHANGE,{
            code,
            roomId
          })
      }
      })
    }
  }, []);
  useEffect(()=>{
      if(socketRef.current){
        socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
          editorRef.current.setValue(code)
        })
        socketRef.current.on(ACTIONS.SYNC_CODE,({code})=>{
          let str=''
          if(code===null) str='const str=\' Welcome  to real-code nexus\''
          editorRef.current.setValue(code || str)
        })
        socketRef.current.on(ACTIONS.PLATFORM_CHANGE,({language})=>{
          let str=MESSAGES[language.toUpperCase()]
          editorRef.current.setOption('mode', language === 'javascript' ? { name: 'javascript', json: true } : language);
          editorRef.current.setValue(str)
        })
      }

      return ()=>{
        socketRef.current.off(ACTIONS.CODE_CHANGE)
        socketRef.current.off(ACTIONS.PLATFORM_CHANGE)
      }
  },[socketRef.current])
  return(
      <div className='w-4/5 px-4 py-2 h-full relative'>
      <div className='w-[100%] h-full' id='realtime-editor'>
      <Languages className='z-10' socketRef={socketRef} roomId={roomId}/>
      </div>
      </div>

  )
};
export default Editor;