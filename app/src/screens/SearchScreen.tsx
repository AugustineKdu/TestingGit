/**
 * 검색 화면
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
  FlatList,
} from 'react-native';
import { lightColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const RECENT_SEARCHES = ['React Native', 'Figma', '디자인 시스템'];
const POPULAR_SEARCHES = ['TypeScript', '앱 개발', 'UI/UX', 'API 연동', '테스트'];

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    // 실제로는 여기서 API 호출
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어 입력"
            placeholderTextColor={lightColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {isSearching ? (
        <ScrollView style={styles.content}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>"{searchQuery}" 검색 결과</Text>
            <Text style={styles.resultsCount}>총 124개</Text>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity style={[styles.tab, styles.tabActive]}>
              <Text style={[styles.tabText, styles.tabTextActive]}>전체</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>게시글</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>사용자</Text>
            </TouchableOpacity>
          </View>

          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.resultCard}>
              <View style={styles.resultThumbnail} />
              <View style={styles.resultContent}>
                <Text style={styles.resultTitle}>
                  {searchQuery} 시작하기
                </Text>
                <Text style={styles.resultDescription}>
                  {searchQuery}를 사용하여 모바일 앱을 개발하는 방법...
                </Text>
                <Text style={styles.resultMeta}>{item}일 전</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>최근 검색</Text>
              <TouchableOpacity>
                <Text style={styles.clearAllText}>전체 삭제</Text>
              </TouchableOpacity>
            </View>

            {RECENT_SEARCHES.map((search) => (
              <TouchableOpacity
                key={search}
                style={styles.searchItem}
                onPress={() => handleSearch(search)}
              >
                <Text style={styles.searchItemText}>{search}</Text>
                <TouchableOpacity>
                  <Text style={styles.removeIcon}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>인기 검색어</Text>

            {POPULAR_SEARCHES.map((search, index) => (
              <TouchableOpacity
                key={search}
                style={styles.popularItem}
                onPress={() => handleSearch(search)}
              >
                <Text style={styles.popularRank}>{index + 1}.</Text>
                <Text style={styles.popularText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  searchHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: lightColors.text,
  },
  clearIcon: {
    fontSize: 20,
    color: lightColors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: lightColors.text,
  },
  clearAllText: {
    fontSize: typography.fontSize.sm,
    color: lightColors.primary,
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  searchItemText: {
    fontSize: typography.fontSize.md,
    color: lightColors.text,
  },
  removeIcon: {
    fontSize: 18,
    color: lightColors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  popularRank: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.primary,
    width: 30,
  },
  popularText: {
    fontSize: typography.fontSize.md,
    color: lightColors.text,
  },
  resultsHeader: {
    padding: spacing.md,
  },
  resultsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  resultsCount: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: lightColors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.md,
    color: lightColors.textSecondary,
  },
  tabTextActive: {
    color: lightColors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
  resultCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.border,
  },
  resultThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: lightColors.surface,
    marginRight: spacing.sm,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: lightColors.text,
    marginBottom: spacing.xs,
  },
  resultDescription: {
    fontSize: typography.fontSize.sm,
    color: lightColors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultMeta: {
    fontSize: typography.fontSize.xs,
    color: lightColors.textTertiary,
  },
});
