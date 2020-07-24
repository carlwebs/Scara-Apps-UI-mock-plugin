import React, { Component } from 'react'
import { Box, Button } from '@material-ui/core'
import ReactWebComponent from 'react-web-component';
import './materialtheme.css';

interface stateType {
    theme:string
}

export default class MaterialDemo extends Component<any,stateType> {
    constructor(props:any){
        super(props);
        this.state = {
            "theme": "kuka"
        }
    }
    componentDidMount(){
        const theme = localStorage.getItem('theme') || "kuka";
        this.setState({
            "theme":theme
        })
        console.log("myTest")
        document.addEventListener("myTest",(e:any)=>{
            e.detail.name.query('?getStationList').then((result:any)=>{
                console.log(result);
            })
        })
    }
    render() {
        return (
            <div>
                <Box className={this.state.theme}>
                    <Box>这是material-ui的Box</Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { console.log("😃tap button！") }}>
                        我是按钮
                    </Button>
                </Box>
            </div>
        )
    }
}
ReactWebComponent.create(<MaterialDemo />, 'material-demo',false);