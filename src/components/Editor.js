import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = CodeMirror(document.getElementById('realtime-editor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        scrollbarStyle: 'null'
      });
      editor.setSize(null, '100%');
      // Optional: Set initial content
      editor.setValue('const example = "Hello, CodeMirror!";');
      editorRef.current = editor;
    }
  }, []);

  return <div className="w-4/5 py-1 pl-4 h-full" id='realtime-editor'></div>;
};

export default Editor;
