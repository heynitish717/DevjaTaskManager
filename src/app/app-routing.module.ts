import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuicklinkStrategy, QuicklinkModule } from "ngx-quicklink";
import { LoginComponent } from "./Components/Common/login/login.component";
import { AccessDeniedComponent } from "./Components/Common/access-denied/access-denied.component";
import { PageNotFoundComponent } from "./Components/Common/page-not-found/page-not-found.component";
import { NetworkErrorComponent } from "./Components/Common/network-error/network-error.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "network_error", component: NetworkErrorComponent },
  {
    path: "",
    children: [

      //MtmDisplay Modules
      {
        path: "home",
        loadChildren: () =>
          import("./Components/MtmDisplay/Home/home.module").then(
            (m) => m.HomeModule
          )
      },

      {
        path: "create",
        loadChildren: () =>
          import("./Components/MtmDisplay/CreateTask/create-task.module").then(
            (m) => m.CreateTaskModule
          )
      },

      {
        path: "modify",
        loadChildren: () =>
          import("./Components/MtmDisplay/AssignTask/assign-task.module").then(
            (m) => m.AssignTaskModule
          )
      },

      {
        path: "report",
        loadChildren: () =>
          import("./Components/MtmDisplay/TaskReport/task-report.module").then(
            (m) => m.TaskReportModule
          )
      },

      {
        path: "status",
        loadChildren: () =>
          import("./Components/MtmDisplay/TeamStatus/team-status.module").then(
            (m) => m.TeamStatusModule
          )
      },

      //Add your module here
    ],
  },

  { path: "noInternet", component: AccessDeniedComponent },
  { path: "pagenotfound", component: PageNotFoundComponent },
  { path: "**", component: PageNotFoundComponent },
];

export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes);