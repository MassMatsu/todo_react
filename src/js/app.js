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
    this.callBackChangeText = this.callBackChangeText.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  createHashId(){
    let uuid = UUID.generate();
    console.log('uuid: ', uuid);
    return uuid;
    //return Math.random().toString(36).slice(-16);
  }
  callBackRemoveTask(id){
    let data = _.reject(this.state.data, {'id': id});   // 第一引数に検索したい対象の配列。第二引数にキーとその値。その要素を配列から除外し、新たな配列を生成
    this.setState({data: data});    // 新たな配列を data に格納し、setState更新
  }
 
  callBackClickToggleDone(id){  
    let newData = this.state.data.slice();    // slice()で this.state.data のコピーを newData に格納

    for(let i in newData){        // data のレコードを一つずつ検証して、クリックされたタスクのidをとマッチするレコードを探す
      if(newData[i].id === id){
        //console.log('isDone: '+ newData[i].isDone);

        if(newData[i].isDone){    // もしそのタスクの isDone がtrueならfalseに、 falseならtrueに変更 
          newData[i].isDone = false;
          console.log('new isDone: ', newData[i].isDone);     
        }else{ 
          newData[i].isDone = true;
          console.log('new isDone: ', newData[i].isDone);
        }
      }
    }  
    this.setState({data: newData});   // 変更が完了した newData をそのままdataとし、 this.setStateで元のdataを書き換える
    console.log('toggle isDone: ', this.state.data);
  }

  callBackChangeText(val, id){
    let newData = this.state.data.slice();  // 上記に全く同じやり方。slice()で this.state.data のコピーを newData に格納
    
    for (let i in newData){
      if(newData[i].id === id){
        newData[i].text = val;
        console.log('newData.text:', newData[i].text)
      }
    }
    this.setState({data: newData});
    console.log(this.state.data);
  }

  callBackAddTask(val){
    let renewedData = this.state.data;   // 先に今のデータを変数に入れてから、変更可能にする！！
    renewedData.push({id: this.createHashId(), text: val, isDone: false});   //  プロパティを設定して、1レコード追加！
    this.setState({data: renewedData});  // this.setState で更新
  }
  callBackSearch(val){
    this.setState({searchText: val});
  }
  filterCollection(elm){
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  
  render(){

    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;   // 配列の各要素をフィルターにかける（各要素に対して()の中の関数を実行して、条件によって要素を絞って新しい配列を返す）

    return (
      <div> 
      
        <TodoCreator callBackAddTask={this.callBackAddTask} />

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} callBackClickToggleDone={this.callBackClickToggleDone} callBackChangeText={this.callBackChangeText} />

      </div>
    );  // return するものは、divタグで囲って必ずひとまとめにするか、ひとつのDOMであること！！ コンポネントをリターン <コンポネント/> 渡す値は キー = 値。ここで使う関数も 関数の変数名 = {this.関数} でコンポネントに渡せる
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('app')
);