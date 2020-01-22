import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { not } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private notifier: NotifierService
    ) { }

    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }
}
