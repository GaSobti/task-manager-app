export const initialState = {
  tasks: [],
  draft: {
    id: null,
    title: "",
    assignedTo: "",
    status: "Open",
    priority: "High",
    startDate: "",
    endDate: ""
  },
  selectedTaskId: null,
  viewMode: "list",
  loading: false,
  error: ""
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case "TASKS_LOADING":
      return { ...state, loading: true, error: "" };

    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };

    case "TASKS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "SET_DRAFT":
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.payload.field]: action.payload.value
        }
      };

    case "RESET_DRAFT":
      return {
        ...state,
        draft: {
          id: null,
          title: "",
          assignedTo: "",
          status: "Open",
          priority: "High",
          startDate: "",
          endDate: ""
        }
      };

    case "START_EDIT_TASK":
      return {
        ...state,
        draft: { ...action.payload },
        viewMode: "edit"
      };

    case "SAVE_TASK": {
      const task = action.payload;
      const existing = state.tasks.some((item) => item.id === task.id);
      const isNewTask = !state.draft.id;

      return {
        ...state,
        tasks: existing
          ? state.tasks.map((item) => (item.id === task.id ? task : item))
          : [task, ...state.tasks],
        draft: {
          id: null,
          title: "",
          assignedTo: "",
          status: "Open",
          priority: "High",
          startDate: "",
          endDate: ""
        },
        selectedTaskId: task.id,
        viewMode: isNewTask ? "list" : "detail"
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        selectedTaskId: null,
        viewMode: "list"
      };

    case "SET_SELECTED_TASK":
      return {
        ...state,
        selectedTaskId: action.payload
      };

    case "SET_VIEW_MODE":
      return {
        ...state,
        viewMode: action.payload
      };

    default:
      return state;
  }
}

export default taskReducer;