import React, {Component} from 'react';
import {Card, Input, Button, Layout} from 'antd';
import 'antd/dist/antd.css';
import {compile,derivative} from 'mathjs';
const {Content} = Layout;
const InputStyle = {
    background: "white",
    color: "black", 
    fontWeight: "bold", 
    fontSize: "24px"
};
var f, error, exact;
class Forwardh extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard1: false,
            showOutputCard2: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    forward1(x, h, degree) {
        switch (degree) {
            case 1:
                f = (this.func(x+(1*h)) - this.func(x)) / h
                break;
            case 2:
                f = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 2)
                break;
            case 3:
                f = (this.func(x+(3*h)) - 3*this.func(x+(2*h)) + 3*this.func(x+(1*h)) - this.func(x)) / Math.pow(h, 3)
                break;
            default:
                f = (this.func(x+(4*h)) - 4*this.func(x+(3*h)) + 6*this.func(x+(2*h)) - 4*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((f - exact) / f)*100
        this.setState({
            showOutputCard1: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }
    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Forward Divided-Differences O(h)</h2>
                <div style={{float:"left"}}>
                <Content 
                    onChange={this.handleChange}
                    style={{ padding: '0 50px',
                    background: "#D2B48C",
                    width:'100%%',
                    borderRadius:"15px"
                }}
                >  
                    <Content
                        style={{background: "#D2B48C", borderRadius:"50px" , width:500}}
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                        <h2>H</h2><Input size="large" name="h" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button1" onClick= {
                                ()=>this.forward1(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(1))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Diff1</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button id="submit_button2" onClick= {
                                ()=>this.forward1(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(2))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Diff2</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button id="submit_button2" onClick= {
                                ()=>this.forward1(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(3))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Diff2</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button id="submit_button2" onClick= {
                                ()=>this.forward1(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(4))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Diff4</Button><br></br>&nbsp;
                        {this.state.showOutputCard1 && 
                            <Content
                                style={{background: "#D2B48C", borderRadius:"50px" , width:500}}
                            >
                                <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                    fx = {f.toFixed(8)}<br/>
                                    Exact = {exact.toFixed(8)}<br/>
                                    Error = {error.toFixed(4)}%<br/>
                                </p>
                            </Content>
                        }     
                    </Content>     
                </Content>
                </div>                
            </div>
        );
    }
}
export default Forwardh;