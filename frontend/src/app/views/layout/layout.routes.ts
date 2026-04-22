import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { ArchitectureComponent } from "../../modules/architecture/architecture.component";
import { CreateArchitectureComponent } from "../../modules/architecture/shared/components/create-architecture/create-architecture.component";
import { ArchitectureDetailComponent } from "../../modules/architecture/shared/components/architecture-detail/architecture-detail.component";

export const layoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'architecture',
                loadChildren: () => import('../../modules/architecture/architecture.routes').then(m => m.architectureRoutes)
            },
            {
                path: '',
                redirectTo: 'architecture',
                pathMatch: 'full'
            }
        ]
    }
          
];