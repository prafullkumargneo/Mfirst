import {NavigationActions, StackActions} from 'react-navigation';

let _navigators = {
  root: undefined,
  login: undefined,
  drawer: undefined,
  loginPhone: undefined,
  app: undefined,
  home: undefined,
};

function setNavigator(navigatorRef, navigatorName) {
  console.log('setNavi', navigatorRef, navigatorName, _navigators);
  if (!_navigators.hasOwnProperty(navigatorName)) {
    console.warn(
      'Could not find navigator: "' +
        navigatorName +
        '". Be sure to define the navigator property in navigationService.js',
    );
    return;
  }
  console.log('✅ setting navigator:', navigatorName);

  _navigators[navigatorName] = navigatorRef;
}

function getNavigator(navigatorName) {
  if (
    !_navigators.hasOwnProperty(navigatorName) ||
    !_navigators[navigatorName]
  ) {
    console.warn(
      'Could not find navigator: "' +
        navigatorName +
        '". Be sure to define the navigator property in navigationService.js',
    );
    return;
  }

  return _navigators[navigatorName]?._navigation;
}

function navigate(navigatorName, routeName, params) {
  if (
    !_navigators.hasOwnProperty(navigatorName) ||
    !_navigators[navigatorName]
  ) {
    console.warn('Could not find navigator:', navigatorName);
    return;
  }

  _navigators[navigatorName].dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateDeep(routes) {
  if (!Array.isArray(routes)) {
    return;
  }

  routes.map(r => {
    if (
      !_navigators.hasOwnProperty(r.navigatorName) ||
      !_navigators[r.navigatorName]
    ) {
      console.warn('Could not find navigator:', r.navigatorName);
      return;
    }

    _navigators[r.navigatorName].dispatch(
      NavigationActions.navigate({
        routeName: r.routeName,
        params: r.params,
      }),
    );
  });
}

function createAction(routeName, params) {
  return NavigationActions.navigate({
    routeName,
    params,
  });
}

function goBack(navigatorName) {
  if (
    !_navigators.hasOwnProperty(navigatorName) ||
    !_navigators[navigatorName]
  ) {
    console.warn('Could not find navigator:', navigatorName);
    return;
  }

  _navigators[navigatorName].dispatch(StackActions.pop());
}

function reset(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    console.warn('Could not find navigator:', navigatorName);
    return;
  }
  //console.log(_navigators[navigatorName]);
  _navigators[navigatorName]?.dispatch(StackActions.popToTop());
}
function log() {
  console.log('log navigators', _navigators);
}

function routesCountOf(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    console.warn('Could not find navigator:', navigatorName);
    return;
  }

  return _navigators[navigatorName]?.state?.nav?.routes?.length || 0;
}

function currentRouteOf(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    console.warn('Could not find navigator:', navigatorName);
    return;
  }

  return _navigators[navigatorName]?.state?.nav?.routes[
    _navigators[navigatorName]?.state?.nav?.index
  ];
}

export default {
  navigate,
  navigateDeep,
  setNavigator,
  getNavigator,
  goBack,
  reset,
  routesCountOf,
  currentRouteOf,
  log,
};
