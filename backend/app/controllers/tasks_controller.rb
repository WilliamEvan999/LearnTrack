class TasksController < ApplicationController
  before_action :require_login
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = current_user.tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render :show, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    if @task.update(task_params)
      render :show, status: :ok, location: @task
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy!
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :category, :due_date, :completed)
  end
end