import React, { Component } from 'react'
import ReviewList from '../ReviewList'
import NewReviewForm from '../NewReviewForm'
import EditReviewModal from '../EditReviewModal'

export default class ReviewContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			reviews: [],
			idOfReviewToEdit: -1
		}
	}

	componentDidMount() {
		this.getReviews()
	}

	getReviews = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/reviews/"
			console.log(url);
			const reviewsResponse = await fetch(url, {
				credentials: 'include'
			})

			const reviewsJson = await reviewsResponse.json()
			console.log(reviewsJson)

			this.setState({
				reviews: reviewsJson.data
			})
		
		} catch(error) {
			console.error("Error obtaining review data.", error)

		}
	}

	deleteReview = async (idOfReviewToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/reviews/" + idOfReviewToDelete
		console.log(url)
		try {
			const deleteReviewResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})
			console.log("deleteReviewResponse", deleteReviewResponse)
			const deleteReviewJson = await deleteReviewResponse.json()
			console.log("deleteReviewJson", deleteReviewJson);

			if(deleteReviewResponse.status === 200) {
				this.setState({
					reviews: this.state.reviews.filter(review => review.id !== idOfReviewToDelete)
				})
			}
		} catch(err) {
			console.log("Error with deleting review")
			console.log(err)
		}
	}

	createReview = async(reviewToAdd) => {
		console.log(reviewToAdd)

		try {
			const url = process.env.REACT_APP_API_URL + "/reviews/"
			const createReviewResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reviewToAdd)
			})

			const createReviewJson = await createReviewResponse.json()
			console.log(createReviewJson)

			if(createReviewResponse.status === 201) {

				this.setState({
					reviews: [...this.state.reviews, createReviewJson.data]
				})
			}
		} catch(err) {
			console.log("Error adding a review")
			console.log(err)
		}
	}

	editReview = (idOfReviewToEdit) => {
		console.log("testing edit", idOfReviewToEdit)
		this.setState({
			idOfReviewToEdit: idOfReviewToEdit
		})
	}

	updateReview = async (updatedReviewInfo) => {
		const url = process.env.REACT_APP_API_URL + "/reviews/" + this.state.idOfReviewToEdit


		try {
			const updateReviewResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(updatedReviewInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updateReviewResponse", updateReviewResponse)

			const updateReviewJson = await updateReviewResponse.json()
			console.log("updateReviewJson", updateReviewJson)

			if(updateReviewResponse.status === 200) {
				const reviews = this.state.reviews
				const indexOfReviewBeingUpdated = reviews.findIndex(review => review.id === this.state.idOfReviewToEdit)
				reviews[indexOfReviewBeingUpdated] = updateReviewJson.data
				this.setState({
					reviews: reviews,
					idOfReviewToEdit: -1
				})
			}	
		
		} catch(err) {
			console.log("Error updating review")
			console.log(err)
		}

	}

	closeModal = () => {
		this.setState({
			idOfReviewToEdit: -1
		})
	}


	
	render() {
		
		return(
			<React.Fragment>
				<h2> Check out these Restroom Reviews </h2>
				<NewReviewForm createReview={this.createReview} />
				<ReviewList
					reviews={this.state.reviews}
					deleteReview={this.deleteReview}
					editReview={this.editReview}
				/>
				{
					this.state.idOfReviewToEdit !== -1
					&&
					<EditReviewModal
						key={this.state.idOfReviewToEdit}
						reviewToEdit={this.state.reviews.find((review) => review.id === this.state.idOfReviewToEdit)}
						updateReview={this.updateReview}
						closeModal={this.closeModal}
					/>
				}
			</React.Fragment>
		)
	}
}