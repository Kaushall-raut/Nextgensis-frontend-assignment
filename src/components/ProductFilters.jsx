function ProductFilters({
  category,
  categories,
  sort,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border bg-white px-4 py-3"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category.slug}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-lg border bg-white px-4 py-3"
      >
        <option value="">Sort By</option>

        <option value="price-asc">
          Price: Low → High
        </option>

        <option value="price-desc">
          Price: High → Low
        </option>

        <option value="rating-desc">
          Rating: High → Low
        </option>

        <option value="title-asc">
          Title: A → Z
        </option>

        <option value="title-desc">
          Title: Z → A
        </option>
      </select>
    </div>
  );
}

export default ProductFilters;