import React, { useState } from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

const ListComment = ({ singleComment, name, color, removeComment }) => {
	const [value, setValue] = useState(null);

	// INCREASE THE NUMBER OF LIKE WHEN THE BUTTON IS CLIKED
	const increaseLike = () => {
		setValue((prevVal) => {
			return prevVal + 1;
		});
	};
	// DECREASE THE NUMBER OF LIKE WHEN THE BUTTON IS CLIKED
	const decreaseLike = () => {
		setValue((prevVal) => {
			return prevVal - 1;
		});
	};
	return (
		<>
			{singleComment.map((item) => {
				const { id, comment, date } = item;
				return (
					<div className='container' key={id}>
						<article className='item'>
							<div
								className='form-profile'
								style={{
									backgroundColor: `${color}`,
								}}
							>
								{name[0]}
							</div>
							<div>
								<div className='item'>
									<h3>{name}</h3>
									<small>il y a {date} minutes</small>
								</div>

								<p>{comment}</p>
								<div className='btn-container item'>
									<BiLike onClick={increaseLike} /> {value}
									<BiDislike onClick={decreaseLike} />
									<span className='item-response'>Respondre</span>
								</div>
							</div>
							<button
								className='delete-btn'
								onClick={() => removeComment(id)}
							>
								<FaTrash />
							</button>
						</article>
					</div>
				);
			})}
		</>
	);
};

export default ListComment;
