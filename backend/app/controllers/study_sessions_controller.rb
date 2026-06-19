class StudySessionsController < ApplicationController
  before_action :require_login
  before_action :set_study_session, only: %i[show update destroy]

  # GET /study_sessions
  # GET /study_sessions.json
  def index
    @study_sessions = current_user.study_sessions
  end

  # GET /study_sessions/1
  # GET /study_sessions/1.json
  def show
  end

  # POST /study_sessions
  # POST /study_sessions.json
  def create
    @study_session = current_user.study_sessions.build(study_session_params)

    if @study_session.save
      render :show, status: :created, location: @study_session
    else
      render json: @study_session.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /study_sessions/1
  # PATCH/PUT /study_sessions/1.json
  def update
    if @study_session.update(study_session_params)
      render :show, status: :ok, location: @study_session
    else
      render json: @study_session.errors, status: :unprocessable_content
    end
  end

  # DELETE /study_sessions/1
  # DELETE /study_sessions/1.json
  def destroy
    @study_session.destroy!
  end

  private

  def set_study_session
    @study_session = current_user.study_sessions.find(params[:id])
  end

  def study_session_params
    params.require(:study_session).permit(:description, :started_at, :ended_at, :duration_seconds)
  end
end