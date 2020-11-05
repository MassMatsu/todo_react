import React from 'react';
import Task from './Task';
//import _ from 'lodash';

export default class TodoList extends React.Component{
  constructor(props){
    super(props);
    
    this.handleRemove = this.handleRemove.bind(this); 
    this.handleToggleDone = this.handleToggleDone.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  handleRemove(id){
    this.props.callBackRemoveTask(id);
    console.log('id: '+ id);
  }
  handleToggleDone(id){
    this.props.callBackClickToggleDone(id);
  }
  changeText(val, id){
    this.props.callBackChangeText(val, id)
    console.log('TodoList.js: '+val);
  }

  render(){

    let tasks = [];
    for(let i in this.props.data){    // タスクのコンポネントを一つずつ配列に収納していく（コンポネントの各値とそれに必要な関数をTaskに渡している）
      tasks.push(<Task key={this.props.data[i].id}    // 配列でコレクションを生成するときにidに加えて key が必要。idをそのままkeyに指定してあげればOK
                      id={this.props.data[i].id}
                      text={this.props.data[i].text}
                      isDone={this.props.data[i].isDone}
                      handleToggleDone={this.handleToggleDone}
                      changeText={this.changeText}
                      onRemove={this.handleRemove}
                  />);

      console.log('TodoList.js['+ i + ']: '+ this.props.data[i].isDone);
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}