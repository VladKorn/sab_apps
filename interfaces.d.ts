export interface MakeOrderData{
    userId?: number;
    promo: string;
    comment: string;
    address:string;
	deliveryDate : string;
    products: object;
    date?:string;
}
export interface tsBasketApi{
    action: actionTypes;
    params?: {count?: number , productId?: number ,products?: tsBasket};
    // params?: actionTypesparams;
}
export interface LoginData {
	log: string;
	pas: string;
	save?: boolean;
	name?: string;
	phone?: string;
    // isSignUp?: false;
    mode?: "signIn" | "signUp" | "forgot";
}
export interface tsBasket{
    [id:number]: tsBasketItem
}
export interface tsBasketItem{
        count: number;
        // afasf: string;
}
type actionTypes = "setProduct" | "clear" |'setBasket';

// export interface MakeOrderData