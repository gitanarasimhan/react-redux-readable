import { combineReducers } from 'redux'
import * as cons from '../actions/constants'


function posts (state = {posts: []}, action) {
    switch (action.type) {
        case cons.ADD_POST :
            return {posts: [...state.posts, action.value]};
        case cons.GET_ALL_POSTS: {
            return {posts: [...state.posts, action.value]};
        }
        case cons.EDIT_POST: {
            return {posts:
                state.posts.map(post => post.id ===action.value.id ?{ ...post, title: action.value.title, body: action.value.body, voteScore: action.value.voteScore}: post)
            };

        }
        case cons.DELETE_POST: {
            action.value.deleted = true;
            return {
                posts: state.posts.map(post => post.id === action.value.id ? {
                    ...post,
                    deleted: action.value.deleted
                } : post)
            };
        }
        default :
            return state;
    }
}

function currentCategory (state = {category: ""}, action) {
    switch (action.type) {
        case cons.CURRENT_CAT: {
            return Object.assign(state,  {category: action.value});

        }
        default: return state;
    }
}

function currentCategoryPostCount (state = {count: ""}, action) {
    switch (action.type) {
        case cons.CURR_CATE_POST_COUNT: {
            return Object.assign(state,  {count: action.value});
        }
        default: return state;
    }
}

function getCurrentPost (state = {id: ""}, action) {
    switch (action.type) {
        case cons.CURR_POST: {
            return Object.assign(state,  {id: action.value});
        }
        default: return state;
    }
}


function categories(state = {categories: []}, action) {
    const {name, path} = action;

    const newPost = {name, path}
    switch (action.type) {
        case cons.GET_POST:
            return {categories: [...state.categories, newPost]};
        default:
            return state
    }
}



function comments (state = {comments: []}, action) {
    switch (action.type) {
        case cons.ADD_COMMENTS:
            return {comments: [...state.comments, action.value]};
        case cons.GET_COMMENTS:
            return {comments: [...state.comments, action.value]};
        case cons.EDIT_COMMENT: {
            return {
                comments: state.comments.map(comment => comment.id === action.value.id ? {
                    ...comment,
                    body: action.value.body,
                    author: action.value.author,
                    voteScore: action.value.voteScore
                } : comment)
            };
        }
        case cons.DELETE_COMMENT: {
            return {
                comments: state.comments.map(comment => comment.id === action.value.id ? {
                    ...comment,
                    deleted: action.value.deleted
                } : comment)
            };
        }
        default:
            return state
    }
}

function postid(state = {postid: ""}, action) {
    switch (action.type) {
        case cons.GET_POST_ID:
            return action.value;
        default:
            return state
    }
}
export default combineReducers({categories, posts, postid, comments, currentCategory, currentCategoryPostCount, getCurrentPost});
