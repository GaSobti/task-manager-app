import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  deleteTask,
  fetchTasks,
  resetDraft,
  saveTask,
  setDraft,
  setSelectedTask,
  setViewMode,
  startEditTask
} from "./features/taskActions";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import TaskDetails from "./components/TaskDetails";
import TaskTable from "./components/TaskTable";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};

const formatDateForInput = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const getDisplayDate = (value) => {
  if (!value) return "";
  return formatDate(value);
};

function App() {
  const dispatch = useDispatch();
  const { tasks, draft, selectedTaskId, viewMode, loading, error } = useSelector(
    (state) => state.task
  );

  const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;

  const visibleTasks = useMemo(() => {
    const sorted = [...tasks];
    sorted.sort((a, b) => {
      const left = a[sortConfig.key]?.toString().toLowerCase() || "";
      const right = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (left === right) return 0;
      return sortConfig.direction === "asc"
        ? left > right ? 1 : -1
        : left < right ? 1 : -1;
    });
    return sorted;
  }, [tasks, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleRowClick = (task) => {
    dispatch(setSelectedTask(task.id));
    dispatch(setViewMode("detail"));
  };

  const handleEditClick = (event, task) => {
    event.stopPropagation();

    const sourceTask =
      tasks.find((item) => item.id === task.id) ||
      { ...task, startDate: task.startDate || "", endDate: task.endDate || "" };

    dispatch(
      startEditTask({
        ...sourceTask,
        startDate: formatDateForInput(sourceTask.startDate),
        endDate: sourceTask.endDate ? formatDateForInput(sourceTask.endDate) : ""
      })
    );
    dispatch(setViewMode("edit"));
  };

  const handleDeleteClick = (event, taskId) => {
    event.stopPropagation();
    const ok = window.confirm("Do you want to delete this task?");
    if (ok) dispatch(deleteTask(taskId));
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    dispatch(setDraft(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      ...draft,
      title: draft.title.trim(),
      assignedTo: draft.assignedTo.trim(),
      status: draft.status || "Open",
      priority: draft.priority || "High",
      startDate: draft.startDate || formatDateForInput(new Date()),
      endDate:
        draft.status === "Done"
          ? draft.endDate || formatDateForInput(new Date())
          : "",
    };

    dispatch(saveTask(task));
  };

  const handleAddTask = () => {
    dispatch(resetDraft());
    dispatch(setViewMode("edit"));
  };

  const handleCancel = () => {
    dispatch(resetDraft());
    dispatch(setViewMode("list"));
  };

  const handleBackToList = () => {
    dispatch(setSelectedTask(null));
    dispatch(setViewMode("list"));
  };

  return (
    <main className="task-shell">
      <h1 className="page-title">Wireframes Mockup</h1>

      {loading && <div className="alert info">Loading tasks...</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="toolbar">
        <button className="primary-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {viewMode === "list" && (
        <TaskTable
          tasks={visibleTasks.map((task) => ({
            ...task,
            startDate: getDisplayDate(task.startDate),
            endDate: getDisplayDate(task.endDate)
          }))}
          selectedTaskId={selectedTaskId}
          sortConfig={sortConfig}
          onSort={handleSort}
          onRowClick={handleRowClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      {viewMode === "detail" && selectedTask && (
        <TaskDetails
          task={{
            ...selectedTask,
            startDate: getDisplayDate(selectedTask.startDate),
            endDate: getDisplayDate(selectedTask.endDate)
          }}
          onEdit={handleEditClick}
          onBack={handleBackToList}
        />
      )}

      {viewMode === "edit" && (
        draft.id ? (
          <EditTaskForm
            draft={{
              ...draft,
              startDate: draft.startDate || "",
              endDate: draft.endDate || ""
            }}
            onDraftChange={handleDraftChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <AddTaskForm
            draft={{
              ...draft,
              startDate: draft.startDate || formatDateForInput(new Date()),
              endDate: draft.endDate || ""
            }}
            onDraftChange={handleDraftChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )
      )}
    </main>
  );
}

export default App;