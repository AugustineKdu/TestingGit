/**
 * 화면 목록 데모 페이지
 * 모든 화면을 쉽게 탐색할 수 있는 메뉴
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface ScreenItemProps {
  icon: string;
  title: string;
  description: string;
  screen: string;
}

const ScreenItem: React.FC<ScreenItemProps> = ({
  icon,
  title,
  description,
  screen,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.screenCard}
      onPress={() => navigation.navigate(screen as never)}
    >
      <Text style={styles.screenIcon}>{icon}</Text>
      <View style={styles.screenInfo}>
        <Text style={styles.screenTitle}>{title}</Text>
        <Text style={styles.screenDescription}>{description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

export const ScreenListScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📱 화면 목록</Text>
        <Text style={styles.headerSubtitle}>
          모든 화면을 둘러보세요
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인증</Text>
          <ScreenItem
            icon="🚀"
            title="스플래시"
            description="앱 시작 화면"
            screen="Splash"
          />
          <ScreenItem
            icon="🔑"
            title="로그인"
            description="이메일/소셜 로그인"
            screen="Login"
          />
          <ScreenItem
            icon="✍️"
            title="회원가입"
            description="새 계정 만들기"
            screen="Signup"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>메인</Text>
          <ScreenItem
            icon="🏠"
            title="홈"
            description="추천 콘텐츠 피드"
            screen="Home"
          />
          <ScreenItem
            icon="🔍"
            title="검색"
            description="게시글 및 사용자 검색"
            screen="Search"
          />
          <ScreenItem
            icon="🔔"
            title="알림"
            description="활동 알림 센터"
            screen="Notifications"
          />
          <ScreenItem
            icon="👤"
            title="프로필"
            description="내 프로필 및 게시글"
            screen="Profile"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>
          <ScreenItem
            icon="⚙️"
            title="설정"
            description="앱 설정 및 계정 관리"
            screen="Settings"
          />
          <ScreenItem
            icon="✏️"
            title="프로필 편집"
            description="프로필 정보 수정"
            screen="EditProfile"
          />
        </View>

        <View style={styles.figmaSection}>
          <Text style={styles.figmaTitle}>🎨 Figma 디자인</Text>
          <Text style={styles.figmaDescription}>
            이 앱의 화면들은 Figma 디자인과 연동되어 있습니다.
          </Text>
          <Text style={styles.figmaLink}>
            설정 {'>'} Figma 디자인 보기에서 확인하세요
          </Text>
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
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.md,
    color: lightColors.textSecondary,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  screenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: lightColors.card,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  screenIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  screenInfo: {
    flex: 1,
  },
  screenTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  screenDescription: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
  },
  arrow: {
    fontSize: 24,
    color: lightColors.textTertiary,
  },
  figmaSection: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: lightColors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightColors.border,
    marginTop: spacing.xl,
  },
  figmaTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
    marginBottom: spacing.sm,
  },
  figmaDescription: {
    fontSize: typography.fontSize.md,
    color: lightColors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  figmaLink: {
    fontSize: typography.fontSize.sm,
    color: lightColors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});
