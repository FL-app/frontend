import './InputSearch.scss';

interface InputSearchProps {
	handleSearch?: (searchKeyword: string) => void;
}

const InputSearch = (props: InputSearchProps) => {
	const { handleSearch } = props;

	return (
		<input
			placeholder="Поиск друзей"
			onChange={(event) =>
				handleSearch ? handleSearch(event.target.value) : undefined
			}
			className="input-search"
		/>
	);
};

export default InputSearch;
