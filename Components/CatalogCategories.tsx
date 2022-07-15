import { useState, useEffect, useContext, useMemo } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import ProductItem from "./Product/ProductItem";
import appStyles from "./appStyles";
import Loading from "./Loading";
import InputSearch from "./InputSearch";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CategoriesList } from "./Catalog/CategoriesList";

export const CatalogCategories = (props) => {
	// const basketContext = useContext(BasketContext);
	console.log("CatalogCategories");

	const navigation = useNavigation();
	const route = useRoute();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const [searchRes, setSearchRes] = useState([]);
	const [reset, setReset] = useState(0);

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return true;
	// 	// 	const params = navigation.getState().params;
	// 	// 	const nextParams = nextProps.navigation.getState().params;
	// 	// TODO
	// 	// // console.log("shouldComponentUpdate12 navigation state", nextProps.navigation.state);
	// 	// const reset = nextProps.navigation?.state?.params?.reset || false;
	// 	// if (reset !== reset) {
	// 	// 	this.setState({ reset: reset });
	// 	// 	props.search("");
	// 	// }
	// 	// // return true;
	// 	// // if(reset && props.searchText.length){
	// 	// // }
	// 	// // return true;
	// 	// // console.log(nextProps.screenProps.favorite.length , props.screenProps.favorite.length);
	// 	// // if(nextProps.favorite.length !== props.favorite.length){
	// 	// //     return true
	// 	// // }
	// 	// const isFavorites = navigation.state.params
	// 	// 	? navigation.state.params.isFavorite || false
	// 	// 	: false;
	// 	// if (isFavorites) {
	// 	// 	return true;
	// 	// }
	// 	// // return true;
	// 	// // if (Object.keys(nextProps.screenProps.basket).length !== Object.keys(props.screenProps.basket).length) {
	// 	// // 	return true;
	// 	// // }
	// 	// // console.log(navigation.state);
	// 	// if (nextProps.searchRes.length !== props.searchRes.length) {
	// 	// 	return true;
	// 	// }
	// 	// if (navigation.state.params) {
	// 	// 	if (
	// 	// 		nextProps.navigation.state.params.innerCatId !==
	// 	// 			navigation.state.params.innerCatId ||
	// 	// 		nextProps.navigation.state.params.catId !==
	// 	// 			navigation.state.params.catId
	// 	// 	) {
	// 	// 		return true;
	// 	// 	}
	// 	// } else {
	// 	// 	if (
	// 	// 		nextProps.navigation.state.params &&
	// 	// 		!navigation.state.params
	// 	// 	) {
	// 	// 		return true;
	// 	// 	}
	// 	// 	return isLoading;
	// 	// }
	// 	// return false;
	// }
	useEffect(() => {
		// setTimeout(() => {
		// 	setIsLoading(false);
		// }, 310);
	}, []);
	useEffect(() => {
		// console.log("componentDidUpdate", search);

		if (search) {
			if (route.params?.catId === 0) {
				setSearch("");
			}
		}
	});

	// console.log("navState", navState, catState);
	if (isLoading) {
		return null;
	}
	const catId = route.params ? route.params.catId : false;
	const innerCatId = route.params ? route.params.innerCatId : false;
	// console.log('nav',props.catalog[123]);

	let catalog = {};
	if (catId && props.catalog[catId]) {
		catalog[catId] = props.catalog[catId];
	} else {
		catalog = props.catalog;
	}
	const isFavorites = route.params ? route.params.isFavorite || false : false;
	// console.log('isFavorites' , isFavorites);

	const products = props.products;
	let _data = [];
	let nestedData = {};
	// console.log('products' , products);
	// console.log("catalog", catalog);
	if (!catalog) return null;
	Object.keys(catalog).forEach((key) => {
		let cat = catalog[key];
		let items = [];

		if (cat.cats) {
			Object.keys(cat.cats).forEach((id) => {
				const catNested = cat.cats[id];
				nestedData[id] = {
					title: catNested.name,
					data: [],
				};
			});
		}
		cat.products
			? cat.products.map((pkey) => {
					let item = products[pkey];
					let isIncludet = true;
					let isNested = false;
					// console.log("item", item);

					// is in search
					if (props.searchRes.length > 0) {
						if (!props.searchRes.includes(parseInt(pkey))) {
							isIncludet = false;
						}
					}
					// is in favorites
					if (
						isFavorites &&
						!props.favorite.includes(parseInt(item.id))
					) {
						isIncludet = false;
					}

					// inner category
					if (innerCatId && cat?.cats) {
						// console.log(
						// 	"innerCatId",
						// 	innerCatId,
						// 	cat.cats[innerCatId]
						// );
						if (
							cat?.cats[innerCatId] &&
							cat.cats[innerCatId]?.products &&
							!cat.cats[innerCatId].products.includes(
								parseInt(item.id)
							)
						) {
							isIncludet = false;
						}
					}
					//   remove an item if it is contained in a nested category
					if (cat?.cats) {
						const cats = Object.keys(cat?.cats) || [];
						cats.forEach((id) => {
							cat.cats[id].products.includes(parseInt(item.id))
								? (isNested = true)
								: null;
						});
					}
					//End remove an item if it is contained in a nested category

					//
					const isFavorite = props.favorite.includes(
						parseInt(item.id)
					);
					// console.log('render' , item.id);
					const itemFields = {
						key: item.id,
						id: item.id,
						name: item.name,
						img: item.img,
						imgSmall: item.imgSmall,
						sort: item.sort,
						price: item.price,
						addToFavorite: props.addToFavorite,
						isFavorite: isFavorite,
						searchWords: props.searchText.split(" "),
					};
					if (isIncludet) {
						if (!isNested) {
							items.push(itemFields);
						} else {
							nestedData[item.parentCategoryId]?.data.push(
								itemFields
							);
							// itemsNested.push(itemFields);
						}
					}
			  })
			: [];

		items.sort((a, b) => (a.sort < b.sort ? -1 : 1));
		_data.push({
			sort: cat.id,
			title: cat.name,
			data: items,
		});
	});
	// return null;
	// console.log({ nestedData });
	Object.keys(nestedData).forEach((id) => {
		nestedData[id].data.sort((a, b) => (a.sort < b.sort ? -1 : 1));
		_data.push({
			sort: id,
			title: nestedData[id].title,
			data: nestedData[id].data,
		});
	});
	_data.sort((a, b) => (a.sort < b.sort ? -1 : 1));
	_data = _data.filter((x) => x.data.length > 0);
	// console.log({ _data });

	const renderItem = ({ item }) => {
		// return useMemo(() => {
		return <ProductItem {...item} />;
		// }, []);
	};

	return (
		<SectionList
			// ListHeaderComponent={props.getHeader}
			ListHeaderComponent={
				<>
					<InputSearch
						initialText={props.searchText}
						search={props.search}
					></InputSearch>
					<CategoriesList mode="horizontal" />
				</>
			}
			sections={_data}
			keyExtractor={(item: any, index) => item.id + index}
			stickySectionHeadersEnabled={false}
			renderItem={renderItem}
			renderSectionHeader={({ section: { title } }) => (
				<Text style={[appStyles.sectTitle, { marginLeft: 25 }]}>
					{title}
				</Text>
			)}
		/>
	);
};
export default CatalogCategories;
