import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.ReactComponent {
    handleClick() {
        console.log('2323');
    }

    render() {
        return (
            <div>
                <h1>Hello2233 {this.props.name}</h1>
                <button className="btn btn-default" onClick={this.handleClick}>submit</button>
            </div>
        );
    }
}

ReactDOM.render(
    <HelloMessage name="John22" />,
    document.getElementById('ex1')
);


function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('ex2')
    );
}

setInterval(tick, 1000);
