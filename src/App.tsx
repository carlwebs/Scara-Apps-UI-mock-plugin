import React from 'react';
import './App.css';

class App extends React.Component {
    componentDidMount() {
        console.log("myTest");
        document.addEventListener("myTest", (e) => {
            console.log(e);
        })
    }
    blur(value: any) {
        console.log(value);
    }
    render() {
        return (
            <div>
            {/* <hello-plugin1></hello-plugin1> */}
                <mock-plugin></mock-plugin>,
                <mock-command></mock-command>
            </div>
        )
    }
}
export default App;
