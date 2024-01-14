import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useMemo, useState } from "react";
import Modal from "components/Modal/Modal";

export default function LangBar({ firstLang }) {
  const [currentLang, setCurrentLang] = useState(firstLang);
  const [langbar, setLangbar] = useState(false);
  const [t, i18n] = useTranslation();
  const languages = useMemo(() => Object.keys(i18n.options.resources), [i18n]);

  function handleChangeLang(lang) {
    setLangbar(false);
    if (lang !== currentLang && currentLang) {
      setCurrentLang(lang);
      i18n.changeLanguage(lang);
    }
  }

  function handleOpen() {
    setLangbar(true);
  }

  if (langbar === false) {
    return (
      <div className="text-center w-7 place-self-center" onClick={handleOpen}>
        <LanguageIcon langAbbr={currentLang} onChange={()=>{}} />
      </div>
    );
  }

  return (
    <div className=" text-center">
        <div className="">
          {currentLang &&
            languages.map((lang) => (
              <LanguageIcon
                key={lang}
                langAbbr={lang}
                currentLang={currentLang}
                onChange={handleChangeLang}
              />
            ))}
        </div>
    </div>
  );
}

function LanguageIcon({ langAbbr, onChange }) {
    const spanClass = `fi fi-${langAbbr==='en' ? 'gb' : langAbbr} hover:scale-110 transition ease-in-out cursor-pointer mr-3`;
  
    return (
        <>
            <span
                role="button"
                onClick={() => onChange(langAbbr)}
                className={spanClass}
            >
            </span>
        </>
    );
  }