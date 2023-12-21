import { LatLngExpression } from 'leaflet';
import avatar1 from '../../images/icon_profile_man.png';
import avatar2 from '../../images/icon_profile_woman.png';

const friendsLocation: {
  id: number;
  avatar: string;
  position: LatLngExpression;
}[] = [
  {
    id: 1,
    avatar: avatar1,
    position: [55.729094, 37.558545],
  },
  {
    id: 2,
    avatar: avatar2,
    position: [55.729753, 37.561687],
  },
  {
    id: 3,
    avatar: avatar2,
    position: [55.730227, 37.562526],
  },
];

export default friendsLocation;
