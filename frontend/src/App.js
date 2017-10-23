import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import { addNewPost, retrieveCategories, retrievePostID, addNewComments, retrieveComments, editComment, commentDeleted, editPost, deletePost, getExistingPosts} from './actions'
import {capitalize} from './utils/helpers'
import {Route} from 'react-router-dom';
import CategoryView from './CategoryView';
import PostDetailView from './PostDetail';
import AddPost from './AddPost';
import {Link, withRouter} from 'react-router-dom';
import {getUrl, getCredentials, getCommentCount} from './config';
import './semantic/dist/semantic.min.css';
import { Container, Grid, Header,Segment, Button } from 'semantic-ui-react'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postByCategories: [],
            postsDetails: "",
            category: '',
            sortFn: function(a,b) {
                return b.voteScore - a.voteScore
            }
        }
    }

    componentDidMount() {
        const categoryUrl  = `${getUrl()}/categories`;
        fetch(categoryUrl, {
            headers:  {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
            return (res.text())
    })
    .then((data) => {
            JSON.parse(data).categories.map(obj=>this.props.onGetCategories(obj));
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
            JSON.parse(data).map(obj=> {this.props.ongetExistingPosts(obj);
                        this.ongetComment(obj.id)}
            );
    });
    }

    getPostByCategory = (category) => {
        let catCount=0;
        this.props.posts.posts.map((obj) => {
            obj.category === category.innerText.toLocaleLowerCase() && obj.deleted === false ? catCount++ : catCount
        })
        this.setState({category: category.innerText.toLocaleLowerCase()});
        this.setState({count: catCount});

    }

ongetComment = (id) => {
    const postComments = `${getUrl()}/posts/${id}/comments`;
    fetch(postComments, {
        headers: {'Authorization': 'whatever-you-want'},
        credentials: getCredentials()

    })
        .then((res) => {
        return (res.text())
})
.then((data) => {
        JSON.parse(data).map(obj=>this.props.onGetExistingComments(obj));
});
}

ongetPostDetails = (data) => {
    this.setState({postsDetails: data});
}

    onUpdateVoteScore = (obj, value) => {
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
                this.props.onPostEdited(JSON.parse(data));
            });
    }

    getSortFn = (value) => {
        if(document.getElementsByClassName("voteScore")[0]) {
            if(value === 'voteScore' && (document.getElementsByClassName("voteScore")[0].className).indexOf("up") >-1) {
                document.getElementsByClassName("voteScore")[0].className += " down";
                document.getElementsByClassName("voteScore")[0].classList.remove("up");
                this.setState({sortFn: function(a,b) {
                    return a.voteScore - b.voteScore
                }});
                } else if(value === 'voteScore' && (document.getElementsByClassName("voteScore")[0].className).indexOf("down") >-1) {
                document.getElementsByClassName("voteScore")[0].className += " up";
                document.getElementsByClassName("voteScore")[0].classList.remove("down");
                this.setState({sortFn: function(a,b) {
                    return b.voteScore - a.voteScore
                }});
            }

            if(document.getElementsByClassName("stampUp")[0]) {
                if(value === 'stampUp' && (document.getElementsByClassName("stampUp")[0].className).indexOf("up") >-1) {
                    document.getElementsByClassName("stampUp")[0].className += " down";
                    document.getElementsByClassName("stampUp")[0].classList.remove("up");
                    this.setState({sortFn: function(a,b) {
                        return a.voteScore - b.voteScore
                    }});
                } else if(value === 'stampUp' && (document.getElementsByClassName("stampUp")[0].className).indexOf("down") >-1) {
                    document.getElementsByClassName("stampUp")[0].className += " up";
                    document.getElementsByClassName("stampUp")[0].classList.remove("down");
                    this.setState({sortFn: function(a,b) {
                        return b.voteScore - a.voteScore
                    }});
                }
            }
        }
    }





