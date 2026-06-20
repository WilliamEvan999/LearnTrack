import userEndpoints from "./user"
import studySessionEndPoints from "./studysession"
import courseEndpoints from "./course"
import lessonEndpoints from "./lesson"

const endpoints = {
  users: userEndpoints,
  studySession: studySessionEndPoints,
  courses: courseEndpoints,
  lessons: lessonEndpoints,
}

export default endpoints