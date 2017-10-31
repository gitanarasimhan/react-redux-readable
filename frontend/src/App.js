import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import { addNewPosts, toEditPost, fillData, retrievePostID, getCurrentCategory, onCommentAdded, onEditComment, onCommentDeleted, onPostDeleted, updateVoteScore} from './actions'
import {capitalize} from './utils/helpers'
import {Route} from 'react-router-dom';
import CategoryView from './CategoryView';
import PostDetailView from './PostDetail';
import AddPost from './AddPost';
import {Link, withRouter} from 'react-router-dom';
import {getCommentCount, getSortFn} from './config';
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
        this.props.onGetCategories();
    }


render() {
    return (
        <div className="readable">
            <div className="ui pointing menu menuItems">
                <Link to='/' className="item">
                    Categories
                </Link>
                <Link to ='/posts/addPost' className="item" onClick={() => this.props.onEditPost(null)}>
                    Add Post
                </Link>
            </div>

        <Route exact path='/' render={() => (
        <Container style={{ padding: '5em 0em' }}>
            <Header as='h2'>CATEGORIES</Header>
        <Grid columns={2}>
           <Grid.Column >
        {this.props.categories.categories.length > 0 && this.props.categories.categories.map(obj =>
        <Link key={obj.path} to={`/${obj.path}`} float='right'><Segment>{obj.name && capitalize(obj.name)}</Segment></Link>
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
                   <th>Timestamp<Button className="ui icon button voteup" onClick={() => {this.setState({sortFn: getSortFn('stampUp')})}}><i className="stampUp angle up icon"></i></Button></th>
                   <th>VoteScore<Button className="ui icon button voteup" onClick={() => {this.setState({sortFn: getSortFn('stampUp')})}}><i className="voteScore angle up icon"></i></Button></th>
               </tr>
    {this.props.posts.posts.length >0 && this.props.posts.posts.sort(this.state.sortFn).map(obj => obj.deleted === false && <tr key={obj.id}>
        <td><Link key={obj.id} to={`/category/posts/${obj.id}`}><Segment>{obj.title && `${obj.title} by ${capitalize(obj.author)} --- ${capitalize(obj.body)}`}</Segment></Link></td>
                  <td><Segment>{this.props.comments.comments.length >0 && getCommentCount(obj, this.props.comments.comments)}</Segment></td>
                  <td><Segment>{obj.timestamp}</Segment></td>
                  <td><Segment>{obj.voteScore}
                  <button className="ui icon button voteup" onClick={() => this.props.onupdateVoteScore(obj, "upVote")}>
                         <i className="caret up icon"></i>
                  </button>
                 <button className="ui icon button votedown" onClick={() => this.props.onupdateVoteScore(obj, "downVote")}>
                     <i className="caret down icon"></i>
                 </button>
                  </Segment></td>

                   <td><Button basic><Link to='/posts/addPost' onClick={() => this.props.onEditPost({postid: obj})}>Edit</Link></Button></td>
                  <td><Button basic onClick={() => this.props.onPostDeleted(obj)}>Delete</Button></td>
                </tr>)}
                </tbody>
            </table>
            </Grid.Column>
        </Grid>

    </Container>
)}/>
<Route exact path='/:id' render={() => (
    <CategoryView editPost={this.props.onEditPost} postDeleted={this.props.onPostDeleted}/>
)}/>
<Route path='/category/posts/:id' render={() => (
    <PostDetailView onEdit={this.props.onEditPost} onCommentAdded = {this.props.onNewCommentAdded} updateVote={this.props.onupdateVoteScore} onCommentEdited = {this.props.editComment} onCommentDeleted = {this.props.deleteComment} onPostDeleted = {this.props.onPostDeleted}/>
)}/>
<Route path='/posts/addPost' render={() => (
    <AddPost onSubmit={this.props.onNewPostAdded} postid={this.props.postid} categories={this.props.categories.categories} onPostEdited={this.props.onPostEdited}/>
)}/>



</div>

)
}
}
function mapStateToProps ({ categories, posts, postid, comments, currentCategory }) {
    return {categories, posts, postid, comments, currentCategory};
}

function mapDispatchToProps (dispatch) {
    return {
        onNewPostAdded: (data) => dispatch(addNewPosts(data)),
        onGetCategories: () => dispatch(fillData()),
        onEditPost: (data) => dispatch(retrievePostID(data)),
        onNewCommentAdded : (data) => dispatch(onCommentAdded(data)),
        editComment: (data) => dispatch(onEditComment(data)),
        deleteComment: (data) => dispatch(onCommentDeleted(data)),
        onPostEdited: (data) => dispatch(toEditPost(data)),
        onPostDeleted : (data) => dispatch(onPostDeleted(data)),
        onupdateVoteScore : (data, value) => dispatch(updateVoteScore(data, value)),
        onAddCurrentCategory: (data) => dispatch(getCurrentCategory(data))
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

