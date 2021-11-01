import { HomeComponent } from './Home/home-component/home-component.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './login/login.component';
import { ArticleGuard } from './guard/guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [ArticleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
