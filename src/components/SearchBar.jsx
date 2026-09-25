function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border px-4 py-3 md:max-w-md"
      />
    </div>
  );
}

export default SearchBar;