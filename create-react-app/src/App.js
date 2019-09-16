import React, { Component } from 'react';
import './App.css'
import TOC from './components/TOC'
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import Control from './components/Control'


class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3
    this.state = {
      mode: 'create',
      selected_content_id: 2,
      subject: {title: "WEB", sub: 'WWW'},
      welcome: {title: "welcome", desc:  'hello@'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render() {
    var _title, _desc, article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode==='read') {
      _title = this.state.contents[this.state.selected_content_id-1].title
      _desc = this.state.contents[this.state.selected_content_id-1].desc
      article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode === 'create') {
      // push는 원본데이터를 변화시킨다. concat을 사용하여 원본데이터를 변화시키지 않는것이 좋다. 
      // 성능에서 까다롭다. 
      article = <CreateContent onSubmit = { function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1
        var _content = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        )
        this.setState( { contents: _content})
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
        <Subject 
          title = {this.state.subject.title}
          sub = {this.state.subject.sub}
          onChangePage = {function() {
            this.setState({mode:'welcome'})
          }.bind(this)}
        ></Subject>
        <TOC data={this.state.contents}
          onChangePage = {
            function(idx) {
              this.setState({
                mode: 'read',
                selected_content_id: idx
              }) 
            }.bind(this)
          } 
        ></TOC> 
        <Control onChangePage = {
          function(_mode) {
            this.setState({ mode: _mode })
          }.bind(this)
        }></Control>
        {article}
      </div>
    );
  }
}
export default App;
