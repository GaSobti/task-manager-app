export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: "TASKS_LOADING" });

  try {
    const response = await fetch("https://dummyjson.com/todos?limit=5");
    const data = await response.json();

    const mappedTasks = data.todos.map((item, index) => {
      const startDateValue = `2024-01-${String(index + 1).padStart(2, "0")}`;
      const endDateValue = index % 4 === 3 ? "2024-01-10" : "";

      return {
        id: item.id,
        title: item.todo,
        assignedTo: `user${index + 1}@example.com`,
        status:
          index % 4 === 0
            ? "Open"
            : index % 4 === 1
            ? "In-Progress"
            : index % 4 === 2
            ? "Under-review"
            : "Done",
        priority:
          index % 3 === 0 ? "Low" : index % 3 === 1 ? "Medium" : "High",
        startDate: startDateValue,
        endDate: endDateValue,
        startDateDisplay: new Date(startDateValue).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }).replace(/\//g, ""),
        endDateDisplay: endDateValue
          ? new Date(endDateValue).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }).replace(/\//g, "")
          : ""
      };
    });

    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: mappedTasks });
  } catch (error) {
    dispatch({ type: "TASKS_ERROR", payload: error.message });
  }
};

export const setDraft = (field, value) => ({
  type: "SET_DRAFT",
  payload: { field, value }
});

export const resetDraft = () => ({
  type: "RESET_DRAFT"
});

export const saveTask = (task) => ({
  type: "SAVE_TASK",
  payload: task
});

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId
});

export const setSelectedTask = (taskId) => ({
  type: "SET_SELECTED_TASK",
  payload: taskId
});

export const setViewMode = (mode) => ({
  type: "SET_VIEW_MODE",
  payload: mode
});

export const startEditTask = (task) => ({
  type: "START_EDIT_TASK",
  payload: task
});