import React, {Component} from "react";
import { graphql } from "react-apollo";
import mutation from '../queries/likeLyric'

class LyricList extends Component{


    onLike(id, likes){
        this.props.mutate({
            variables: {
                id
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: ++likes
                }
            }
        })

    }

    renderLycris(){
        return this.props.lyrics.map(({id,content,likes}) => 
            (
                <li key={id} 
                    className="collection-item">
                    {content}
                    <div className="vote-box">
                    <i 
                        className="material-icons"
                        onClick={()=>this.onLike(id, likes)}
                    >
                            thumb_up</i>
                    {likes}

                    </div>        
                </li>
            )
        )
    }

    render(){
        return(
            <div>
            <ul className="collection">
                {this.renderLycris()}
            </ul>
            </div>
        )
    }
}

export default graphql(mutation)(LyricList)