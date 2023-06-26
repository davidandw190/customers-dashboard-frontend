import { Component } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "./interface/api-response";
import {Page} from "./interface/page";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./service/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customers-dash-app';
  usersState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }> | undefined

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.usersState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>) => {
        console.log(response);
        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADING'}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
    )
  }
}
