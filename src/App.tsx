import React from 'react';
import './App.css';

class App extends React.Component {
    componentDidMount() {
       
    }
    blur(value: any) {
        console.log(value);
    }
    render() {
        return (
            <div>
            {/* <hello-plugin1></hello-plugin1> */}
                <plugin-icon></plugin-icon>
                <mock-plugin></mock-plugin>
                <mock-command></mock-command>
                <mock-command-delete></mock-command-delete>
            </div>
        )
    }
}
export default App;
