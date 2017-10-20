export const getUrl=() => {if(process.env.REACT_APP_BACKEND) {
    return  `${process.env.REACT_APP_BACKEND}`
} else {
    return 'http://localhost:3001'
}}

export const getCredentials=() => {if(process.env.REACT_APP_BACKEND) {
    return  'include'
} else {
    return  ''
}}

export const getCommentCount = (post, commentArr) => {
    let count = 0;
    commentArr.map(obj => {
        if (obj.parentId === post.id) {
            count++;
        }
    })
    return count;
}
