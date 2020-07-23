import React, { Component } from 'react'
import ReactWebComponent from 'react-web-component';
import intl from 'react-intl-universal';
const locales = {
    "en-US": require('./locales/en-US.json'),
    "zh-CN": require('./locales/zh-CN.json'),
};
export default class LanguageDemo extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {initDone: false,lang:localStorage.getItem('lang') || 'en-US' };
        this.loadLocales();
    }
    componentDidMount(){
        
    }
    loadLocales() {
        // react-intl-universal 是单例模式, 只应该实例化一次
        intl.init({
          currentLocale: (this.state.lang==='en')?'en-US':'zh-CN', // TODO: determine locale here
          locales,
        })
        .then(() => {
          this.setState({initDone: true});
        });
    }
    changeLanguage = (lang:string)=>{
        return ()=>{
            let lang_type = 'en-US';
            if(localStorage.getItem('lang') === "cmn"){
                lang_type = "zh-CN";
            }else{
                lang_type = "en-US";
            }
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone &&
                    <div>
                      {intl.get('delete')}
                    </div>
                }
                <div>
                    {/* <button onClick={this.changeLanguage("zh-CN")}>语言切换</button> */}
                </div>
            </div>
        )
    }
}
ReactWebComponent.create(<LanguageDemo  />, 'language-demo',false);
