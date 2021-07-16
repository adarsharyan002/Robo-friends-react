import { div } from 'prelude-ls';
import React ,{Component} from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundry.js'

const state = {
    robots:[],
    searchfield:''
}

class App extends Component  {

    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield:''

        }

    }

    componentDidMount(){
        // console.log('check');
        fetch("https://jsonplaceholder.typicode.com/users").then(response =>{
            return response.json();
        })
        .then(users => {
            this.setState({robots:users})
            

        });
        


    }

    onSearchChange = (event) =>{
        this.setState({searchfield:event.target.value})
       
       
    }
    render(){
        const filteredRobots= this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if(this.state.robots.length ===0){
            return <h1>Loading</h1>
        }else{
    return(
        <div className="tc">
            <h1>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundary><CardList robots = {filteredRobots} /></ErrorBoundary>
                
            </Scroll>
            
            </div>

        
    );
}
}
}

export default App;