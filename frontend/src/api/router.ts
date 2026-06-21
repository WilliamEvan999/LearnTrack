import userEndpoints from "./user"
import studySessionEndPoints from "./studysession"
import courseEndpoints from "./course"
import lessonEndpoints from "./lesson"
import taskEndpoints from "./task"

const endpoints = {
  users: userEndpoints,
  studySession: studySessionEndPoints,
  courses: courseEndpoints,
  lessons: lessonEndpoints,
  tasks: taskEndpoints,
}

export default endpoints