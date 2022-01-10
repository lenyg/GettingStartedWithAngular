import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { IProduct } from "./products";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products/products.json'
    constructor(private http: HttpClient) {}
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse) {
        //This is where we would send remote logging infrastructure
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            //client side or network error
            errorMessage = `An Error has Occurred: ${err.error.message}`;
        } else {
            //The backend returns error code and message that may be useful
            errorMessage = `The Server has returned: ${err.status}, the error message is ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }


}