export const getOrders = async (filter: { userId?: number; id?: number }) => {
	const idsFilter = filter.id ? `&id=${filter.id}` : "";
	const userFilter = filter.userId ? `&user=${filter.userId}` : "";
	const url = `https://subexpress.ru/apps_api/?get=orders${userFilter}${idsFilter}`;
	const res = await fetch(url).then((res) => res.json());
	console.log("getOrders", url, res);
	return res;
};
