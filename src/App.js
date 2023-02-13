import React, { useEffect, useState } from 'react';
import ListComment from './component/ListComment';
import { data } from './data';

import { BiSend } from 'react-icons/bi';

const itemFromLocalStorage = () => {
	let comment = localStorage.getItem('comment');
	if (comment) {
		return JSON.parse(localStorage.getItem('comment'));
	} else {
		return [];
	}
};
const App = () => {
	const [name, setName] = useState('');
	const [listComments, setComments] = useState(itemFromLocalStorage());
	const [color, setColor] = useState('');

	const [comment, setComment] = useState('');
	// GET A RANDOM PERSON FROM MY DATA ARRAY
	const getRandomPerson = () => {
		let randomNumber = Math.floor(Math.random() * data.length);
		const randomName = data[randomNumber].name;
		setName(randomName);
	};
	// GET A RANDOM COLOR
	function getRandomHexColor() {
		const randomColor =
			'#' + Math.floor(Math.random() * 16777215).toString(16);
		setColor(randomColor);
	}

	/* ANY TIME THAT THE APP RENDER WE NEED TO GET A RANDOM PERSON AND A RANDOM COLOR AND DISPLAY THE USER'S 
	INTTIALE AS PROFILE IMAGE.*/

	useEffect(() => {
		getRandomPerson();
		getRandomHexColor();
		// ADD AN ITEM TO THE LOCALSTORAGE SO THAT DATA WE DON'T LOSE THE DATA
		localStorage.setItem('comment', JSON.stringify(listComments));
	}, [listComments]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('hello world');
		if (comment) {
			// CREATE A NEW COMMENT
			const newComment = {
				comment,
				id: new Date().getTime().toString(),
				date: new Date().getMinutes(),
			};
			// ADD A NEW COMMENT TO MY LIST OF COMMENTS
			setComments([...listComments, newComment]);
			setComment('');
		} else {
			getRandomPerson();
		}
	};
	// FUNCTION RESPONSIBLE FOR DELETING THE A SINGLE COMMENT
	const removeComment = (id) => {
		setComments((prevComment) => {
			return prevComment.filter((person) => person.id !== id);
		});
	};
	return (
		<section>
			<div className='title'>
				<h1>
					YouCom<span>ment</span>
				</h1>
			</div>
			<form action='' className='form'>
				<div className='container'>
					<h4 className='form-title'>
						commentaires {listComments.length}
					</h4>
					<div className='row'>
						<div
							className='form-profile'
							style={{
								backgroundColor: `${color}`,
							}}
						>
							{name[0]}
						</div>
						{/* CONNECTE THE INPUT TO THE STATE VARIABLE */}
						<textarea
							name='name'
							className='form-input'
							placeholder='Ajouter un commentaire...'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></textarea>
						<button className='form-button' onClick={handleSubmit}>
							{comment && <BiSend />}
						</button>
					</div>
				</div>
			</form>
			{/* DISPLAY A SINGLE ITEM WHEN THE USER TYPE SOMETHING ON THE INPUT OR SUBMIT THE BUUTON */}
			{listComments.length > 0 && (
				<div className='container' key={comment.id}>
					{/* display the list component and some props to it */}
					<ListComment
						singleComment={listComments}
						name={name}
						color={color}
						removeComment={removeComment}
					/>
				</div>
			)}
		</section>
	);
};

export default App;
