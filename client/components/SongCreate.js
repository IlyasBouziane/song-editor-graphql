import React, {Component} from "react";
import {graphql} from "react-apollo"
import { Link, hashHistory } from "react-router";
import fetchSongs from "../queries/fetchSongs"
import mutation from "../queries/addSong"

class SongCreate extends Component{
    constructor(props){
        super(props)
        this.state = {title: ''}
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables: {title: this.state.title},
            refetchQueries: [{query: fetchSongs}] // it reruns the queries in the array when the mutation query is successful
        })
        .then(() =>  hashHistory.push('/'))
        .catch(error => console.log(error) )
    }

    render(){
        return(
            <div>
                <Link to="/">
                        Back
                </Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.setState({title: event.target.value})} 
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

export default graphql(mutation)(SongCreate)