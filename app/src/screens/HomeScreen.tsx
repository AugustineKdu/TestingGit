/**
 * 홈 화면
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>TestingGit</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>안녕하세요, 홍길동님!</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>✏️</Text>
            <Text style={styles.actionText}>새 작성</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionEmoji}>📊</Text>
            <Text style={styles.actionText}>통계 보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>추천 콘텐츠</Text>

          <View style={styles.postCard}>
            <View style={styles.postThumbnail} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>React Native 시작하기</Text>
              <Text style={styles.postMeta}>@developer · 2시간 전</Text>
              <View style={styles.postStats}>
                <Text style={styles.postStat}>❤️ 24</Text>
                <Text style={styles.postStat}>💬 8</Text>
              </View>
            </View>
          </View>

          <View style={styles.postCard}>
            <View style={styles.postThumbnail} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>Figma 디자인 시스템 구축</Text>
              <Text style={styles.postMeta}>@designer · 5시간 전</Text>
              <View style={styles.postStats}>
                <Text style={styles.postStat}>❤️ 52</Text>
                <Text style={styles.postStat}>💬 15</Text>
              </View>
            </View>
          </View>

          <View style={styles.postCard}>
            <View style={styles.postThumbnail} />
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>TypeScript 활용 팁</Text>
              <Text style={styles.postMeta}>@coder · 1일 전</Text>
              <View style={styles.postStats}>
                <Text style={styles.postStat}>❤️ 38</Text>
                <Text style={styles.postStat}>💬 12</Text>
              </View>
            </View>
          </View>
        </View>
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
  logo: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.primary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  greeting: {
    padding: spacing.md,
  },
  greetingText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: lightColors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: lightColors.text,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
    marginBottom: spacing.md,
  },
  postCard: {
    backgroundColor: lightColors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postThumbnail: {
    width: '100%',
    height: 150,
    backgroundColor: lightColors.surface,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  postContent: {
    gap: spacing.xs,
  },
  postTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
  },
  postMeta: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
  },
  postStats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  postStat: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
  },
});
