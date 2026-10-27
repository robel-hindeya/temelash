// The api object every screen uses: api.auth, api.merchant, api.scanner, api.public, api.platform.
import { auth } from './endpoints/auth';
import { merchant } from './endpoints/merchant';
import { platform } from './endpoints/platform';
import { publicApi } from './endpoints/public';
import { scanner } from './endpoints/scanner';

export const api = { auth, merchant, scanner, public: publicApi, platform };
export default api;
