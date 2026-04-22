import { HttpInterceptorFn } from "@angular/common/http";
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    const modifiedReq = req.clone({
      setHeaders: {
        userId: userId
      }
    });
    return next(modifiedReq);
  }
  return next(req);
};