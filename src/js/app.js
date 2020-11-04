import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreator from './components/TodoCreator';
import Search from './components/Search';
import _ from 'lodash';

class TodoApp extends React.Component{

  constructor(){
    super();
    this.state = {
      data: [
        {id: this.createHashId(), text: 'sample todo1', isDone: false},
        {id: this.createHashId(), text: 'sample todo2', isDone: false}
      ],
      searchText: '',
    };

    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackClickToggleDone = this.callBackClickToggleDone.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  createHashId(){
    return Math.random().toString(36).slice(-16);
  }
  callBackRemoveTask(id){
    let data = _.reject(this.state.data, {'id': id});
    this.setState({data: data});
  }
  // handleClickToggleDone(){
  //   this.setState(prevState => (
  //     {isDone: !prevState.isDone}
  //   ));
  // }
  
  callBackClickToggleDone(toggle, id){
    console.log('app.js ' + toggle + ' ' + id);

    let newData = this.state.data.slice();

    for(let i in newData){
      if(newData[i].id === id){
        //console.log('isDone: '+ newData[i].isDone);

        if(newData[i].isDone){
          console.log('old: '+ newData[i].isDone);
          newData[i].isDone = false;
          console.log('new: '+ newData[i].isDone);
        }else{
          console.log('old: '+ newData[i].isDone);
          newData[i].isDone = true;
          console.log('new: '+ newData[i].isDone);
        }
      }
    }
    console.log('new isDone[0]: '+ newData[0].isDone);
    console.log('new isDone[1]: '+ newData[1].isDone);

    this.setState({data: newData});
    console.dir(this.state.data);

    // for(let i in this.state.data){
    //   if(this.state.data[i].id === id){
        
    //     console.dir('id: '+ this.state.data[i].isDone);
    //     dataMatched = this.state.data[i].isDone;

    //   }
    // }
    // console.log('dataMatched: '+ dataMatched);

    
    // if(dataMatched){
    //   this.setState({isDone: false});
    // }else{
    //   this.setState({isDone: true});
    // }
    
    
    // console.dir(this.state.data);
    
  }
  
  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({id: this.createHashId(), text: val});
    this.setState({data: nextData});
  }
  callBackSearch(val){
    this.setState({searchText: val});
  }
  filterCollection(elm){
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render(){

    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;

    return (
      <div>
      
        <TodoCreator callBackAddTask={this.callBackAddTask} />

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} callBackClickToggleDone={this.callBackClickToggleDone} />

      </div>
    );
  }
}
ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);