import {Routes} from "@angular/router";
import { ArchitectureDetailComponent } from "./shared/components/architecture-detail/architecture-detail.component";
import { ArchitectureListComponent } from "./shared/components/architecture-list/architecture-list.component";
import { CreateArchitectureComponent } from "./shared/components/create-architecture/create-architecture.component";
import { ArchitectureComponent } from "./architecture.component";
import path from "path";
import { ArchitectureFormComponent } from "./shared/components/architecture-form/architecture-form.component";

export const architectureRoutes: Routes = [
    {
    path: '',
    component: ArchitectureComponent,
    children: [
        {
            path: 'detail/:id',
            component: ArchitectureDetailComponent
        },
        {   
            path: 'list',
            component: ArchitectureListComponent
        },
        {
            path: 'create',
            component: CreateArchitectureComponent
        },
        {
            path: 'edit/:id',
            component: ArchitectureFormComponent
        },
        {
            path: '',
            redirectTo: 'create',
            pathMatch: 'full'
        }
    ]
}
];