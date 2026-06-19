class SchedulesController < ApplicationController
  before_action :require_login
  before_action :set_schedule, only: %i[show update destroy]

  # GET /schedules
  # GET /schedules.json
  def index
    @schedules = current_user.schedules
  end

  # GET /schedules/1
  # GET /schedules/1.json
  def show
  end

  # POST /schedules
  # POST /schedules.json
  def create
    @schedule = current_user.schedules.build(schedule_params)

    if @schedule.save
      render :show, status: :created, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /schedules/1
  # PATCH/PUT /schedules/1.json
  def update
    if @schedule.update(schedule_params)
      render :show, status: :ok, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_content
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule.destroy!
  end

  private

  def set_schedule
    @schedule = current_user.schedules.find(params[:id])
  end

  def schedule_params
    params.require(:schedule).permit(:title, :schedule_date)
  end
end