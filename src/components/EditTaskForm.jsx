import TaskForm from "./TaskForm";

export default function EditTaskForm({ draft, onDraftChange, onSubmit, onCancel }) {
  return (
    <TaskForm
      draft={draft}
      mode="edit"
      onDraftChange={onDraftChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
