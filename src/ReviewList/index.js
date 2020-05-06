import React from 'react'
import { Card, Button } from 'semantic-ui-react'

export default function ReviewList(props) {
	
	console.log(props);
	
	const reviews = props.reviews.map(review => {
		
		return(
			<Card key={review.id} color={"red"}>
				<Card.Content textAlign={"center"}>
					<Card.Header>
						{review.title}
					</Card.Header>
					<Card.Meta>
						Author: {review.posted_by.username}
					</Card.Meta>
					<Card.Description>
						{review.review}
					</Card.Description>
					<Card.Description>
						{review.location}
					</Card.Description>
					<Card.Description>
						{review.date_posted}
					</Card.Description>
				</Card.Content>
				<Card.Content textAlign={"center"}>
					<Button
						basic
						color='red'
						onClick={ () => props.deleteReview(review.id)}
					>
						Delete {review.title}
					</Button>
					<Button
						basic
						color='green'
						onClick={ () => props.editReview(review.id)}
					>
						Edit {review.title}
					</Button>
				</Card.Content>
			</Card>
		)
	})

	return (
		<Card.Group centered={true}>
			{reviews}
		</Card.Group>
	)
}






