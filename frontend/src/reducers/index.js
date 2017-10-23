import { combineReducers } from 'redux'

import {
    ADD_POST, GET_POST, GET_POST_ID,ADD_COMMENTS, GET_COMMENTS, EDIT_COMMENT, DELETE_COMMENT, EDIT_POST, DELETE_POST, GET_ALL_POSTS
} from '../actions'

import {getUrl, getCredentials} from '../config'


function posts (state = {posts: []}, action) {
    const { id, category, deleted, timestamp ,title, body, author, voteScore } = action

    switch (action.type) {
        case ADD_POST :
            const newPost = {
                title: title,
                body: body,
                timestamp: timestamp,
                voteScore: voteScore,
                author: author,
                id: id,
                category: category,
                deleted: deleted
            }
            return {posts: [...state.posts, newPost]};
 case GET_ALL_POSTS: {
        const post = {
            title: title,
            body: body,
            timestamp: timestamp,
            voteScore: voteScore,
            author: author,
            id: id,
            category: category,
            deleted: deleted
        }
        return {posts: [...state.posts, post]};
        }
case EDIT_POST: {
        return {posts:
            state.posts.map(post => post.id ===action.id ?{ ...post, title: action.title, body: action.body, voteScore: action.voteScore}: post)
    };

    }
case DELETE_POST: {
        const deletedPost = {
            title: title,
            body: body,
            timestamp: timestamp,
            voteScore: voteScore,
            author: author,
            id: id,
            category: category,
            deleted: true
        }
        deletePostsInServer(deletedPost);
        return {posts:
            state.posts.map(post => post.id ===action.id ?{ ...post, deleted: deletedPost.deleted}: post)
    };
    }
default : return state;
}
}


function categories(state = {categories: []}, action) {
    const { name, path } = action;

    switch (action.type) {
        case GET_POST:
            const newPost = {
                name: name,
                path: path
            }
            return {categories: [...state.categories, newPost]};
default:
    return state
}
}

function comments (state = {comments: []}, action) {
    const { id, parentId , body, author, timestamp, deleted, parentDeleted, voteScore} = action;

    switch (action.type) {
        case ADD_COMMENTS:
            const newComment = {
                body: body,
                timestamp: timestamp,
                author: author,
                id: id,
                parentId: parentId
            }
            return {comments: [...state.comments, newComment]};
case GET_COMMENTS:
        const Comment = {
            body: body,
            timestamp: timestamp,
            author: author,
            id: id,
            parentId: parentId,
            deleted: deleted,
            parentDeleted:parentDeleted,
            voteScore: voteScore
        }
    return {comments: [...state.comments, Comment]};
case EDIT_COMMENT: {
        return {comments:
            state.comments.map(comment => comment.id ===action.id ?{ ...comment, body: action.body , author: action.author, voteScore: action.voteScore}: comment)
    };
    }
case DELETE_COMMENT: {
        return {comments:
            state.comments.map(comment => comment.id ===action.id ?{ ...comment, deleted: action.deleted}: comment)
    };
    }
default: return state
}
}
function postid(state = {postid: []}, action) {
    const {object} = action;

    switch (action.type) {
        case GET_POST_ID:
            return object;
        default:
            return state
    }
}

function deletePostsInServer(data) {
    const postsUrl = `${getUrl()}/posts/${data.id}`;
    fetch(postsUrl, {
        method: "DELETE",
        headers: {'Authorization': 'whatever-you-want'},
        credentials: getCredentials()
    })
        .then((res) => {
        return (res.text())
})
.then((data) => {
});
}


export default combineReducers({categories, posts, postid, comments});