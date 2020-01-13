import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreadcrumbInterface } from './breadcrumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  public breadcrumbs: BreadcrumbInterface[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
          this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbInterface[] = []): BreadcrumbInterface[] {
    const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.label : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      // label = route.snapshot.params[paramName]; APARECER ID OU INVÉS DE 'EDITAR'
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadcrumbInterface = {
      label,
      url: nextUrl
    };

    if (breadcrumb.url === '') {
      breadcrumb.url = '/';
    }
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

}
