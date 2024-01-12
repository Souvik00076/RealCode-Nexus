import React, { useState, useEffect, useRef } from 'react';
import '../App.scss'
import ACTIONS from '../ACTIONS';
const Languages = ({socketRef,roomId}) => {
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
    setSelectedLanguage(language)
    setShowList(false)
    // You can perform additional actions based on the selected language
    console.log(language,"selected")
    socketRef.current.emit(ACTIONS.PLATFORM_CHANGE,{
            roomId,
            language:language.toLowerCase()
    })

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
