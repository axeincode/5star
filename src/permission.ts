import router from '@/router';
import { NetworkData } from '@/net/NetworkData';
import authRouteList from './utils/authRoute';

router.beforeEach(async (to, from, next) => {
  const token = NetworkData.getInstance().getToken();
  if (token) {
    next();
  } else {
    if (to.name != undefined && authRouteList.includes(to.name.toString())) {
      next({ path: '/' });
    } else {
      next();
    }
  }
});
