import React, { useState, useEffect, useRef } from 'react';
import '../App.scss'
import ACTIONS from '../ACTIONS';
import MESSAGES from '../MESSAGES';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript.js'
import python from 'highlight.js/lib/languages/python.js'
import php from 'highlight.js/lib/languages/php.js'
import ruby from 'highlight.js/lib/languages/ruby.js'
import sql from 'highlight.js/lib/languages/sql.js'
import swift from 'highlight.js/lib/languages/swift.js'
import xml from 'highlight.js/lib/languages/xml.js'


hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('swift', swift)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('python', python)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('php', php)

const Languages = ({socketRef,roomId,onLanguageChange}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [showList, setShowList] = useState(false)
  const dropdownRef = useRef(null)
  const topLanguages = [
    'JavaScript',
    'Python',
    'PHP',
    'Ruby',
    'Swift',
    'SQL',
    'XML'
  ]
  const handleLanguageChange = (language) => {    
    if(socketRef && socketRef.current){
    socketRef.current.emit(ACTIONS.PLATFORM_CHANGE,{
            roomId,
            language:language.toLowerCase()
    })
    setSelectedLanguage(language)
    setShowList(false)
    }
  }

  const toggleList = () => {
    setShowList(!showList)
  }
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowList(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])
  useEffect(()=>{
    if(socketRef.current){
      socketRef.current.on(ACTIONS.PLATFORM_CHANGE,({language})=>{     
      onLanguageChange(MESSAGES[language.toUpperCase()])
      setSelectedLanguage(language)  
      })
      socketRef.current.on(ACTIONS.SYNC_CODE,({code})=>{
        let str='JAVASCRIPT'
        if(code===null) str=MESSAGES['JAVASCRIPT']
        onLanguageChange(code || str)
        if(code){
        const languageDetected = hljs.highlightAuto(code).language
          topLanguages.forEach((item)=>{
          if(item.toUpperCase()===languageDetected.toUpperCase()){
            setSelectedLanguage(item)
             }
        })
      }

      })   
      socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
        console.log("On Code Change called")
          onLanguageChange(code)
      })
      }
    }
  ,[socketRef.current])
  return (
    <div  ref={dropdownRef}>
      <div className='z-10 absolute origin-top-right top-4 right-10'>
        <button
          type="button"
          onClick={toggleList}
          className="form-container text-white py-1 px-6"
        >
          {selectedLanguage || 'Javascript'}
        </button>
      </div>
      {/* Dropdown Content */}
      {showList && (
        <div className="z-10 origin-top-right absolute right-4 mt-14 w-56 ">
          <div className="py-1">
            {/* Scrollable list of top languages */}
            <div className="max-h-48 overflow-y-auto">
              {topLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageChange(language)}
                  className={`block w-full text-left px-4 py-2 text-sm leading-5 text-white`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Languages
