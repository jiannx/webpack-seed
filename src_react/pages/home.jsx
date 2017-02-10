import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

let count = 1;


// 哪些 action 创建函数是我们想要通过 props 获取的？
function dispatchToProps(dispatch) {
  return {
    onIncrement: () => {
      count += 1;
      setTimeout(() => {
        dispatch({ type: 'HOME_ADD', count: count });
      });
    }
  };
}

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function stateToProps(state) {
  console.log('--------------');
  console.log(state);
  return {
    value: 'wwwww',
    count: state.home.count
  };
}

const defaultProps = {
  count: 0
};
const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

class Home extends React.Component {
  render() {
    return (
      <div className="body-box">
        <Header />
        <div className="content">
          <div className="home-box animated fadeIn" id="grid">
            <div className="tool-box row">
              <div className="col-xs-1" style={{ 'font-size': '18px' }}>
                所有项目 {this.props.count}
              </div>
              <div className="col-xs-1">
                <Button icon="file-add" type="primary" onClick={this.props.onIncrement}>新增</Button>
              </div>
            </div>
            <Table dataSource={dataSource} columns={columns} defaultExpandAllRows="true" scroll={{ y: 2000 }} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Home.defaultProps = defaultProps;

export default connect(stateToProps, dispatchToProps)(Home);
