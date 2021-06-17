import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailsComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'rentals/rentACar/:carId', component: RentalAddComponent },
  { path: 'payment/:rental', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
