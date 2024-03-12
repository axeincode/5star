import router from '@/router';
import { NetworkData } from '@/net/NetworkData';

router.beforeEach(async (to, from, next) => {
  const token = NetworkData.getInstance().getToken();
  console.log(to);
  if (token) {
    next();
  } else {
    if (to.path == "/") {
      next();
    } else {
      next({ path: '/' });
    }
  }
});
