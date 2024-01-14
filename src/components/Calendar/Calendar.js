import React, { useState } from 'react';
import { format, formatISO } from 'date-fns';
import { getTimezoneOffset, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
import Modal from 'components/Modal/Modal';
import Input from 'components/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { enUS, fr, de, it } from 'date-fns/locale';
export default function CalendarPicker({name, value, error, onChange}) {

  const [isOpenDatePicker, setIsOpenDatePicker] = React.useState(false); 
  const [style, setStyle] = useState({})
  require('react-day-picker/dist/style.css');
    function trimValue(rawValue) {
      if(rawValue){
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const convertedDate = zonedTimeToUtc(rawValue, timeZone)
        const formattedDate = formatISO(convertedDate)
        return formattedDate;
      }
      return  ''
    }
    function trimForUi(rawValue){
      const initial = trimValue(rawValue)
      if(initial) {
        return format(new Date(initial),'PP')
      }
      return initial
    }
  const newValue = trimValue(value)
    const handleDateSelect = (date) => {
    const tempValue = trimValue(date)
    onChange(tempValue)
    setIsOpenDatePicker(false);
  };
  const setCoordinates = (x, y) => {
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
    };
  };
  function handleClick(e) {
    e.preventDefault(); 
    const inputRect = e.target.getBoundingClientRect();
    const modalWidth = 400; 
    const modalHeight = 400;
  
    const x = Math.min(inputRect.left, window.innerWidth - modalWidth);
    const y = Math.min(inputRect.bottom, window.innerHeight - modalHeight);
  
    const newStyle = setCoordinates(x, y);
    setStyle(newStyle);
    setIsOpenDatePicker(true);
  }

  const { t, i18n } = useTranslation();

  const handleLocale = () => {
    switch (i18n.language) {
      case 'de':
        return de;
      case 'fr':
        return fr;
      case 'it':
        return it;
      default:
        return enUS;
    }
  };

  const locale = handleLocale();

  return (
    <div>
      <Input
      name={name}
        type='text'
        value={trimForUi(value)} 
        onClick={handleClick}
        placeholder='pick a date'
        endIcon={<FontAwesomeIcon icon={faCalendar}/>}
        error={error?true:false}
        readOnly={true}
      />
      <Modal style={style} isOpen={isOpenDatePicker} onClose={() => setIsOpenDatePicker(false)}>
        <DayPicker
          mode='single'
          // localeUtils={localeUtils}
          locale={locale}
          selected={value}
          onSelect={handleDateSelect} 
          className=' bg-white rounded-xl p-4'
        />
      </Modal>
    </div>
  );
}
