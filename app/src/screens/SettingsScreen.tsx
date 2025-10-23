/**
 * 설정 화면
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { FIGMA_FILE_URL } from '@env';

interface SettingsItemProps {
  title: string;
  value?: string;
  onPress?: () => void;
  arrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  value,
  onPress,
  arrow = true,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <Text style={styles.settingsItemTitle}>{title}</Text>
    <View style={styles.settingsItemRight}>
      {value && <Text style={styles.settingsItemValue}>{value}</Text>}
      {arrow && <Text style={styles.arrow}>›</Text>}
    </View>
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleFigmaLink = () => {
    const figmaUrl = FIGMA_FILE_URL || 'https://www.figma.com/design/2JyFPKO027kaLpQUEZFIKH/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&m=dev';
    Linking.openURL(figmaUrl).catch(() => {
      Alert.alert('오류', 'Figma 링크를 열 수 없습니다');
    });
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          Alert.alert('완료', '로그아웃되었습니다');
          navigation.navigate('Login' as never);
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '계정 삭제',
      '계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 정말 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => Alert.alert('완료', '계정이 삭제되었습니다'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          <SettingsItem title="개인정보 관리" />
          <SettingsItem title="비밀번호 변경" />
          <SettingsItem title="로그인 기기" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 설정</Text>
          <SettingsItem title="테마" value="다크" />
          <SettingsItem title="언어" value="한국어" />
          <SettingsItem title="알림 설정" />
          <SettingsItem title="데이터 사용" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>지원</Text>
          <SettingsItem title="도움말" />
          <SettingsItem title="문의하기" />
          <SettingsItem title="버그 신고" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정보</Text>
          <SettingsItem title="이용약관" />
          <SettingsItem title="개인정보 처리방침" />
          <SettingsItem title="오픈소스 라이선스" />
          <SettingsItem
            title="Figma 디자인 보기"
            onPress={handleFigmaLink}
          />
          <SettingsItem title="버전" value="1.0.0" arrow={false} />
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.deleteAccountText}>계정 삭제</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  backButton: {
    fontSize: typography.fontSize.md,
    color: lightColors.primary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.textSecondary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: lightColors.card,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  settingsItemTitle: {
    fontSize: typography.fontSize.md,
    color: lightColors.text,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemValue: {
    fontSize: typography.fontSize.md,
    color: lightColors.textSecondary,
    marginRight: spacing.sm,
  },
  arrow: {
    fontSize: 24,
    color: lightColors.textTertiary,
  },
  logoutButton: {
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.border,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.error,
  },
  deleteAccountText: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
