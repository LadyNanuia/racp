import { v4 as uuid } from "uuid";
import { useEffect, useMemo, useReducer } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupBy, uniq } from "lodash";
import { allResolved } from "./allResolved";
import { useBottleneck } from "./useBottleneck";
import { useLatest } from "./useLatest";
import { useIsMounted } from "./useIsMounted";

export type TaskRejectionReason = unknown;

export type TaskId = string;

export type TaskState = "pending" | "resolved" | "rejected";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Task<T = any> {
  id: TaskId;
  fn: TaskFn<T>;
  group: string;
  state: "pending" | "resolved" | "rejected";
  rejectionReason?: TaskRejectionReason;
}

export interface TaskGroup extends Record<TaskState, Task[]> {
  name: string;
  all: Task[];
  settled: Task[];
  progress: number;
}

export type InputTask<T> = Pick<Task<T>, "fn" | "group"> &
  Partial<Pick<Task<T>, "id">>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TaskFn<T = any> = () => Promise<T>;

const slice = createSlice({
  name: "promiseTracker",
  initialState: [] as Task[],
  reducers: {
    add(tasks, { payload: newTasks }: PayloadAction<Task[]>) {
      const newIds = newTasks.map((t) => t.id);
      const existing = tasks.find((task) => newIds.includes(task.id));
      if (existing) {
        throw new Error(`A task by id "${existing.id}" already exists`);
      }
      const uniqueNewIds = uniq(newIds);
      if (uniqueNewIds.length !== newIds.length) {
        throw new Error("Multiple tasks with the same id were provided");
      }
      tasks.push(...newTasks);
    },
    resolve(tasks, { payload: resolveId }: PayloadAction<TaskId>) {
      const task = tasks.find(({ id }) => id === resolveId);
      if (task) {
        task.state = "resolved";
        task.rejectionReason = undefined;
      }
    },
    reject(
      tasks,
      {
        payload: rejection,
      }: PayloadAction<{ id: TaskId; reason: TaskRejectionReason }>
    ) {
      const task = tasks.find(({ id }) => id === rejection.id);
      if (task) {
        task.state = "rejected";
        task.rejectionReason = rejection.reason;
      }
    },
    clear(tasks) {
      tasks.splice(0, tasks.length);
    },
  },
});

export function useTaskScheduler() {
  const isSchedulerAlive = useIsMounted();
  const [tasks, dispatch] = useReducer(slice.reducer, slice.getInitialState());
  const schedule = useBottleneck();
  const groups = useMemo(() => groupTasks(tasks), [tasks]);
  const progress = useMemo(() => schedulerProgress(groups), [groups]);
  const isPending = progress < 1;
  const isSettled = !isPending;

  const latest = useLatest({ reset });
  useEffect(() => latest.current.reset, [latest]);
  useEffect(() => {});

  function reset() {
    dispatch(slice.actions.clear());
  }

  function track<T>(inputTasks: InputTask<T>[]): Promise<T[]> {
    const tasks = inputTasks.map(normalizeInputTask);

    dispatch(slice.actions.add(tasks));

    const promises = tasks.map((task) =>
      schedule(async () => {
        try {
          if (!isSchedulerAlive()) {
            throw new Error("Scheduler was killed");
          }
          const res = await task.fn();
          dispatch(slice.actions.resolve(task.id));
          return res;
        } catch (reason) {
          dispatch(slice.actions.reject({ id: task.id, reason }));
          throw reason;
        }
      })
    );

    return allResolved(promises);
  }

  return {
    groups,
    tasks,
    progress,
    isPending,
    isSettled,
    track,
    reset,
  };
}

export function describeTaskGroup(group: TaskGroup) {
  return `${group.name} (${group.settled.length}/${group.all.length})`;
}

export function describeTask(task: Task) {
  return `${task.group}${task.id !== undefined ? ` (${task.id})` : ""}`;
}

function groupTasks(tasks: Task[]): TaskGroup[] {
  return Object.entries(groupBy(tasks, "group")).map(([name, all]) => {
    const pending: Task[] = [];
    const resolved: Task[] = [];
    const rejected: Task[] = [];
    const settled: Task[] = [];
    for (const task of all) {
      switch (task.state) {
        case "pending":
          pending.push(task);
          break;
        case "resolved":
          settled.push(task);
          resolved.push(task);
          break;
        case "rejected":
          settled.push(task);
          rejected.push(task);
          break;
      }
    }
    return {
      name,
      all,
      pending,
      resolved,
      rejected,
      settled,
      progress: all.length > 0 ? settled.length / all.length : 1,
    };
  });
}

function normalizeInputTask<T>({ id, ...props }: InputTask<T>): Task<T> {
  return {
    state: "pending" as const,
    id: id ?? uuid(),
    ...props,
  };
}

function schedulerProgress(groups: TaskGroup[]) {
  const pendingGroups = groups.filter((group) => group.progress < 1);
  if (pendingGroups.length === 0) {
    return 1;
  }
  return (
    pendingGroups.reduce((sum, g) => sum + g.progress, 0) / pendingGroups.length
  );
}
