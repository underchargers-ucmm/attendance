import { useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { AppFilterButton } from "@/components/AppFilterButton";
import { AppFilterSheet } from "@/components/AppFilterSheet";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  NotConfiguredState,
} from "@/components/ScreenState";
import { isSupabaseConfigured } from "@/services/supabase";
import { TaskCard } from "../components/TaskCard";
import { useAllTasks } from "../hooks/useAllTasks";
import {
  TASK_FILTER_OPTIONS,
  matchesAnyTaskFilter,
  sortTasks,
  type TaskFilterValue,
} from "../types";
export function TasksOverviewScreen() {
  const { tasks, loading, error, reload } = useAllTasks();
  const [filters, setFilters] = useState<TaskFilterValue[]>([]);
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);
  const visibleTasks = useMemo(
    () => sortTasks(tasks.filter((t) => matchesAnyTaskFilter(t, filters))),
    [tasks, filters],
  );
  if (!isSupabaseConfigured) return <NotConfiguredState />;
  if (loading) return <LoadingState label="Loading tasks…" />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  return (
    <>
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={reload} />
        }
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.filterRow}>
            <AppFilterButton
              activeCount={filters.length}
              onPress={() => setFilterSheetVisible(true)}
            />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            message={
              tasks.length === 0
                ? "No tasks assigned yet — assign one from an employee’s profile."
                : "No tasks match this filter."
            }
          />
        }
        renderItem={({ item }) => (
          <TaskCard task={item} assigneeName={item.assignee?.name} />
        )}
      />
      <AppFilterSheet
        visible={filterSheetVisible}
        onDismiss={() => setFilterSheetVisible(false)}
        title="Filter tasks"
        options={TASK_FILTER_OPTIONS}
        selected={filters}
        onApply={(next) => setFilters(next as TaskFilterValue[])}
      />
    </>
  );
}
const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
