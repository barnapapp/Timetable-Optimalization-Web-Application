import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private readonly subject = new Subject<any>();

    public sendId(): void {
        this.subject.next();
    }

    public getId(): Observable<any> {
        return this.subject.asObservable();
    }
}
