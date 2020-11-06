import React from 'react';

export default class TodoCreator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      val: '',
      errMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(e){
    this.setState({val: e.target.value});
  }
  handleKeyUp(e){
    if(e.keyCode === 13 && e.shiftKey === true){

      const val = e.target.value; // 変数に callBackAddTask で必要な値を格納

      if(!val){
        this.setState({errMsg: '入力が空です'});
        return;
      }
      
      this.setState({   // this.state を初期化
        val: '',
        errMsg: ''
      });

      this.props.callBackAddTask(val);  // valを引数に渡して、app.jsで処理
    } 
  }
  render(){
  const errMsg = (this.state.errMsg) ? <span className="error">{this.state.errMsg}</span> : '';

    return (
      <div className="form">
        <div className="inputArea">
          <input type="text" className="inputText" value={this.state.val} onChange={this.handleChange} onKeyUp={this.handleKeyUp} placeholder="something todo task" />
          {errMsg}
        </div>
      </div>
    );
  } 
}
