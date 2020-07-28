import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentDidMount() {
        const hostEle = document.getElementById('pluginHost');
        const entryEle = document.createElement('plugin-command-a-entry');
        entryEle.addEventListener('clickEvent', (e: any) => {
            console.log('Catched event on listener: ', e.detail.value);
            setTimeout(() => {
                e.detail.cb('You clicked me');
            }, 500);
        });
        entryEle.setAttribute('name', 'Hello Input name');
        hostEle?.appendChild(entryEle);
    }
    clickHandler(value: any) {
        console.log(value);
    }
    render() {
        return (
            <div id="pluginHost">
                <plugin-icon></plugin-icon>
                <mock-plugin></mock-plugin>
                <mock-command></mock-command>
            </div>
        )
    }
}
export default App;
