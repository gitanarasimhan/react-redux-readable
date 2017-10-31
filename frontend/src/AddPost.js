import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

class AddPost extends Component {
    state = {
        value: 'react'
    }
  componentWillMount() {
    if(this.props.postid !== null && this.props.postid.postid) {
      this.fillVal = this.props.postid.postid;
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }


    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
  onAddPostClicked = () => {
   const title = this.postTitle;
   const author = this.postAuthor;
   const content = this.postContent;
   const category = this.state.value;
   if(title.value.length >0 && author.value.length >0 && content.value.length >0) {
       const obj = {
           title: title.value,
           body: content.value,
           author: author.value,
           timestamp: Date.now(),
           id: "8xf0y6ziyjabvozdd"+ Math.random(100),
           category: category,
           deleted: false,
           voteScore: 1

       }
       this.props.history.push("/");
       this.props.onSubmit(obj);
   }
  }
 onPostEdited = () => {
    const value = this.props.postid.postid;
   if(this.postTitle.value.length >0 && this.postContent.value.length>0 && this.props.postid !== null) {
           const obj = {
               title: this.postTitle.value,
               body: this.postContent.value,
               author: value.author,
               timestamp: value.timestamp,
               id: value.id,
               category: value.category,
               deleted: value.deleted,
               voteScore: value.voteScore
           }
       this.props.history.push("/");
       this.props.onPostEdited(obj);
   }
 }
 render() {
        return (
        <form>
            <div>
                <Container style={{ padding: '5em 0em' }}>
                    <div className="ui form">
                        <div className="fields">
                            <div className="field">
                                <label>Title</label>
                                <input name="title" required minLength="4" type="text" placeholder="Post title" ref={(input) => { this.postTitle = input; }} defaultValue={this.fillVal && this.fillVal!==null && this.fillVal.title}/>
                            </div>
                            <div className="field">
                                <label>Author</label>
                                <input name="author" required minLength="2" maxLength="45" type="text" placeholder="Post author" disabled={this.disabled} ref={(input) => { this.postAuthor = input; }} defaultValue={this.fillVal && this.fillVal!==null
                                && this.fillVal.author}/>
                            </div>
                        </div>
                        <div className="field">
                            <label>Content</label>
                            <input name="content" required minLength="6" maxLength="250" type="text" placeholder="Post Content"  ref={(input) => { this.postContent = input; }} defaultValue={this.fillVal && this.fillVal!==null
                            && this.fillVal.body}/>
                        </div>
                        <div className="fields">
                            <div className="field">
                                <label>Category</label>
                                <select disabled={this.disabled} onChange={this.handleChange}>{this.props.categories.map((obj)=> <option key={obj.path} value={(this.fillVal && this.fillVal!==null && this.fillVal.category) || obj.name}>{obj.name}</option>)}</select>
                            </div>
                        </div>
                        <div className="fields">
                            {this.fillVal === undefined &&  <button className="ui button"  onClick={this.onAddPostClicked}>Add Post</button>}
                            {this.fillVal && <button className="ui button" onClick={this.onPostEdited}>Edit Post</button>}
                        </div>
                    </div>
                </Container>

            </div>
        </form>
        )
 }
}

export default withRouter(AddPost);
