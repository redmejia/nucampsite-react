import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCampsite({ campsite }) {
	// console.log("redering camp" , campsite);
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

function RenderComments({ comments }) {
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

function CampsiteInfo(props) {
	
	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	}
	return <div />;
}
export default CampsiteInfo;