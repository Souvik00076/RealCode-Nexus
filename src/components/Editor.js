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
  let language=null
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
  },[socketRef.current])
  return(
      <div className='w-full sm:w-[80%] px-4 py-2 h-full relative'>
      <div className='w-[100%] h-full' id='realtime-editor'>
      <Languages className='z-10' socketRef={socketRef}  roomId={roomId} onLanguageChange={(language)=>{
            editorRef.current.setValue(language)
      }} />
      </div>
      </div>

  )
};
export default Editor;