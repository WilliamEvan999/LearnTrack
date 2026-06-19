class CoursesController < ApplicationController
  before_action :require_login
  before_action :set_course, only: %i[show update destroy]

  # GET /courses
  # GET /courses.json
  def index
    @courses = current_user.courses
  end

  # GET /courses/1
  # GET /courses/1.json
  def show
  end

  # POST /courses
  # POST /courses.json
  def create
    @course = current_user.courses.build(course_params)

    if @course.save
      render :show, status: :created, location: @course
    else
      render json: @course.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /courses/1
  # PATCH/PUT /courses/1.json
  def update
    if @course.update(course_params)
      render :show, status: :ok, location: @course
    else
      render json: @course.errors, status: :unprocessable_content
    end
  end

  # DELETE /courses/1
  # DELETE /courses/1.json
  def destroy
    @course.destroy!
  end

  private

  def set_course
    @course = current_user.courses.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:title, :category)
  end
end