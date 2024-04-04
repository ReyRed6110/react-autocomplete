import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Type to search..."
    />
  );
};

export default Search;
