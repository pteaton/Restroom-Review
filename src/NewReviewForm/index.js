import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class NewReviewForm extends Component {

	constructor(props) {
		super(props)

		this.state = {
			title: '',
			review: '',
			location: '',
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.valu
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createReview(this.state)

		this.setState({
			title: '',
			review: '',
			location: '',
			posted_by: ''
		})
	}

	render() {
		return(
			<Segment>
				<h3> Add new review:</h3>
				<Form onSubmit={this.handleSubmit} >
					<Label>Title:</Label>
					<Form.Input
						type="text"
						name="title"
						value={this.state.title}
						placeholder="Title your review"
						onChange={this.handleChange}
					/>
					<Label>Review:</Label>
					<Form.Input
						type="text"
						name="review"
						value={this.state.review}
						placeholder="Type a review"
						onChange={this.handleChange}
					/>
					<Label>Location:</Label>
					<Form.Input
						type="text"
						name="location"
						value={this.state.location}
						placeholder="Enter a location"
						onChange={this.handleChange}
					/>
					<Button type="Submit">Create Review</Button>
				</Form>
			</Segment>
		)
	}
}

















