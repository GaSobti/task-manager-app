export default function TaskTable({
  tasks,
  selectedTaskId,
  sortConfig,
  onSort,
  onRowClick,
  onEdit,
  onDelete
}) {
  return (
    <div className="table-section">
      <table className="task-table">
        <thead>
          <tr>
            <th>
              <button className="sort-button" onClick={() => onSort("title")}>
                Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>
              <button className="sort-button" onClick={() => onSort("assignedTo")}>
                Assigned To {sortConfig.key === "assignedTo" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>
              <button className="sort-button" onClick={() => onSort("status")}>
                Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>
              <button className="sort-button" onClick={() => onSort("priority")}>
                Priority {sortConfig.key === "priority" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
              </button>
            </th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={selectedTaskId === task.id ? "selected-row" : ""}
              onClick={() => onRowClick(task)}
            >
              <td data-label="Title">{task.title}</td>
              <td data-label="Assigned To">{task.assignedTo}</td>
              <td data-label="Status">{task.status}</td>
              <td data-label="Priority">{task.priority}</td>
              <td data-label="Start Date">{task.startDate}</td>
              <td data-label="End Date">{task.endDate || ""}</td>
              <td className="action-cell" data-label="Actions">
                <button className="mini-button" onClick={(event) => onEdit(event, task)}>
                  Edit
                </button>
                <button
                  className="mini-button danger"
                  onClick={(event) => onDelete(event, task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
