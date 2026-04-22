import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArchitectureStateService {
    private refreshSource = new Subject<void>();
    architectureUpdated$ = this.refreshSource.asObservable();
    triggerRefresh() {
        this.refreshSource.next();
    }
}