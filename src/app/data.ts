export const user = {
  name: "Zierss",
};

export const stats = [
  {
    id: 1,
    title: "Total Courses",
    value: 4,
    type: "courses",
  },


  {
    id: 2,
    title: "Total Tasks",
    value: 4,
    type: "total-tasks",
  },
  
  {
    id: 3,
    title: "Total Study Hours",
    value: "39h 24m 5s",
    type: "study-hours",
  },

  {
    id: 4,
    title: "Best Streak",
    value: "20 Days",
    type: "best-streak",
  },

  {
    id: 5,
    title: "Completed Courses",
    value: 1,
    type: "completed-courses",
  },

    {
    id: 6,
    title: "Completed Tasks",
    value: 2,
    type: "completed-tasks",
  },

   {
    id: 7,
    title: "Today Study Hours",
    value: "2h 29m 17s",
    type: "today-hours",
  },

    {
    id: 8,
    title: "Current Streak",
    value: "12 Days",
    type: "current-streak",                
  },


] as const;

export const courses = [
  {
    id: 1,
    title: "Calculus Basics",
    progress: 100,
    lessons: 4,
    category: "Mathematics",

    sessions: [
      {
        title: "Limits Introduction",
        completed: true,
      },

      {
        title: "Derivative Basics",
        completed: true,
      },

      {
        title: "Chain Rule",
        completed: true,
      },

      {
        title: "Integration Fundamentals",
        completed: true,
      },
    ],
  },

  {
    id: 2,
    title: "English Speaking",
    progress: 75,
    lessons: 4,
    category: "Language",

    sessions: [
      {
        title: "Daily Conversation",
        completed: true,
      },

      {
        title: "Pronunciation Practice",
        completed: true,
      },

      {
        title: "Public Speaking",
        completed: false,
      },

      {
        title: "Presentation Training",
        completed: false,
      },
    ],
  },

  {
    id: 3,
    title: "UI/UX Design",
    progress: 50,
    lessons: 4,
    category: "Design",

    sessions: [
      {
        title: "UI Principles",
        completed: true,
      },

      {
        title: "Color Theory",
        completed: true,
      },

      {
        title: "Wireframing",
        completed: false,
      },

      {
        title: "Mobile Design",
        completed: false,
      },
    ],
  },

  {
    id: 4,
    title: "World History",
    progress: 25,
    lessons: 4,
    category: "History",

    sessions: [
      {
        title: "Ancient Civilizations",
        completed: true,
      },

      {
        title: "Medieval Europe",
        completed: false,
      },

      {
        title: "World War I",
        completed: false,
      },

      {
        title: "World War II",
        completed: false,
      },
    ],
  },
];

export const tasks = [
  {
    id: 1,
    title: "Complete Calculus derivatives exercise",
    completed: false,
    dueDate: "2026-05-15",
    priority: "High",
    course: "Mathematics",
  },

  {
    id: 2,
    title: "Practice English presentation speaking",
    completed: true,
    dueDate: "2026-05-15",
    priority: "Medium",
    course: "Language",
  },

  {
    id: 3,
    title: "Create UI wireframe in Figma",
    completed: false,
    dueDate: "2026-05-18",
    priority: "High",
    course: "Design",
  },
];

export const activities = [
  {
    id: 1,
    activity: "Completed React Basics lesson",
    time: "2 hours ago",
  },

  {
    id: 2,
    activity: "Added new task",
    time: "5 hours ago",
  },

  {
    id: 3,
    activity: "Finished PostgreSQL module",
    time: "Yesterday",
  },
];

export const schedules = [
  {
    id: 1,
    title: "AI Assignment",
    date: "2026-05-14",
    type: "Assignment",
  },

  {
    id: 2,
    title: "UI Project Submission",
    date: "2026-05-15",
    type: "Project",
  },

  {
    id: 3,
    title: "Database Report",
    date: "2026-06-18",
    type: "Report",
  },
];
export const studyPerformance = [
  {
    date: "May 6",
    seconds: 7443,
    label: "2h 4m 3s",
  },

  {
    date: "May 7",
    seconds: 10824,
    label: "3h 0m 24s",
  },

  {
    date: "May 8",
    seconds: 9320,
    label: "2h 35m 20s",
  },

  {
    date: "May 9",
    seconds: 15412,
    label: "4h 16m 52s",
  },

  {
    date: "May 10",
    seconds: 18750,
    label: "5h 12m 30s",
  },

  {
    date: "May 11",
    seconds: 14300,
    label: "3h 58m 20s",
  },

  {
    date: "May 12",
    seconds: 25240,
    label: "7h 0m 40s",
  },
];