export const ADD_POST = 'ADD_POST'
export const GET_POST = "GET_POST"
export const GET_POST_ID = "GET_POST_ID"
export const ADD_COMMENTS = "ADD_COMMENTS"
export const GET_COMMENTS = "GET_COMMENTS"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"
export const UPDATE_SCORE = "UPDATE_SCORE"
export const GET_ALL_POSTS = "GET_ALL_POSTS"
export const UPDATE_COMMENTS_SCORE = "UPDATE_COMMENTS_SCORE"

export function getExistingPosts (obj) {
    return {
        type: GET_ALL_POSTS,
        title: obj.title,
        body: obj.body,
        author: obj.author,
        timestamp: obj.timestamp,
        voteScore: obj.voteScore,
        deleted : obj.deleted,
        id: obj.id,
        category: obj.category
    }
}

export function addNewPost (obj) {
    return {
        type: ADD_POST,
        title: obj.title,
        body: obj.body,
        author: obj.author,
        timestamp: obj.timestamp,
        voteScore: obj.voteScore,
        deleted : obj.deleted,
        id: obj.id,
        category: obj.category
    }
}

export function editPost (obj) {
    return {
        type: EDIT_POST,
        title: obj.title,
        body: obj.body,
        author: obj.author,
        timestamp: obj.timestamp,
        voteScore: obj.voteScore,
        deleted : obj.deleted,
        id: obj.id,
        category: obj.category       
    }
}

export function deletePost(obj) {
    return {
        type: DELETE_POST,
        title: obj.title,
        body: obj.body,
        author: obj.author,
        timestamp: obj.timestamp,
        voteScore: obj.voteScore,
        deleted : obj.deleted,
        id: obj.id,
        category: obj.category       
    }
}

export function retrieveCategories (obj) {
  return {
    type: GET_POST,
    name: obj.name,
    path: obj.path
  }
}

export function retrievePostID (obj) {
  return {
    type: GET_POST_ID,
    object: obj,
  }
}

export function addNewComments (obj) {
  return {
    type: ADD_COMMENTS,
    id: obj.id,
    parentId: obj.parentId,
    timeStamp: obj.timestamp,
    body: obj.body,
    author: obj.author
  }
}

export function retrieveComments(obj) {
    return {
    type: GET_COMMENTS,
    id: obj.id,
    parentId: obj.parentId,
    timestamp: obj.timestamp,
    body: obj.body,
    author: obj.author,
    deleted: obj.deleted,
    voteScore: obj.voteScore,
    parentDeleted: obj.parentDeleted  
  }
}

export function editComment(obj) {
  return {
    type: EDIT_COMMENT,
    id: obj.id,
    parentId: obj.parentId,
    timestamp: obj.timestamp,
    body: obj.body,
    author: obj.author,
    deleted: obj.deleted,
    voteScore: obj.voteScore,
    parentDeleted: obj.parentDeleted  
  }
}

export function commentDeleted(obj) {
  return {
    type: DELETE_COMMENT,
    id: obj.id,
    parentId: obj.parentId,
    timestamp: obj.timestamp,
    body: obj.body,
    author: obj.author,
    deleted: obj.deleted,
    voteScore: obj.voteScore,
    parentDeleted: obj.parentDeleted  
  }
}