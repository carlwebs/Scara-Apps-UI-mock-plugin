import React from 'react';
import ReactWebComponent from 'react-web-component';
import { Box, Button } from '@material-ui/core'
import './App.css';
import MaterialDemo from './material';
import LanguageDemo from './language';
import MaterialTableClassDemo from './materialTableClass';
import NumberInput from './number';
class App extends React.Component {
    componentDidMount(){
        console.log("myTest");
        document.addEventListener("myTest",(e)=>{
            console.log(e);
        })
    }
    blur(value:any){
        console.log(value);
    }
    render() {
        return (
            <div>
                <MaterialDemo></MaterialDemo>
                <LanguageDemo></LanguageDemo>
                <MaterialTableClassDemo></MaterialTableClassDemo>
                <NumberInput blur={this.blur} type="int" data='20'></NumberInput>
            </div>
        )
    }
}
ReactWebComponent.create(<App />, 'my-component',false);
export default App;
