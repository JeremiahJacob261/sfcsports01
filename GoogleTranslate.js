import { useEffect, useState } from "react"; 
 
import { SelectPicker } from "rsuite";
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { Icon } from "@iconify/react";

export default function GoogleTranslate() {
    const [isLoaded, setIsLoaded] = useState(false)
    const languages = [
        { label: 'English', value: '/auto/en' },
        { label: `Русский`, value: '/auto/ru' },
        { label: 'Polski', value: '/auto/pl' }];
    const [dis,setDis] = useState('none')        
    const [selected, setSelected] = useState(null)
    const googleTranslateElementInit = () => {

        new window.google.translate.TranslateElement({
            pageLanguage: 'auto',
            autoDisplay: false,
            includedLanguages: "ru,en,pl,fr,vi", // If you remove it, by default all google supported language will be included
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
            'google_translate_element');
    }

    const langChange = (e, m, evt) => {
        console.log(e,m,evt)
        evt.preventDefault()
        if (hasCookie('googtrans')) {
            setCookie('googtrans', decodeURI(e))
            setSelected(e)
        }
        else {
            setCookie('googtrans', e)
            setSelected(e)
        }
        window.location.reload()
    }

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
        if (hasCookie('googtrans')) {
            setSelected(getCookie('googtrans'))
        }
        else {
            setSelected('/auto/en')
        }
        script.onload = () => setIsLoaded(true)
    }, []);
    return (
        <div>
            {isLoaded && (
                // Placeholder expression
                <>
                  <div id="google_translate_element" style={{width:'0px',height:'0px',position:'absolute',left:'50%'}}></div>
        <SelectPicker 
         data={languages} 
         style={{ width: 100 }} 
         placement="bottomEnd"
         cleanable={false}
         value={selected}
         searchable={false}
         className={'notranslate'}
         menuClassName={'notranslate'}
         onSelect={(e,m,evt) => {
            console.log(e,m,evt)
            console.log(languages)
            langChange(e,m,evt)}}
         placeholder="Lang"/> 
                </>
            )}
        </div>
    )
}