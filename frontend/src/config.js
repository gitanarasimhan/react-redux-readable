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

export const getSortFn = (value) => {
    if(document.getElementsByClassName("voteScore")[0]) {
        if(value === 'voteScore' && (document.getElementsByClassName("voteScore")[0].className).indexOf("up") >-1) {
            document.getElementsByClassName("voteScore")[0].className += " down";
            document.getElementsByClassName("voteScore")[0].classList.remove("up");
            return function(a,b) {
                return a.voteScore - b.voteScore
            };
        } else if(value === 'voteScore' && (document.getElementsByClassName("voteScore")[0].className).indexOf("down") >-1) {
            document.getElementsByClassName("voteScore")[0].className += " up";
            document.getElementsByClassName("voteScore")[0].classList.remove("down");
            return function(a,b) {
                return b.voteScore - a.voteScore
            };
        }

        if(document.getElementsByClassName("stampUp")[0]) {
            if(value === 'stampUp' && (document.getElementsByClassName("stampUp")[0].className).indexOf("up") >-1) {
                document.getElementsByClassName("stampUp")[0].className += " down";
                document.getElementsByClassName("stampUp")[0].classList.remove("up");
                return function(a,b) {
                    return a.voteScore - b.voteScore
                };
            } else if(value === 'stampUp' && (document.getElementsByClassName("stampUp")[0].className).indexOf("down") >-1) {
                document.getElementsByClassName("stampUp")[0].className += " up";
                document.getElementsByClassName("stampUp")[0].classList.remove("down");
                return function(a,b) {
                    return b.voteScore - a.voteScore
                }
            }
        }
    }
}
