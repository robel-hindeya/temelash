// Public API of the customers module. Other modules may import only from here.
export { CustomersModule } from './customers.module';
export { CustomersRepository } from './infrastructure/customers.repository';
export { ConsentRepository } from './infrastructure/consent.repository';
export { ConsentService } from './application/consent.service';
export { CURRENT_CONSENT_VERSION } from './domain/consent';
export {
  PIN_LOCK_MINUTES,
  PIN_MAX_FAILED_ATTEMPTS,
  isGuessablePin,
  isWellFormedPin,
} from './domain/card-pin';
