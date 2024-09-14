const queryBuilder = new QueryBuilder(SomeModel, queryObject);
const results = await queryBuilder
  .filter({ status: "active" })
  .search()
  .sort()
  .pagination()
  .customizeFields()
  .getAll();

const totalPages = await queryBuilder.countAllPages();