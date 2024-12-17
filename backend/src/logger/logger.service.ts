import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  error(message: string, trace: string, context?: string) {
    // Add timestamp and format for better logging
    const timestamp = new Date().toISOString();
    super.error(`[${timestamp}] ${message}`, trace, context || 'Application');
  }

  log(message: string, context?: string) {
    const timestamp = new Date().toISOString();
    super.log(`[${timestamp}] ${message}`, context || 'Application');
  }

  warn(message: string, context?: string) {
    const timestamp = new Date().toISOString();
    super.warn(`[${timestamp}] ${message}`, context || 'Application');
  }
}
