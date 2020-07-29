import intl from 'react-intl-universal';

const locales = {
    "en-US": require('../locales/en-US.json'),
    "zh-CN": require('../locales/zh-CN.json'),
};
export default function (){
    // const lang = localStorage.getItem('lang') === 'en' || 'en';
    let lang: string | null;
    localStorage.getItem('lang')?(lang=localStorage.getItem('lang')):lang='en'
    intl.init({
        currentLocale: (lang === 'en') ? 'en-US' : 'zh-CN', // TODO: determine locale here
        locales,
    })
        .then(() => {
            
        });
}