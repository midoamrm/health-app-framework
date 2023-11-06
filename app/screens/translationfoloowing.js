import React from 'react';
import { useTranslation } from 'react-i18next';
import Followingcomp from '../components/Translationfollowingcomp';
const Following = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      {i18n.language === 'ar' && (
        <Followingcomp
          p1={' تتبع طلبك'}
          p2={'الطلب تحت التقديم'}
          p3={'الطلب تحت المراجعه'}
          p4={'الطلب تحت التنفيذ'}
          p5={'الطلب تحت التسليم'}
          state1={'ok'}
          state2={'ok'}
          state3={'ok'}
          state4={'ok'}
        />
      )}
      {i18n.language === 'en' && (
        <Followingcomp
          p1={'Track an order'}
          p2={'The request is under progress'}
          p3={' the request under references'}
          p4={'Request in progress'}
          p5={'Order is under delivery'}
          state1={'ok'}
          state2={'ok'}
          state3={'not'}
          state4={'not'}
        />
      )}
    </>
  );
};
export default Following;
