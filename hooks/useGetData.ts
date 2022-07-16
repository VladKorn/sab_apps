import { GetDataActions, LoginData } from "./../interfaces";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../components/Login/Login";

export const useGetData = (actions: GetDataActions) => {
	const authContext = useContext(AuthContext);
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		console.log("useGetData useGetData", authContext.loginData, actions);
		if (authContext.loginData && actions) {
			fetch("https://subexpress.ru/apps_api/", {
				method: "post",
				body: JSON.stringify({
					loginData: authContext.loginData,
					actions: actions,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					setData(res);
					setIsDataLoading(false);
					setError(null);
				})
				.catch((error) => {
					console.error(error);
					setError(error);
					setIsDataLoading(false);
				});
		}
	}, [authContext.loginData]);
	return { isDataLoading, data, error };
};
