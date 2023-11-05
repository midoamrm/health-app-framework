import React from 'react';
import Followingcomp from '../components/Translationfollowingcomp';
const Following = ({ navigation, route }) => {
  return (
    <Followingcomp
      p1={' تتبع طلبك'}
      p2={'الطلب تحت التقديم'}
      p3={'الطلب تحت المراجعه'}
      p4={'الطلب تحت التنفيذ'}
      p5={'الطلب تحت التسليم'}
    />
  );
};
export default Following;
