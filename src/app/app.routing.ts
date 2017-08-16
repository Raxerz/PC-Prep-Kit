import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PcpolicyComponent } from './pcpolicy/pcpolicy.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityintroComponent } from './activityintro/activityintro.component';
import { MenuComponent } from './menu/menu.component';
import { IntroductionComponent } from './introduction/introduction.component'
import { HighlightActivityComponent } from './introduction/highlight-activity.component'
import { PicturePuzzleComponent } from './introduction/picture-puzzle.component'
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';
import { Malaria101Component } from './malaria-101/malaria-101.component';
import { AnimatedVideoComponent } from './malaria-101/activity-1/activity-1-1.component';
import { MalariaLifeCycleComponent } from './malaria-101/activity-1/activity-1-2.component';
import { OddOneOutComponent } from './malaria-101/activity-3/activity-3.component';
import { UnlockedStageComponent } from './unlocked-stage/unlocked-stage.component';

export const routes: Routes = [
    {
        path: 'splash',
        component: SplashscreenComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: '',
        component: SplashscreenComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'home',
        component: DashboardComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'forgot',
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'pcpolicy',
        component: PcpolicyComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'intro',
        component: ActivityintroComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'reset/:token',
        component: ResetPasswordComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'menu',
        component: MenuComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'introduction',
        component: IntroductionComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: '',
                redirectTo: 'activity-1',
                pathMatch: 'full'
            },
            {
                path: 'activity-1',
                component: HighlightActivityComponent
            },
            {
                path: 'activity-3',
                component: PicturePuzzleComponent
            }
        ]
    },
    {
        path: 'malaria-101',
        component: Malaria101Component,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: '',
                redirectTo: 'activity-1-1',
                pathMatch: 'full'
            },
            {
                path: 'activity-1-1',
                component: AnimatedVideoComponent
            },
            {
                path: 'activity-1-2',
                component: MalariaLifeCycleComponent
            },
            {
                path: 'activity-3',
                component: OddOneOutComponent
            }
        ]
    },
    {
        path: 'meds-n-labels',
        component: MedsNLabelsComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: 'activity-2',
                component: MemoryGameComponent
            }
        ]
    },
    {
        path: 'unlocked-stage',
        component: UnlockedStageComponent,
        canActivate: [LoggedInGuard]   
    }     
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
