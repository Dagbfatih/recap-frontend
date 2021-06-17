import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  amount: number;
  rental: Rental;
  car: Car;
  cardIsSave: boolean;

  cardNumber: string;
  cardName: string;
  expirationDate: Date;
  cvv: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.rental = JSON.parse(params['rental']);
      this.getCar(this.rental.carId);
    });
  }

  pay() {
    let payment: Payment = {
      amount: this.amount,
      customerId: this.rental.customerId,
    };

    this.paymentService.pay(payment);
    this.saveCard();
    this.toastrService.success('Ödeme Başarılı');
  }
  saveCard() {
    if (!this.cardIsSave) {
      return;
    }

    let creditCard: CreditCard = {
      customerId: this.rental.customerId,
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expirationDate: new Date('01/' + this.expirationDate.toString()),
    };

    this.creditCardService.add(creditCard).subscribe((response) => {});
  }

  getCar(carId: number) {
    this.carService.getCar(carId).subscribe((response) => {
      this.car = response.data;
      this.calculateAmount();
    });
  }

  calculateAmount() {
    if (this.rental.returnDate != null) {
      let difference =
        this.rental.returnDate.getTime() - this.rental.rentDate.getTime();
      let differenceOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (differenceOfDays == 0) {
        differenceOfDays = 1;
      }
      this.amount =
        differenceOfDays *
        (this.car.dailyPrice + (this.car.dailyPrice * 8) / 100); //calculate with VAT
    }
  }
}
