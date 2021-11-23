import React from "react"; 
import {connect} from 'react-redux';
import Post from "./Post";

const Posts = ({syncPosts}) => {

    if (!syncPosts.length) {
        return <p className="text-center">Постов пока нет</p>
    }

    return syncPosts.map(post => <Post post={post} key={post.id} />)   
} 

// делаем пропсы из стейта 
const mapStateToProps = state => {
    console.log(state)
    return {
        // название ключей выбираем сами
        syncPosts: state.posts.posts 
    }
}

export default connect(mapStateToProps, null)(Posts);