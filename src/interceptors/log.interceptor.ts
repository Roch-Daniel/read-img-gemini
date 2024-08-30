import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Colors } from 'colors_terminal';
import { Logger } from '@nestjs/common';

export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const dt = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        this.logger.log(
          Colors.blue(
            `[URL: ${request.url} - METHOD: ${request.method}]: ` +
              Colors.green('Time execute: ') +
              Colors.yellow(Date.now() - dt) +
              Colors.green(' /ms'),
          ),
        );
      }),
    );
  }
}