render() {
    return (
        <div className="readable">
            <div className="ui pointing menu menuItems">
                <Link to='/' className="item">
                    Categories
                </Link>
                <Link to ='/addPost' className="item" onClick={() => this.props.onEditPost(null)}>
                    Add Post
                </Link>
            </div>

        <Route exact path='/' render={() => (
        <Container style={{ padding: '5em 0em' }}>
            <Header as='h2'>CATEGORIES</Header>
        <Grid columns={2}>
           <Grid.Column >
        {this.props.categories.categories.length > 0 && this.props.categories.categories.map(obj =>
        <Link key={obj.path} to={`/category/${obj.path}`} float='right'><Segment onClick={(event) => this.getPostByCategory(event.currentTarget)}>{obj.name && capitalize(obj.name)}</Segment></Link>
)}
            </Grid.Column>
           <Grid.Column>
    </Grid.Column>
            </Grid>
    <div className='posts'></div>
    <Header as='h2'>POSTS</Header>

        <Grid>
            <Grid.Column >
            <table>
              <tbody>
               <tr>
                 <th>Post Details</th>
                 <th>Comments</th>
                   <th>Timestamp<Button className="ui icon button voteup" onClick={() => {this.getSortFn('stampUp')}}><i class="stampUp angle up icon"></i></Button></th>
                   <th>VoteScore<Button className="ui icon button voteup" onClick={() => {this.getSortFn('voteScore')}}><i class="voteScore angle up icon"></i></Button></th>
               </tr>
    {this.props.posts.posts.length >0 && this.props.posts.posts.sort(this.state.sortFn).map(obj => obj.deleted === false && <tr key={obj.id}>
        <td><Link key={obj.id} to={`/category/posts/${obj.id}`} onClick= {()=> {this.ongetPostDetails(obj.id)}}><Segment>{obj.title && `${obj.title} by ${capitalize(obj.author)} --- ${capitalize(obj.body)}`}</Segment></Link></td>
                  <td><Segment>{this.props.comments.comments.length >0 && getCommentCount(obj, this.props.comments.comments)}</Segment></td>
                  <td><Segment>{obj.timestamp}</Segment></td>
                  <td><Segment>{obj.voteScore}
                  <button className="ui icon button voteup" onClick={() => this.onUpdateVoteScore(obj, "upVote")}>
                         <i className="caret up icon"></i>
                  </button>
                 <button className="ui icon button votedown" onClick={() => this.onUpdateVoteScore(obj, "downVote")}>
                     <i className="caret down icon"></i>
                 </button>
                  </Segment></td>

                   <td><Button basic><Link to='/AddPost' onClick={() => this.props.onEditPost(obj)}>Edit</Link></Button></td>
                  <td><Button basic onClick={() => this.props.onPostDeleted(obj)}>Delete</Button></td>
                </tr>)}
                </tbody>
            </table>
            </Grid.Column>
        </Grid>

    </Container>
)}/>
<Route exact path='/category/:id' render={() => (
    <CategoryView postsCategory={this.props.posts.posts} postDetails = {this.ongetPostDetails} category={this.state.category} categoryCount={this.state.count} comments={this.props.comments} updateVote={this.onUpdateVoteScore} editPost={this.props.onEditPost} postDeleted={this.props.onPostDeleted}/>
)}/>
<Route path='/category/posts/:id' render={() => (
    <PostDetailView details={this.props.posts.posts} updateCommentScore={this.props.updateCommentScore} id={this.state.postsDetails} comments={this.props.comments} onEdit={this.props.onEditPost} onCommentAdded = {this.props.onNewCommentAdded} updateVote={this.onUpdateVoteScore} onCommentEdited = {this.props.editComment} onCommentDeleted = {this.props.deleteComment} onPostDeleted = {this.props.onPostDeleted}/>
)}/>
<Route path='/addPost' render={() => (
    <AddPost onSubmit={this.props.onNewPostAdded} postid={this.props.postid} categories={this.props.categories.categories} onPostEdited={this.props.onPostEdited}/>
)}/>



</div>

)
}
}
function mapStateToProps ({ categories, posts, postid, comments }) {
    return {categories, posts, postid, comments};
}

function mapDispatchToProps (dispatch) {
    return {
        onNewPostAdded: (data) => dispatch(addNewPost(data)),
        onGetCategories: (data) => dispatch(retrieveCategories(data)),
        onEditPost: (data) => dispatch(retrievePostID(data)),
        onNewCommentAdded : (data) => dispatch(addNewComments(data)),
        onGetExistingComments : (data) => dispatch(retrieveComments(data)),
        editComment: (data) => dispatch(editComment(data)),
        deleteComment: (data) => dispatch(commentDeleted(data)),
        onPostEdited: (data) => dispatch(editPost(data)),
        onPostDeleted : (data) => dispatch(deletePost(data)),
        ongetExistingPosts: (data) => dispatch(getExistingPosts(data)),
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

