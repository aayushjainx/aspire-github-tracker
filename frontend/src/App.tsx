import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './apolloClient';
import { AddRepository } from './components/AddRepository';
import { RepositoryList } from './components/RepositoryList';
import './App.css';

function App() {
	return (
		<ApolloProvider client={apolloClient}>
			<div className='app'>
				<header className='app-header'>
					<h1>📦 GitHub Release Tracker</h1>
					<p className='subtitle'>Track and manage your favorite repositories</p>
				</header>

				<main className='app-main'>
					<AddRepository />
					<RepositoryList />
				</main>
			</div>
		</ApolloProvider>
	);
}

export default App;
