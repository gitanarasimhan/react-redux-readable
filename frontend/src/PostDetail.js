import React, {Component} from 'react';
import './App.css';
import {Link, withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import { Container, Grid, Header } from 'semantic-ui-react'
import {getCurrPost, onUpdateScore} from './actions'



class PostDetailView extends Component {
  state = {
    commentsModalOpen : false,
    editComment: false, 
    comment: null,
  }

  componentWillReceiveProps(){
      var str = "/category/posts/";
      var length = str.length;
      var subStr = this.props.location.pathname.substr(length,this.props.location.pathname.length);
      this.props.ongetCurrentPost(subStr);
  }

  componentWillMount() {
      var str = "/category/posts/";
      var length = str.length;
      var subStr = this.props.location.pathname.substr(length,this.props.location.pathname.length);
      this.props.ongetCurrentPost(subStr);
  }
    openCommentModal = (type, comment) => {
     this.setState({commentsModalOpen: true})
     if(type) {
       this.setState({editComment: true});
     } else {
        this.setState({editComment: false});
     }
     if(comment !== null) {
       this.setState({comment})
     } 
    }
	onCommentEdited = () => {
      if(this.commentBody.value.length >0) {
          this.setState({commentsModalOpen: false});
          const obj = this.state.comment;
          const newObj = {
              id: obj.id,
              parentId: obj.parentId,
              timestamp: obj.timestamp,
              body: this.commentBody.value,
              author: this.commentAuthor.value,
              deleted: obj.deleted,
              voteScore: obj.voteScore,
              parentDeleted: obj.parentDeleted
          }
          this.props.onCommentEdited(newObj);
      }
      else {
          document.getElementsByClassName("errorMsg")[0].innerHTML = "Please enter the correct values";      }
    }

	onCommentDeleted = (comment) => {
      const newObj = {
       id: comment.id,
   	   parentId: comment.parentId,
       timestamp: comment.timestamp,
       body: comment.body,
       author: comment.author,
       deleted: comment.deleted,
       voteScore: comment.voteScore,
       parentDeleted: comment.parentDeleted  
      }
        this.props.onCommentDeleted(newObj);
    }
    
	addComment = () => {
      if(this.commentBody.value.length > 0 && this.commentAuthor.value.length > 0) {
          this.setState({commentsModalOpen: false});
          const commentObj = {
              id: "894tuq4ut84ut8v4t8wun" + Math.random(100),
              parentId: this.props.getCurrentPost.id,
              timestamp: Date.now(),
              body: this.commentBody.value,
              author: this.commentAuthor.value
          }
          this.props.onCommentAdded(commentObj);
      }
      else {
          document.getElementsByClassName("errorMsg")[0].innerHTML = "Please enter the correct values";
      }
     }

     getPostsCount = () => {
         let count  = 0;
         {this.props.posts.posts.map(obj =>
             this.props.getCurrentPost.id === obj.id && !obj.deleted && count++)};
         return count;
     }

    render() {
        return (
        <div><Container style={{ padding: '5em 0em' }}>
            {this.getPostsCount() > 0 && <Header as='h2'>Post Details</Header>}
            <Grid columns={1}>
                <Grid.Column>
                    {this.getPostsCount() === 0 && <div>Post may have been deleted </div>}
                    {this.getPostsCount() > 0 && <table style={{marginTop: 25 + 'px'}} className="ui celled table">
                        <tbody>
                        {this.props.posts.posts.map(obj =>
                            this.props.getCurrentPost.id === obj.id && !obj.deleted && <tr key={obj.id}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Content</th>
                                        <th>Timestamp</th>
                                        <th>Votescore</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="borderBottom">{obj.title}</td>
                                        <td className="borderBottom">{obj.author}</td>
                                        <td className="borderBottom">{obj.body}</td>
                                        <td className="borderBottom">{obj.timestamp}</td>
                                        <td className="borderBottom">{obj.voteScore}
                                            <button className="ui icon button voteup" onClick={() => this.props.updateVote(obj, "upVote")}>
                                                <i className="caret up icon"></i>
                                            </button>
                                            <button className="ui icon button votedown" onClick={() => this.props.updateVote(obj, "downVote")}>
                                                <i className="caret down icon"></i>
                                            </button>
                                        </td>
                                        <td className="borderBottom">
                                            <div className="inline">
                                                <button className="ui secondary basic button mini" onClick={() => this.openCommentModal(false, null)}>Add Comment</button>
                                            </div>
                                            <div className="inline">
                                                <Link to='/posts/addPost' onClick={() => this.props.onEdit({postid: obj})}><button className="ui secondary basic button mini">Edit</button></Link>
                                            </div>
                                            <div className="inline">
                                                <Link to='/'><button className="ui secondary basic button mini"  onClick={() => this.props.onPostDeleted(obj)}>Delete</button></Link>
                                            </div></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                    <tr>
                                        {this.props.comments.comments && this.props.comments.comments.map((comment) =>
                                        comment.parentId === obj.id && !comment.deleted &&
                                        <td key={comment.id}>{`${comment.body} by ${comment.author}`}
                                            <div className="inline">
                                                {`Score: ${comment.voteScore}`}
                                                <button className="ui icon button voteup" onClick={() => this.props.updateScore(comment, "upVote")}>
                                                    <i className="caret up icon"></i>
                                                </button>
                                                <button className="ui icon button votedown" onClick={() => this.props.updateScore(comment, "downVote")}>
                                                    <i className="caret down icon"></i>
                                                </button>
                                            </div>
                                            <div className="inline">
                                                <button className="ui secondary basic button mini" onClick={() => this.openCommentModal(true, comment)}>Edit</button>
                                            </div>
                                            <div className="inline">
                                                <button className="ui secondary basic button mini" onClick={() => this.onCommentDeleted(comment)}>Delete</button>
                                            </div>
                                        </td>)}
                                    </tr>
                                    </tbody>
                                </table>
                            </tr>)}
                        </tbody>
                    </table>}
                </Grid.Column>
            </Grid>
        </Container>

            <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.commentsModalOpen}
                onRequestClose={this.addComment}
                contentLabel='Modal'>
                <div className="ui form">
                        <div className="field">
                            <label>Content</label>
                            {this.state.editComment === true && <input required minLength="6" maxLength="120" type="text" placeholder="Comment" ref={(input) => {
                                this.commentBody = input;}} defaultValue={this.state.comment.body}/>}
                            {this.state.editComment === false && <input required minLength="6" maxLength="120" type="text" placeholder="Comment" ref={(input) => {
                                this.commentBody = input;}} />}
                        </div>
                    <div className="field" disabled={this.state.editComment}>
                        <label>Author</label>
                        {this.state.editComment === true && <input type="text" placeholder="Comment" ref={(input) => {
                            this.commentAuthor = input;}} defaultValue={this.state.comment.author} disabled={this.state.editComment}/>}
                        {this.state.editComment === false && <input required minLength="6" maxLength="120" type="text" placeholder="Comment" ref={(input) => {
                            this.commentAuthor = input;}}/>}
                    </div>
                    <div className="fields">
                        <div className="field">
                            {this.state.editComment === false &&
                            <button className="ui button mini" onClick={this.addComment}>Add</button>}
                            {this.state.editComment === true &&
                            <button className="ui button mini" onClick={this.onCommentEdited}>Edit
                                </button>}</div>
                        <div className="field">
                            <button className="ui secondary button mini"
                                    onClick={() => this.setState({commentsModalOpen: false})}>Cancel
                            </button>
                        </div>
                    </div>
                    <div className="errorMsg"></div>
                </div>
            </Modal>
          </div>
        );
    }
}

function mapStateToProps ({ categories, posts, postid, comments,getCurrentPost }) {
    return {categories, posts, postid, comments, getCurrentPost};
}

function mapDispatchToProps (dispatch) {
    return {
        ongetCurrentPost: (data) => dispatch(getCurrPost(data)),
        updateScore: (data, value) => dispatch(onUpdateScore(data, value)),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailView));
