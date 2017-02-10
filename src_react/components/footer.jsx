import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <a><img src={require('../resource/logo.png')} alt="" /></a>
        </div>
        <ul className="nav-bar">
          <li><a>首页</a></li>
          <li><a>数据分析</a></li>
          <li><a>CDN探测</a></li>
          <li><a>网络探测</a></li>
        </ul>
        <div className="right-box text-right" style={{ width: '400px', float: 'right' }}>
          <div style={{ float: 'right', width: '40px' }}><a href="/auth/logout">退出</a></div>
          <div style={{ float: 'right', width: '320px', 'text-overflow': 'ellipsis', overflow: 'hidden' }}><span>2323</span></div>
        </div>
      </div>
    );
  }
}


export default Footer;
