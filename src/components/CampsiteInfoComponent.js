import React from 'react';
import {
	Button, Card, CardImg, CardText,
	CardBody, Breadcrumb, BreadcrumbItem,
	Modal, ModalBody, ModalHeader, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isModalOpen : false
		}

		this.toggleModal = this.toggleModal.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	toggleModal(){
		this.setState({
			isModalOpen : !this.state.isModalOpen
		})
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
	}

	render(){

		return (
			<div>
				<Button outline onClick={this.toggleModal} > <i className='fa fa-pencil fa-lg' /> Submite Comment </Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={values => this.handleSubmit(values)}>
							<div className='form-group'>
								<Label htmlFor="rate">Rating</Label>
								<Control.select className='form-control' model=".rating" name='rating' id='rating'>
									<option value="5">5</option>
									<option value="4">4</option>
									<option value="3">3</option>
									<option value="2">2</option>
									<option value="1">1</option>
								</Control.select>
							</div>
							<div className='form-group'>
								<Label htmlFor="author"> Your Name</Label>
								<Control.text model=".author" name="author" id="author"
									placeholder='author'
									className='form-control'
									validators={{
										required,
										minLength: minLength(2),
										maxLength: maxLength(15)
									}}
								/>
								<Errors
									className="text-danger"
									model=".author"
									component="div"
									messages={{
										minLength: 'Must be at least 2 characters',
										maxLength: 'Must be 15 characters or less'
									}}
								/>
							</div>
							<div className='form-group'>
								<Label htmlFor="comment"> Comment</Label>
								<Control.textarea className='form-control' rows="12" model=".text" name="text" id="text" />
							</div>
							<Button color="primary">Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
	
			</div >
	
		)
	}
}


function RenderCampsite({ campsite }) {
	return (
		<div className='col-md-5 m1 text-left'>
			<Card>
				<CardImg top src={campsite.image} alt={campsite.name} />
				<CardBody>
					{/* <CardTitle>{campsite.name}</CardTitle> */}
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	)
}

function RenderComments({ comments, addComment, campsiteId }) {
	if (comments) {
		return (
			<div className='col col-md-5 m-1'>
				<h4 className='text-left'>Comments</h4>
				<ul className='list-unstyled'>
					{comments.map(comment => <div className='text-left' key={comment.id}>
						<li>{comment.text}</li>
						<li>-- {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
						<p></p>
					</div>
					)}
					<CommentForm campsiteId={campsiteId} addComment={addComment} />
				</ul>
			</div>
		)
	}
	return <div />
}

function CampsiteInfo(props) {

	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h4>{props.errMess}</h4>
					</div>
				</div>
			</div>
		);
	}


	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
							<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments 
						comments={props.comments}
						addComment={props.addComment}
						campsiteId={props.campsite.id}
					 />
				</div>
			</div>
		);
	}
	return <div />;
}
export default CampsiteInfo;