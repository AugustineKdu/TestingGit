/**
 * 회원가입 화면
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
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const handleSignup = () => {
    if (!email || !nickname || !password || !confirmPassword) {
      Alert.alert('오류', '모든 필수 항목을 입력해주세요');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다');
      return;
    }

    if (!agreeTerms) {
      Alert.alert('오류', '이용약관에 동의해주세요');
      return;
    }

    Alert.alert('성공', '회원가입이 완료되었습니다', [
      { text: '확인', onPress: () => navigation.navigate('Login' as never) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원가입</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>프로필 설정</Text>

        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.cameraIcon}>📷</Text>
          </View>
          <Text style={styles.profileImageText}>이미지 추가 (선택)</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="이메일 *"
          placeholderTextColor={lightColors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="닉네임 *"
          placeholderTextColor={lightColors.textSecondary}
          value={nickname}
          onChangeText={setNickname}
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호 *"
          placeholderTextColor={lightColors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Text style={styles.helperText}>• 8자 이상</Text>
        <Text style={styles.helperText}>• 영문, 숫자 포함</Text>

        <TextInput
          style={[styles.input, { marginTop: spacing.md }]}
          placeholder="비밀번호 확인 *"
          placeholderTextColor={lightColors.textSecondary}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <Text style={styles.checkboxIcon}>{agreeTerms ? '☑' : '☐'}</Text>
            <Text style={styles.checkboxText}>이용약관 동의 (필수)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeMarketing(!agreeMarketing)}
          >
            <Text style={styles.checkboxIcon}>{agreeMarketing ? '☑' : '☐'}</Text>
            <Text style={styles.checkboxText}>마케팅 수신 동의</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>가입하기</Text>
        </TouchableOpacity>

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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
    marginBottom: spacing.lg,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: lightColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cameraIcon: {
    fontSize: 40,
  },
  profileImageText: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.border,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
    color: lightColors.text,
  },
  helperText: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
    marginLeft: spacing.sm,
    marginBottom: 2,
  },
  checkboxContainer: {
    marginVertical: spacing.lg,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkboxIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  checkboxText: {
    fontSize: typography.fontSize.md,
    color: lightColors.text,
  },
  button: {
    height: 48,
    backgroundColor: lightColors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
