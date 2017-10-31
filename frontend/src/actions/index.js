import {getUrl, getCredentials} from '../config'
import * as cons from './constants';

export const getExistingPosts = obj => {
    return {
        type: cons.GET_ALL_POSTS,
        value: obj
    }
}

export const getCurrentCategory = obj => {
    return {
        type: cons.CURRENT_CAT,
        value: obj
    }
}

export const getCurrCategoryPostCount = obj => {
    return {
        type: cons.CURR_CATE_POST_COUNT,
        value: obj
    }
}

export const getCurrPost = obj => {
    return {
        type: cons.CURR_POST,
        value: obj
    }
}

export const addNewPost = obj => {
    return {
        type: cons.ADD_POST,
        value: obj
    }
}

export function editPost (obj) {
    return {
        type: cons.EDIT_POST,
        value: obj
    }
}

export function deletePost(obj) {
    return {
        type: cons.DELETE_POST,
        value: obj
    }
}

export function retrieveCategories (obj) {
  return {
    type: cons.GET_POST,
    name: obj.name,
    path: obj.path
  }
}

export function retrievePostID (obj) {
  return {
    type: cons.GET_POST_ID,
    value: obj,
  }
}

export function addNewComments (obj) {
  return {
    type: cons.ADD_COMMENTS,
    value: obj
  }
}

export function retrieveComments(obj) {
    return {
    type: cons.GET_COMMENTS,
    value: obj
  }
}

export function editComment(obj) {
  return {
    type: cons.EDIT_COMMENT,
    value: obj
  }
}

export function commentDeleted(obj) {
  return {
    type: cons.DELETE_COMMENT,
    value: obj
  }
}

export const addNewPosts = (obj) => {
    return  dispatch => {
        const postsUrl = `${getUrl()}/posts`;
        fetch(postsUrl, {
            method: "POST",
            body:  JSON.stringify(obj),
            headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((output) => {
                dispatch(addNewPost(JSON.parse(output)));
            });
    }
}

export const toEditPost = obj => {
    return dispatch => {
        const postsUrl = `${getUrl()}/posts/${obj.id}`;
        fetch(postsUrl, {
            method: "PUT",
            body:  JSON.stringify(obj),
            headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(editPost(JSON.parse(data)));
            });

    }
}

export const onEditComment = obj => {
    return dispatch => {
        const postsUrl = `${getUrl()}/comments/${obj.id}`;
        fetch(postsUrl, {
            method: "PUT",
            body:  JSON.stringify(obj),
            headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(editComment(JSON.parse(data)));
            });
    }
}

export const onPostDeleted = obj => {
    return dispatch => {
        const url = `${getUrl()}/posts/${obj.id}`
        fetch(url, {
            headers: {'Authorization': 'whatever-you-want'},
            credentials: getCredentials(),
            method: "DELETE"
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(deletePost(obj));
            });
    }
}

export const onCommentDeleted = obj => {
    return dispatch => {
        const postsUrl = `${getUrl()}/comments/${obj.id}`;
        fetch(postsUrl, {
            method: "DELETE",
            headers:{'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(commentDeleted(JSON.parse(data)));
            });
    }
}

export const onCommentAdded = obj => {
    return dispatch => {
        const postsUrl = `${getUrl()}/comments`;
        fetch(postsUrl, {
            method: "POST",
            body:  JSON.stringify(obj),
            headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(addNewComments(JSON.parse(data)));
            });
    }
}

export const onUpdateScore = (obj,value) => {
    return dispatch => {
        const url  = `${getUrl()}/comments/${obj.id}`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ option: value }),
            headers:  {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(editComment(JSON.parse(data)));
            });
    }
}

const ongetComment = (id) => {
    return dispatch => {
        const postComments = `${getUrl()}/posts/${id}/comments`;
        fetch(postComments, {
            headers: {'Authorization': 'whatever-you-want'},
            credentials: getCredentials()

        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                JSON.parse(data).map(obj=>dispatch(retrieveComments(obj)));
            });
    }
}

export const fillData = () => {
    return dispatch => {
        const categoryUrl  = `${getUrl()}/categories`;
        fetch(categoryUrl, {
            headers:  {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                JSON.parse(data).categories.map(obj=>dispatch(retrieveCategories(obj)));
            });

        const postsUrl = `${getUrl()}/posts`;
        fetch(postsUrl, {
            method: "GET",
            headers: {'Authorization': 'whatever-you-want'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                JSON.parse(data).map(obj=> {dispatch(getExistingPosts(obj));
                    dispatch(ongetComment(obj.id))}
                );
            });
    }
}

export const updateVoteScore = (obj,value) => {
    return dispatch => {
        const url  = `${getUrl()}/posts/${obj.id}`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ option: value }),
            headers:  {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                dispatch(toEditPost(JSON.parse(data)));
            });
    }
}
