import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import {getUrl, getCredentials} from './config'
import { Container, Grid, Header } from 'semantic-ui-react'



class PostDetailView extends Component {
  state = {
    commentsModalOpen : false,
    editComment: false, 
    comment: null,
  }

    onPostDeleted = (id) => {
        const url = `${getUrl()}/posts/${id}`
        fetch(url, {
            headers: {'Authorization': 'whatever-you-want'},
            credentials: getCredentials(),
            method: "DELETE"
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
            });
    }
    openCommentModal = (type, comment) => {
     this.setState({commentsModalOpen: true})
     if(type === true) {
       this.setState({editComment: true});
     } else {
        this.setState({editComment: false});
     }
     if(comment !== null) {
       this.setState({comment: comment})
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

          const postsUrl = `${getUrl()}/comments/${newObj.id}`;
          fetch(postsUrl, {
              method: "PUT",
              body:  JSON.stringify(newObj),
              headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
              credentials: getCredentials()
          })
              .then((res) => {
                  return (res.text())
              })
              .then((data) => {
                  this.props.onCommentEdited(JSON.parse(data));
              });
      }
      else {
          alert("Please enter correct values");
      }


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

        const postsUrl = `${getUrl()}/comments/${newObj.id}`;
        fetch(postsUrl, {
            method: "DELETE",
            headers:{'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
            credentials: getCredentials()
        })
            .then((res) => {
                return (res.text())
            })
            .then((data) => {
                this.props.onCommentDeleted(JSON.parse(data));
                return JSON.parse(data);
            });
      this.props.onCommentDeleted(newObj);
    }
    
	addComment = () => {
      if(this.commentBody.value.length > 0 && this.commentAuthor.value.length > 0) {
          this.setState({commentsModalOpen: false});
          const commentObj = {
              id: "894tuq4ut84ut8v4t8wun" + Math.random(100),
              parentId: this.props.id,
              timestamp: Date.now(),
              body: this.commentBody.value,
              author: this.commentAuthor.value
          }

          const postsUrl = `${getUrl()}/comments`;
          fetch(postsUrl, {
              method: "POST",
              body:  JSON.stringify(commentObj),
              headers: {'Authorization': 'whatever-you-want', 'Content-Type': 'application/json'},
              credentials: getCredentials()
          })
              .then((res) => {
                  return (res.text())
              })
              .then((data) => {
                  this.props.onCommentAdded(JSON.parse(data));
              });
      }
      else {
          alert("Please enter correct values");
      }

     }

     onUpdateCommentScore = (obj, value) => {
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
                 this.props.onCommentEdited(JSON.parse(data));
             });
     }

    render() {
        return (
        <div><Container style={{ padding: '5em 0em' }}>
            <Header as='h2'>Post Details</Header>
            <Grid columns={1}>
                <Grid.Column>
                    <table style={{marginTop: 25 + 'px'}} className="ui celled table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Content</th>
                            <th>Timestamp</th>
                            <th>Votescore</th>
                            <th colSpan={this.props.comments.comments.length}></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.details.map(obj =>
                            this.props.id === obj.id && <tr>
                                <td>{obj.title}</td>
                                <td>{obj.author}</td>
                                <td>{obj.body}</td>
                                <td>{obj.timestamp}</td>
                                <td>{obj.voteScore}
                                    <button className="ui icon button voteup" onClick={() => this.props.updateVote(obj, "upVote")}>
                                        <i className="caret up icon"></i>
                                    </button>
                                    <button className="ui icon button votedown" onClick={() => this.props.updateVote(obj, "downVote")}>
                                        <i className="caret down icon"></i>
                                    </button>
                                </td>
                                {this.props.comments.comments && this.props.comments.comments.map((comment) =>
                                    comment.parentId === obj.id &&
                                    <td>{`${comment.body} by ${comment.author}`}
                                        <div className="inline">
                                            {`Score: ${comment.voteScore}`}
                                            <button className="ui icon button voteup" onClick={() => this.onUpdateCommentScore(comment, "upVote")}>
                                                <i className="caret up icon"></i>
                                            </button>
                                            <button className="ui icon button votedown" onClick={() => this.onUpdateCommentScore(comment, "downVote")}>
                                                <i className="caret down icon"></i>
                                            </button>
                                        </div>
                                        <div className="inline">
                                            <button className="ui secondary basic button mini" onClick={() => this.openCommentModal(true, comment)}>Edit</button>
                                        </div>
                                            <div className="inline">
                                                <Link to="/"><button className="ui secondary basic button mini" onClick={() => this.onCommentDeleted(comment)}>Delete</button></Link>
                                            </div>
                                    </td>)}
                                <td className="noBorder">
                                    <div className="inline">
                                        <button className="ui secondary basic button mini" onClick={() => this.openCommentModal(false, null)}>Add Comment</button>
                                    </div>
                                    <div className="inline">
                                        <Link to='/AddPost' onClick={() => this.props.onEdit(obj)}><button className="ui secondary basic button mini">Edit</button></Link>
                                    </div>
                                    <div className="inline">
                                        <Link to='/'><button className="ui secondary basic button mini"  onClick={() => this.props.onPostDeleted(obj)}>Delete</button></Link>
                                    </div></td>
                            </tr>)}
                        </tbody>
                    </table>
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
                </div>
            </Modal>
          </div>
        );
    }
}
export default PostDetailView;
