const SearchResult = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div>
			{message}
		</div>		
	)
}

export default SearchResult
