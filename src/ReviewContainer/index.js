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
			const url = process.env.REACT_APP_API_URL + "/api/v1/reviews/"
			console.log(url);
			const reviewsResponse = await fetch(url, {
				credentials: 'include'
			})

			const reviewsJson = await reviewsResponse.json()

			this.setState({
				reviews: reviewsJson.data
			})
		
		} catch(error) {
			console.error("Error obtaining review data.", error)
		}
	}

	deleteReview = async (idOfReviewToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/v1/reviews/"
	}


	
	render() {
		
		return(
			<React.Fragment>
				<h2> Check out these Reviews </h2>
				<NewReviewForm createReview={this.createReview} />
				<ReviewList
					reviews={this.state.reviews}
					deleteReview={this.deleteReview}
				/>
			</React.Fragment>
		)
	}
}