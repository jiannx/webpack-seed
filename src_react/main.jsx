import React from 'react';
import ReactDOM from 'react-dom';


class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'default name',
      age: 100,
      date: new Date()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // 组件渲染完成后调用
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 组件移除前
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  // 自定义函数
  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleClick() {
    this.setState({
      name: '2323'
    });
  }

  render() {
    return (
      <div>
        <h1>Hello {this.state.name} {this.state.age} props:{this.props.age}</h1>
        <p>{this.state.date.toLocaleTimeString()}</p>
        <button className="btn btn-default" onClick={this.handleClick}>submit</button>
      </div>
    );
  }
}
HelloMessage.defaultProps = {
  age: '2323'
};

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('ex1')
);
