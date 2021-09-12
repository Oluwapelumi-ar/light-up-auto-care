import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  toast: any;

  private storageKey = 'User';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private route: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.userDetails);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Observable<any> {
    return this.currentUserSubject.value;
  }

  /**
   * geting user details in the local storage
   */
  get userDetails(): Observable<any> {
    const log: any = localStorage.getItem(this.storageKey);
    return JSON.parse(log);
  }

  /**
   * this is used to store data
   * into local storage
   * @param data
   * @returns
   */
  storeUser(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    return this.currentUserSubject.next(data);
  }

  removeUser() {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  /**
   * this is use for clearing the data
   * stored in the loacl storage
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
    this.route.navigate(['/account']);
  }

  async presentToast(message: any, duration: any, color: any) {
    const toast = await this.toast.create({
      message: `${message}`,
      duration: duration,
      color: `${color}`,
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toast.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
