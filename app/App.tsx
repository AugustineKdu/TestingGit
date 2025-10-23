/**
 * TestingGit 앱
 *
 * Figma 연동 및 앱 개발 테스트 프로젝트
 *
 * Figma 디자인: https://www.figma.com/design/2JyFPKO027kaLpQUEZFIKH/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&m=dev
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </>
  );
};

export default App;
