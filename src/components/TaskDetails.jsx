export default function TaskDetails({ task, onEdit, onBack }) {
  return (
    <section className="task-panel">
      <h2>Task Details</h2>
      <div className="detail-grid">
        <div><span className="label">Title</span><strong>{task.title}</strong></div>
        <div><span className="label">Assigned To</span><strong>{task.assignedTo}</strong></div>
        <div><span className="label">Status</span><strong>{task.status}</strong></div>
        <div><span className="label">Priority</span><strong>{task.priority}</strong></div>
        <div><span className="label">Start Date</span><strong>{task.startDate}</strong></div>
        <div><span className="label">End Date</span><strong>{task.endDate || "-"}</strong></div>
      </div>

      <div className="panel-actions">
        <button className="secondary-button" onClick={onBack}>
          Back
        </button>
        <button className="primary-button" onClick={(event) => onEdit(event, task)}>
          Edit Task
        </button>
      </div>
    </section>
  );
}
