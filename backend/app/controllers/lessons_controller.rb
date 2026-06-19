class LessonsController < ApplicationController
  before_action :require_login
  before_action :set_lesson, only: %i[show update destroy]

  # GET /lessons
  # GET /lessons.json
  def index
    @lessons = Lesson.joins(:course).where(courses: { user_id: current_user.id })
  end

  # GET /lessons/1
  # GET /lessons/1.json
  def show
  end

  # POST /lessons
  # POST /lessons.json
  def create
    course = current_user.courses.find(
      lesson_params[:course_id]
    )

    @lesson = course.lessons.build(
      title: lesson_params[:title],
      completed: lesson_params[:completed]
    )

    if @lesson.save
      render :show, status: :created, location: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /lessons/1
  # PATCH/PUT /lessons/1.json
  def update
    if @lesson.update(lesson_params)
      render :show, status: :ok, location: @lesson
    else
      render json: @lesson.errors, status: :unprocessable_content
    end
  end

  # DELETE /lessons/1
  # DELETE /lessons/1.json
  def destroy
    @lesson.destroy!
  end

  private

  def set_lesson
    @lesson = Lesson.joins(:course).where(courses: {user_id: current_user.id}).find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:title, :course_id, :completed)
  end
end