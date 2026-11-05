import TaskForm from "./TaskForm";

export default function AddTaskForm({ draft, onDraftChange, onSubmit, onCancel }) {
  return (
    <TaskForm
      draft={draft}
      mode="add"
      onDraftChange={onDraftChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
