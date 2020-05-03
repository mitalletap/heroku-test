import React, { Component } from 'react';
import FeedItem from './FeedItem';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: []
        }
    }


    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts() {
        const API="http://localhost:5000";
        fetch(API)
        .then(res => res.json())
        .then((result) => this.setState({ feed: result.reverse() }))
        .catch(err => console.log(err));
    }

    render() { 
        const { feed } = this.state;
        if(feed.length > 0) {
            return ( 
                <div className="feed-container">
                    {feed.map(function(item, i) {
                        return (
                            <React.Fragment key={`key-${i}`}>
                                <div className="feed-item" > 
                                    <FeedItem username={item.username} message={item.message} created={item.createdAt}/>
                                </div>
                                <br/>
                            </React.Fragment>
                        )
                    })}
                </div>
         );
        } else {
            return (
                <h1> There are no active posts </h1>
            )
        }
    }
}
 
export default Feed;