import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

	renderCampsite(campsite) {
		return (
			<div className='col-md-5 m1 text-left'>
				<Card>
					<CardImg top src={campsite.image} alt={campsite.name} />
					<CardBody>
						<CardTitle>{campsite.name}</CardTitle>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</div>
		)
	}

	renderComments(comments) {
		if (comments) {
			return (
				<div className='col col-md-5 m-1'>
					<h4 className='text-left'>Comments</h4>
					<ul className='list-unstyled'>
						{comments.map(comment => <div className='text-left' key={comment.id}>
							<li>{comment.text}</li>
							<li>-- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
							<p></p>
						</div>)}
					</ul>
				</div>
			)
		}
		return <div />
	}

	render() {
		if (this.props.campsite) {
			return (
				<div className="container">
					<div className="row">
						{this.renderCampsite(this.props.campsite)}
						{this.renderComments(this.props.campsite.comments)}
					</div>
				</div>
			);
		}
		return <div />;
	}
}

export default CampsiteInfo;