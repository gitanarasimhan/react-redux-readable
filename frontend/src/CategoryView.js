import React, {Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import {capitalize} from './utils/helpers';
import {Link, withRouter} from 'react-router-dom';
import {getCommentCount} from './config';
import { Container, Grid, Header,Segment, Button } from 'semantic-ui-react';
import {getCurrentCategory, getCurrCategoryPostCount, updateVoteScore} from './actions';



class CategoryView extends Component {
    componentWillReceiveProps() {
        var subString = this.props.location.pathname.substr(1, this.props.location.pathname.length);
        this.props.onAddCurrentCategory(subString);
        let catCount=0;
        this.props.posts.posts.map((obj) => {
            obj.category === subString && obj.deleted === false ? catCount++ : catCount
        })
        this.props.onAddCurrentCategoryPostCount(catCount);


    }

    componentWillMount() {
        var subString = this.props.location.pathname.substr(1, this.props.location.pathname.length);
        this.props.onAddCurrentCategory(subString);
        let catCount=0;
        this.props.posts.posts.map((obj) => {
            obj.category === subString && obj.deleted === false ? catCount++ : catCount
        })
        this.props.onAddCurrentCategoryPostCount(catCount);

    }
    render() {
        return (
            <div>
                <Container style={{ padding: '5em 0em' }}>
                    {this.props.category && this.props.currentCategoryPostCount.count > 0 && <Header as='h2'>Posts for category:  {this.props.currentCategory.category}</Header>}
                    <Grid columns={1}>
                        <Grid.Column >
                            {this.props.currentCategoryPostCount.count === 0 && <div>No Posts to show!</div>}
                            {this.props.currentCategoryPostCount.count > 0 && <table style={{marginTop: 25 + 'px'}}>
                                <tbody>
                                <tr>
                                    <th>Details</th>
                                    <th>Comments</th>
                                    <th>VoteScore</th>
                                </tr>
                                {this.props.posts.posts.sort(function (a, b) {
                                    return b.voteScore - a.voteScore
                                }).map(obj =>
                                obj.deleted === false && obj.category === this.props.currentCategory.category
                                && <tr key={obj.id}>
                                    <td><Link key={obj.id} to={`/category/posts/${obj.id}`}><Segment>{`${obj.title} by ${capitalize(obj.author)} --- ${capitalize(obj.body)}  `}
                                    </Segment></Link></td>
                                    <td><Segment>{this.props.comments.comments.length >0 && getCommentCount(obj, this.props.comments.comments)}</Segment></td>
                                    <td><Segment>{obj.voteScore}
                                        <button className="ui icon button voteup" onClick={() => this.props.onupdateVoteScore(obj, "upVote")}>
                                            <i className="caret up icon"></i>
                                        </button>
                                        <button className="ui icon button votedown" onClick={() => this.props.onupdateVoteScore(obj, "downVote", this.props.postEdited)}>
                                            <i className="caret down icon"></i>
                                        </button>
                                    </Segment></td>
                                    <td><Button basic><Link to='/posts/addPost' onClick={() => this.props.editPost({postid: obj})}>Edit</Link></Button></td>
                                    <td><Button basic onClick={() => this.props.postDeleted(obj)}><Link to ='/'>Delete</Link></Button></td>
                                </tr>)}
                                </tbody>
                            </table>}
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

function mapStateToProps ({ categories, posts, postid, comments, currentCategory, currentCategoryPostCount }) {
    return {categories, posts, postid, comments, currentCategory, currentCategoryPostCount};
}

function mapDispatchToProps (dispatch) {
    return {
        onAddCurrentCategory: (data) => dispatch(getCurrentCategory(data)),
        onAddCurrentCategoryPostCount: (data) => dispatch(getCurrCategoryPostCount(data)),
        onupdateVoteScore : (data, value) => dispatch(updateVoteScore(data, value))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryView));
