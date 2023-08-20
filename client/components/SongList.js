import React, {Component} from "react";
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs"
import mutation from "../queries/deleteSong"


class SongList extends Component {

    onSongDelete(id){
        this.props.mutate({
            variables:{id}, // id: id
            //refetchQueries:[{query}] // query: query
        }).then(()=>this.props.data.refetch()) // this means the query related to SongList will be rerun
    }


    renderSongs(){
        return this.props.data.songs.map(({id,title}) => 
            (
                <li key={id} 
                    className="collection-item">
                    <Link to={`/songs/${id}`}>
                    {title}
                    </Link>    
                    <i  className="material-icons" 
                        onClick={()=> this.onSongDelete(id)}>delete</i>
                </li>
            )
        )
    }

    render(){
        if(this.props.data.loading){return <div>...Loading</div>}
        return (
        <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link 
                className="btn-floating btn-large red right" 
                to="/song/new">
                    <i className="material-icons">add</i>
            </Link>
        </div>

        )
    }
}

// The code exports the result of wrapping the SongList component with a GraphQL query. 
// graphql(query) returns a function
// the result of the query is in the props of the component
// the execution of the query is async : the componened is rerendered when the query is resolved
export default graphql(mutation)(graphql(query)(SongList))