import {DataSourceCode} from "../descriptor";
import {ValidatorInstagram} from "./validator.instagram";
import {ValidatorFacebook} from "./validator.facebook";

export * from './validator';
export * from './validator.error';
export * from './validator.instagram';
export * from './validator.facebook';


export default  {
    [DataSourceCode.INSTAGRAM]: ValidatorInstagram,
    [DataSourceCode.FACEBOOK]: ValidatorFacebook,
};
