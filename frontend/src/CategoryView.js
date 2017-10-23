import React, {Component} from 'react';
import './App.css';
import {capitalize} from './utils/helpers';
import {Link} from 'react-router-dom';
import {getCommentCount} from './config';
import { Container, Grid, Header,Segment, Button } from 'semantic-ui-react'



class CategoryView extends Component {
    render() {
        return (
            <div>
                <Container style={{ padding: '5em 0em' }}>
                    {this.props.category && this.props.categoryCount > 0 && <Header as='h2'>Posts for category:  {this.props.category}</Header>}
                    <Grid columns={1}>
                        <Grid.Column >
                            {this.props.categoryCount === 0 && <div>No Posts to show!</div>}
                            {this.props.categoryCount > 0 && <table style={{marginTop: 25 + 'px'}}>
                                <tbody>
                                <tr>
                                    <th>Details</th>
                                    <th>Comments</th>
                                    <th>VoteScore</th>
                                </tr>
                                {this.props.postsCategory.sort(function (a, b) {
                                    return b.voteScore - a.voteScore
                                }).map(obj =>
                                obj.deleted === false && obj.category === this.props.category && <tr key={obj.id}>
                                    <td><Link key={obj.id} to={`/category/posts/${obj.id}`} onClick= {()=> {this.props.postDetails(obj.id)}}><Segment>{`${obj.title} by ${capitalize(obj.author)} --- ${capitalize(obj.body)}  `}
                                    </Segment></Link></td>
                                    <td><Segment>{this.props.comments.comments.length >0 && getCommentCount(obj, this.props.comments.comments)}</Segment></td>
                                    <td><Segment>{obj.voteScore}
                                        <button className="ui icon button voteup" onClick={() => this.props.updateVote(obj, "upVote")}>
                                            <i className="caret up icon"></i>
                                        </button>
                                        <button className="ui icon button votedown" onClick={() => this.props.updateVote(obj, "downVote", this.props.postEdited)}>
                                            <i className="caret down icon"></i>
                                        </button>
                                    </Segment></td>
                                    <td><Button basic><Link to='/AddPost' onClick={() => this.props.editPost(obj)}>Edit</Link></Button></td>
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
export default CategoryView;
