import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { DomSanitizer } from '@angular/platform-browser';


let REGISTRATION_CODE = "836225acf5cf2377436e9d5de5b27f7688e60c9b";
let PUSH_URL = "http://inventiapush.herokuapp.com/api/v1/";


export function pushServiceFactory(http: Http){
  return new PushService(http, REGISTRATION_CODE, PUSH_URL);
};

export interface Notification{
    id: number,
    header?: string,
    text?: string,
    html_text?: string,
    kind?: string,
    image?: string,
    url?:string,
    sending_date: Date,
    reading_date?: Date,
    removing_date?: Date,
    viewing_date?: Date
}

export interface Category{
    id: number,
    name: string
}

export interface CategoryGroup{
    id: number,
    name: string,
    categories: Category[]
}

@Pipe({name: 'categorySelected'})
export class CategorySelectedPipe implements PipeTransform{
    transform(category: Category, userCategories: Category[]):boolean{
        return userCategories.filter(item => item.id == category.id).length > 0;
    }
}

@Pipe({name: 'sanitizeImage'})
export class SanitizeImagePipe implements PipeTransform{
    constructor(private sanitizer: DomSanitizer){}
    transform(imageURL: string){
        return this.sanitizer.bypassSecurityTrustUrl(imageURL);
    }
}

@Injectable()
export class PushService {

    platform: string;
    token: string;
    development: boolean;
    uuid: string;

    notifications: Notification[] = [];
    category_groups: CategoryGroup[] = [];
    user_categories: Category[] = [];
    current_notification: Notification = null;

    constructor(private _http: Http, private regCode, private baseURL) {}

    private getRequestOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }

    get enabled():boolean{
        let val = window.localStorage['NotificationsEnabled'];
        return val ? (val == 'yes') : true;
    }
    set enabled(enable:boolean){
        window.localStorage['NotificationsEnabled'] = enable ? 'yes' : 'no';
        this.register();
    }


    initialized$ : AsyncSubject<boolean> = new AsyncSubject<boolean>();
    init(token, uuid, platform, development):Promise<any> {
        this.token = token;
        this.platform = platform;
        this.development = development;
        this.uuid = uuid;
        return this.register().then(() => {
            this.initialized$.next(true);
            this.initialized$.complete();
        });
    }

    register() {
        let body = {
            device_id: this.uuid,
            registration_code: this.regCode,
            token: this.token,
            development: this.development
        };
        let options = this.getRequestOptions();
        return this._http.post(`${this.baseURL}${this.enabled ? 'register' : 'unregister'}/${this.platform}.json`, body, options)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    getNotificationsCount():Promise<number> {
        let options = this.getRequestOptions();
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', this.token);
        options.search = params;
        return this._http.get(`${this.baseURL}notifications/count.json`, options)
        .toPromise()
        .then(res => res.json() as number)
        .catch(this.handleError);
    }

    getNotifications():Promise<[Notification]> {
        let options = this.getRequestOptions();
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', this.token);
        options.search = params;
        return this._http.get(`${this.baseURL}notifications.json`, options)
        .toPromise()
        .then(res => {
            this.notifications = res.json();
            return  this.notifications;
        })
        .catch(this.handleError);
    }

    openNotification(notification:Notification):Promise<Notification> {
        this.current_notification = notification;
        let options = this.getRequestOptions();
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', this.token);
        options.search = params;
        return this._http.get(`${this.baseURL}notification/resources/${notification.id}.json`, options)
        .toPromise()
        .then(res => {
            Object.assign(notification, res.json());
            return notification;
            //return {...notification, ...res.json()};
        })
        .catch(this.handleError);
    }

    readNotification(notification: Notification): Promise<Notification> {
        let options = this.getRequestOptions();
        return this._http.post(`${this.baseURL}notification/read/${notification.id}.json`, {token: this.token} ,options)
        .toPromise()
        .then(res => {
            Object.assign(notification, res.json());
            return notification;
            //return {...notification, ...res.json()};
        })
        .catch(this.handleError);
    }

    deleteNotification(notification: Notification): Promise<Notification> {
        let options = this.getRequestOptions();
        return this._http.post(`${this.baseURL}notification/delete/${notification.id}.json`, {token: this.token} ,options)
        .toPromise()
        .then(res => {
            Object.assign(notification, res.json());
            this.notifications.splice(this.notifications.indexOf(notification),1);
            return notification;
            //return {...notification, ...res.json()};
        })
        .catch(this.handleError);
    }

    getCategoryGroups(): Promise<CategoryGroup[]>{
        let options = this.getRequestOptions();
        return this._http.get(`${this.baseURL}category_groups/${this.regCode}.json`, options)
        .toPromise()
        .then(res => {
            this.category_groups = res.json();
            return this.category_groups;
        })
        .catch(this.handleError);
    }

    getUserCategories():Promise<Category[]>{
        let options = this.getRequestOptions();
        return this._http.get(`${this.baseURL}registration_categories/${this.regCode}/${encodeURIComponent(this.token)}.json`, options)
        .toPromise()
        .then(res => {
            this.user_categories = res.json();
            return this.user_categories;
        })
        .catch(this.handleError);
    }

    toggleCategory(category: Category) {
        let body = {
            id: category.id,
            registration_code: this.regCode,
            token: this.token,
        };
        let filtered = this.user_categories.filter(item => item.id == category.id);
        let action = 'add';
        if (filtered.length > 0){
            action = 'remove';
            this.user_categories.splice(this.user_categories.indexOf(filtered[0]), 1);
        }else{
            this.user_categories.push(category);
        }
        let options = this.getRequestOptions();
        return this._http.post(`${this.baseURL}registration_categories/${action}.json`, body, options)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }


    private handleError(error) {
        return Promise.reject(error.message || error);
    }
}