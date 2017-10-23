import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {getUrl, getCredentials} from './config';
import {Container} from 'semantic-ui-react';

class AddPost extends Component {
  componentWillMount() {
    if(this.props.postid !== null) {
      this.fillVal = this.props.postid;
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  componentDidMount() {

  }
  onAddPostClicked = () => {
   const title = this.postTitle;
   const author = this.postAuthor;
   const content = this.postContent;
   const category = this.postCategory;
   if(title.value.length >0 && author.value.length >0 && content.value.length >0) {
       const obj = {
           title: title.value,
           body: content.value,
           author: author.value,
           timestamp: Date.now(),
           id: "8xf0y6ziyjabvozdd"+ Math.random(100),
           category: category.value,
           deleted: false,
           voteScore: 1

       }
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
               this.props.onSubmit(JSON.parse(output));
           });
   }
  }
 onPostEdited = () => {
   const value = this.props.postid;
   if(this.postTitle.value.length >0 && this.postContent.value.length>0 ) {
       if(value !== null) {
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
                   this.props.onPostEdited(JSON.parse(data));
               });
       }
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
                                <input name="title" required minlength="4" type="text" placeholder="Post title" ref={(input) => { this.postTitle = input; }} defaultValue={this.fillVal && this.fillVal!==null && this.fillVal.title}/>
                            </div>
                            <div className="field">
                                <label>Author</label>
                                <input name="author" required minlength="2" maxLength="45" type="text" placeholder="Post author" disabled={this.disabled} ref={(input) => { this.postAuthor = input; }} defaultValue={this.fillVal && this.fillVal!==null
                                && this.fillVal.author}/>
                            </div>
                        </div>
                        <div className="field">
                            <label>Content</label>
                            <input name="content" required minlength="6" maxLength="250" type="text" placeholder="Post Content"  ref={(input) => { this.postContent = input; }} defaultValue={this.fillVal && this.fillVal!==null
                            && this.fillVal.body}/>
                        </div>
                        <div className="fields">
                            <div className="field">
                                <label>Category</label>
                                <select disabled={this.disabled}>{this.props.categories.map((obj)=> <option value={(this.fillVal && this.fillVal!==null && this.fillVal.category) || obj.name} ref={(input)=>{this.postCategory = input}}>{obj.name}</option>)}</select>
                            </div>
                        </div>
                        <div className="fields">
                            {this.fillVal === undefined &&  <Link to= '/'><button className="ui button"  onClick={this.onAddPostClicked}>Add Post</button></Link>}
                            {this.fillVal && <Link to= '/' onClick={this.onPostEdited}><button className="ui button">Edit Post</button></Link>}
                        </div>
                    </div>
                </Container>

            </div>
        </form>
        )
 }
}

export default AddPost;