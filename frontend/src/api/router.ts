import userEndpoints from "./user"
import courseEndpoints from "./course"
import lessonEndpoints from "./lesson"
import taskEndpoints from "./task"
import ScheduleEndpoints from "./schedule"
import studySessionEndPoints from "./studysession"
import progressEndpoints from "./progress"

const endpoints = {
  users: userEndpoints,
  courses: courseEndpoints,
  lessons: lessonEndpoints,
  tasks: taskEndpoints,
  schedule: ScheduleEndpoints,
  studySession: studySessionEndPoints,
  progress: progressEndpoints,
}

export default endpoints