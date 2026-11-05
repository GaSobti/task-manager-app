const statusOptions = ["Open", "In-Progress", "Under-review", "Done"];
const priorityOptions = ["Low", "Medium", "High"];

export default function TaskForm({
  draft,
  mode = "add",
  onDraftChange,
  onSubmit,
  onCancel
}) {
  return (
    <section className="task-panel">
      <h2>{mode === "edit" ? "Edit Task" : "Add Task"}</h2>

      <form className="task-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            Title
            <input
              name="title"
              value={draft.title}
              onChange={onDraftChange}
              required
            />
          </label>

          <label>
            Assigned To
            <input
              name="assignedTo"
              type="email"
              value={draft.assignedTo}
              onChange={onDraftChange}
              required
            />
          </label>

          <label>
            Status
            <select name="status" value={draft.status} onChange={onDraftChange}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Priority
            <select name="priority" value={draft.priority} onChange={onDraftChange}>
              {priorityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Start Date
            <input
              name="startDate"
              type="date"
              value={draft.startDate || ""}
              onChange={onDraftChange}
            />
          </label>

          <label>
            End Date
            <input
              name="endDate"
              type="date"
              value={draft.endDate || ""}
              onChange={onDraftChange}
              disabled={draft.status !== "Done"}
            />
          </label>
        </div>

        <div className="panel-actions">
          <button type="submit" className="primary-button">
            {mode === "edit" ? "Save Changes" : "Create Task"}
          </button>
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
