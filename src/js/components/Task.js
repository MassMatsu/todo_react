import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      isDone: this.props.isDone,
      editMode: false
    };
    this.handleToggleDone = this.handleToggleDone.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClickShowEdit = this.handleClickShowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
  }

  // handleClickToggleDone(){
  //   this.setState(prevState => (
  //     {isDone: !prevState.isDone}
  //   ));
  // }
  handleToggleDone(){
    this.props.handleToggleDone(this.state.id);
    console.log('task.js: '+ this.state.isDone);
    //console.log('task.js: '+ this.state.text);
  }

  handleClickRemove(){
    this.props.onRemove(this.state.id);
  }

  handleChangeText(e){  
    this.props.changeText(e.target.value, this.state.id); // 入力値とそれに紐ずくidを渡してあげる
    console.log('Task.js: '+ e.target.value)
  }
  handleClickShowEdit(){     // editMode の変更
    this.setState({editMode: true});
  }
  handleKeyUpCloseEdit(e){    // editMode の変更

    if(e.keyCode === 13 && e.shiftKey === true){  // event.keyCode, e.shiftKey キーアップされたボタンを特定することができる
      this.setState({
        //text: e.currentTarget.value,
        editMode: false
      });
    }
  }

  render(){
    const classNameLi = ClassNames({
      'list__item': true,
      'list__item--done': this.props.isDone
    });
    const classNameIcon = ClassNames({
      'fa': true,
      'fa-circle-thin': !this.props.isDone,
      'fa-check-circle': this.props.isDone,
      'icon-check': true
    });
    const input = (this.state.editMode) ?   // ショートハンド ( )? input : span 
      <input type="text" className="editText" value={this.props.text} onChange={this.handleChangeText} onKeyUp={this.handleKeyUpCloseEdit} /> :
      <span onClick={this.handleClickShowEdit}>{this.props.text}</span>;

    return (
      <li className={classNameLi}>
        <i className={classNameIcon} onClick={this.handleToggleDone} aria-hidden="true" />
        {input}
        <i className="fa fa-trash icon-trash" onClick={this.handleClickRemove} aria-hidden="true" />
      </li>
    );
  }     // fa をそのまま使わずcss用にクラスを作るのが良い -> icon-trash
}