import { CREATE_POST, FETCH_POSTS } from "./types";

const initialState = {
    posts: [],
    fetchedPosts: []
}

// Pure functions
export const postsReducer = (state = initialState, action) => {
    switch(action.type) {

        case CREATE_POST:
        //    return {...state, posts: state.posts.concat(action.payload)}
        return { ...state, posts: [...state.posts, action.payload] } // новый синтаксис
       case FETCH_POSTS:
           return {...state, fetchedPosts: action.payload}
        default: return state;
    }
}
