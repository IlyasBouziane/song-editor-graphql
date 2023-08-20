import React, {Component} from "react";
import { graphql } from "react-apollo";
import mutation from '../queries/addLyric'

class LyricCreate extends Component{
    constructor(props){
        super(props)
        this.state = {content: ''}
        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables:{
                content: this.state.content,
                songId: this.props.songId
            },
            // refetchQueries: [{query: query, variables: {id: this.props.songId}}] 
            // dataIdFromObject config in ApolloClient allows to make use of Apollo cache and update the identified item rather than executing an aditionnal query to get the item updated
        }).then()

        this.setState({content: ''})
    }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
            <label>Add a Lyric</label>
            <input 
                onChange={event => this.setState({content: event.target.value})} 
                value={this.state.content}
            />
        </form>
        )
    }
}

export default graphql(mutation)(LyricCreate)