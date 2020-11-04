import React from 'react';
import Task from './Task';
//import _ from 'lodash';

export default class TodoList extends React.Component{
  constructor(props){
    super(props);
    
    this.handleRemove = this.handleRemove.bind(this); 
    this.handleToggleDone = this.handleToggleDone.bind(this);  
  }

  handleRemove(id){
    this.props.callBackRemoveTask(id);
    console.log('id: '+ id);
  }
  handleToggleDone(toggle, id){
    this.props.callBackClickToggleDone(toggle, id);
    console.log('todoList.js ' + toggle);
  }
  render(){

    let tasks = [];
    for(let i in this.props.data){
      tasks.push(<Task key={this.props.data[i].id}
                      id={this.props.data[i].id}
                      text={this.props.data[i].text}
                      isDone={this.props.data[i].isDone}
                      handleToggleDone={this.handleToggleDone}
                      onRemove={this.handleRemove}
                  />);

      console.log(this.props.data[i].isDone);
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}