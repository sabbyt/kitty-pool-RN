//@flow
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

export function goToPage(routeName: string, params:Object) {
  return NavigationActions.navigate({
    routeName,
    params,
  });
}

export function goToHome() {
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  });
}

export function goBack() {
  return NavigationActions.back();
}
