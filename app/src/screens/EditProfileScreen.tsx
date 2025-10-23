/**
 * 프로필 편집 화면
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('홍길동');
  const [bio, setBio] = useState('안녕하세요!\n개발자입니다.');
  const [website, setWebsite] = useState('https://example.com');

  const handleSave = () => {
    Alert.alert('성공', '프로필이 수정되었습니다', [
      { text: '확인', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필 편집</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>완료</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImage}>
            <Text style={styles.profileEmoji}>👤</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changePhotoText}>사진 변경</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={setNickname}
              placeholder="닉네임"
              placeholderTextColor={lightColors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>자기소개</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="자기소개"
              placeholderTextColor={lightColors.textSecondary}
              multiline
              numberOfLines={4}
              maxLength={150}
            />
            <Text style={styles.counter}>{bio.length}/150</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>웹사이트</Text>
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              placeholder="https://..."
              placeholderTextColor={lightColors.textSecondary}
              keyboardType="url"
              autoCapitalize="none"
            />
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
  cancelButton: {
    fontSize: typography.fontSize.md,
    color: lightColors.textSecondary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
  },
  saveButton: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.primary,
  },
  content: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: lightColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  profileEmoji: {
    fontSize: 50,
  },
  changePhotoText: {
    fontSize: typography.fontSize.md,
    color: lightColors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
  form: {
    paddingHorizontal: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: lightColors.text,
    backgroundColor: lightColors.surface,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  counter: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
});
