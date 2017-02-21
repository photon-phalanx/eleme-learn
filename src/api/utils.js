/**
 * Created by Photon_palanx on 2017/2/21.
 */
export function isEmpty(obj) {
  for (var i in obj) {
    return false;
  }
  return true;
}
