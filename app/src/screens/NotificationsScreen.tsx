/**
 * 알림 화면
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
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'follow',
    icon: '🔵',
    title: '새 팔로워',
    message: '홍길동님이 회원님을 팔로우했습니다',
    time: '10분 전',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    icon: '❤️',
    title: '좋아요',
    message: '회원님의 게시글을 좋아합니다',
    time: '1시간 전',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    icon: '💬',
    title: '새 댓글',
    message: '김철수님이 댓글을 남겼습니다: "좋은 정보 감사해요!"',
    time: '어제 오후 3:24',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    icon: '📢',
    title: '새로운 기능 업데이트',
    message: '다크 모드가 추가되었어요!',
    time: '3일 전',
    read: true,
  },
];

export const NotificationsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>알림</Text>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘</Text>

          {NOTIFICATIONS.slice(0, 2).map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationUnread,
              ]}
            >
              <Text style={styles.notificationIcon}>{notification.icon}</Text>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              {!notification.read && <View style={styles.unreadBadge} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>어제</Text>

          <TouchableOpacity
            style={[
              styles.notificationCard,
              NOTIFICATIONS[2].read && styles.notificationRead,
            ]}
          >
            <Text style={styles.notificationIcon}>{NOTIFICATIONS[2].icon}</Text>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>
                {NOTIFICATIONS[2].title}
              </Text>
              <Text style={styles.notificationMessage}>
                {NOTIFICATIONS[2].message}
              </Text>
              <Text style={styles.notificationTime}>
                {NOTIFICATIONS[2].time}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 주</Text>

          <TouchableOpacity
            style={[
              styles.notificationCard,
              NOTIFICATIONS[3].read && styles.notificationRead,
            ]}
          >
            <Text style={styles.notificationIcon}>{NOTIFICATIONS[3].icon}</Text>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>
                {NOTIFICATIONS[3].title}
              </Text>
              <Text style={styles.notificationMessage}>
                {NOTIFICATIONS[3].message}
              </Text>
              <Text style={styles.notificationTime}>
                {NOTIFICATIONS[3].time}
              </Text>
            </View>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.textSecondary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
    backgroundColor: lightColors.background,
  },
  notificationUnread: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  notificationRead: {
    opacity: 0.6,
  },
  notificationIcon: {
    fontSize: 32,
    marginRight: spacing.sm,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  notificationMessage: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
    marginBottom: spacing.xs,
  },
  notificationTime: {
    fontSize: typography.fontSize.xs,
    color: lightColors.textTertiary,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: lightColors.primary,
    marginTop: 8,
  },
});
