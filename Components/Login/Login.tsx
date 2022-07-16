import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import CryptoJS from "crypto-js";
import { LoginData } from "../../interfaces";
export interface IAuthContext {
	logout: () => void;
	login: (x: LoginData) => any;
	saveLoginData: (z: string, x: string) => void;
	user: User;
	loginData: LoginData;
	autoLogin: any;
	setUser: any;
}
interface User {
	id: number;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContainer = ({ children }) => {
	const [user, setUser] = useState<User>({ id: null });
	const [loginData, setLoginData] = useState<LoginData | null>(null);
	useEffect(() => {
		autoLogin();
	}, []);
	const autoLogin = async () => {
		let loginData: LoginData = { log: "", pas: "" };
		const getLoginData = async (loginData) => {
			try {
				const cryptedLog = await AsyncStorage.getItem("@log");
				const cryptedPas = await AsyncStorage.getItem("@pas");
				const decryptedLog = CryptoJS.AES.decrypt(
					cryptedLog,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				const decryptedPas = CryptoJS.AES.decrypt(
					cryptedPas,
					"F24czi3II092Xnrhc"
				).toString(CryptoJS.enc.Utf8);
				// console.log('decryptedLog' , decryptedLog);
				// console.log("autoLogin @pas", decryptedPas);
				// console.log("autoLogin @log", decryptedLog);
				if (
					cryptedLog !== null &&
					cryptedLog !== "" &&
					cryptedPas !== null
				) {
					if (!loginData.isSignUp) {
						loginData["log"] = decryptedLog;
						loginData["pas"] = decryptedPas;
					}
				}
			} catch (e) {
				// alert("getLoginData" + e);
			}
			return loginData;
		};
		const _loginData = await getLoginData(loginData);
		// console.log("autoLogin  _loginData", _loginData);

		login(_loginData);
	};

	const logout = () => {
		AsyncStorage.setItem("@log", "");
		AsyncStorage.setItem("@pas", "");
		// login({pas: '' , log: ''});
		setUser({ id: null });
	};
	const login = async (loginData: LoginData) => {
		console.log("login loginData", loginData);

		if (loginData.save && loginData.mode !== "signUp") {
			saveLoginData(loginData.log, loginData.pas);
			// console.log("login loginData", loginData);
		}
		setLoginData(loginData);
		const res = await fetch(
			"https://subexpress.ru/apps_api/login.php?action=login",
			{
				method: "post",
				body: JSON.stringify({ loginData: loginData }),
			}
		).then((res) => res.json());

		// console.log("login res", res);

		if (res.user) {
			setUser(res.user);
		}

		return res.user;
	};
	const saveLoginData = (log, pas) => {
		// console.log("saveLoginData", log, pas);
		const storeData = async (log, pas) => {
			try {
				if (log) {
					const encryptedLog = CryptoJS.AES.encrypt(
						log,
						"F24czi3II092Xnrhc"
					).toString();
					await AsyncStorage.setItem("@log", encryptedLog);
				}
				if (pas) {
					const encryptedPas = CryptoJS.AES.encrypt(
						pas,
						"F24czi3II092Xnrhc"
					).toString();
					// console.log('encryptedLog' , encryptedLog)
					await AsyncStorage.setItem("@pas", encryptedPas);
				}
			} catch (e) {
				alert("saveLoginData error " + e);
				// saving error
			}
		};
		storeData(log, pas);
	};

	return (
		<AuthContext.Provider
			value={{
				logout: logout,
				login: login,
				saveLoginData: saveLoginData,
				autoLogin: autoLogin,
				setUser: setUser,
				user: user,
				loginData: loginData,
			}}
			// value={null}
		>
			{children}
		</AuthContext.Provider>
	);
};
