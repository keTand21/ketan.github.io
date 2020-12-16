import { BehaviorSubject } from 'rxjs';
// Why not use MatTableDataSource?
/*  In this example, we will not be using the built-in MatTableDataSource because its designed for filtering,
    sorting and pagination of a client - side data array.
    Read the article: 'https://blog.angular-university.io/angular-material-data-table/'
**/
export class BaseDataSource {
    constructor() {
        this.entitySubject = new BehaviorSubject([]);
        this.hasItems = false; // Need to show message: 'No records found
        // Loading | Progress bar
        this.loadingSubject = new BehaviorSubject(false);
        // Paginator | Paginators count
        this.paginatorTotalSubject = new BehaviorSubject(0);
        this.loading$ = this.loadingSubject.asObservable();
        this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
        this.paginatorTotal$.subscribe((count) => this.hasItems = count);
    }
    connect(collectionViewer) {
        // Connecting data source
        return this.entitySubject.asObservable();
    }
    disconnect(collectionViewer) {
        // Disonnecting data source
        this.entitySubject.complete();
        this.loadingSubject.complete();
        this.paginatorTotalSubject.complete();
    }
}
//# sourceMappingURL=_base-datasource.js.map