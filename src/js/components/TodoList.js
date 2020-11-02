import React from 'react';
import Task from './Task';
import _ from 'lodash';

export class TodoList extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: [
        { id: 0, text: 'sample todo1'},
        { id: 1, text: 'sample todo2'}
      ]
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(id){
    let data = _.reject(this.state.data, {'id': id});
    this.setState({data: data});
  }
  render(){

    let tasks = [];
    for(let i in this.state.data){
      tasks.push(<Task key={this.state.data[i].id}
                      id={this.state.data[i].id}
                      text={this.state.data[i].text}
                      onRemove={this.handleRemove}
                       />);

      //console.log();
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}