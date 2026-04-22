import { Route } from "@angular/router";
import { LoginComponent } from "./shared/components/login/login.component";
import { RegisterComponent } from "./shared/components/register/register.component";
export const authRoutes: Route[] = [
   {
    path: '',
    children: [
        {
            path: '',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        }
   
]
   }
];