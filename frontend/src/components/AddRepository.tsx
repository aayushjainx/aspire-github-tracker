import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_REPOSITORY } from '../graphql/mutations';
import { GET_TRACKED_REPOSITORIES } from '../graphql/queries';
import './AddRepository.css';

export const AddRepository = () => {
	const [url, setUrl] = useState('');
	const [error, setError] = useState('');

	const [addRepository, { loading }] = useMutation(ADD_REPOSITORY, {
		refetchQueries: [{ query: GET_TRACKED_REPOSITORIES }],
		onCompleted: () => {
			setUrl('');
			setError('');
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!url.trim()) {
			setError('Please enter a repository URL');
			return;
		}

		try {
			await addRepository({ variables: { url: url.trim() } });
		} catch {
			// Error handled by onError
		}
	};

	return (
		<div className='add-repository'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder='https://github.com/owner/repository'
					disabled={loading}
					className='repo-input'
				/>
				<button type='submit' disabled={loading} className='add-button'>
					{loading ? 'Adding...' : 'Add Repository'}
				</button>
			</form>
			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};
