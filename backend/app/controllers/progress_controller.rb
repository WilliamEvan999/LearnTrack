class ProgressController < ApplicationController
  before_action :require_login

  def index
    total_courses = current_user.courses.count

    completed_courses = current_user.courses.select do |course|
      course.progress == 100
    end.count

    total_tasks = current_user.tasks.count

    completed_tasks = current_user.tasks.where(
      completed: true
    ).count

    study_seconds = current_user.study_sessions.sum(
      :duration_seconds
    )

    today_seconds = current_user.study_sessions
      .where(started_at: Time.zone.today.all_day)
      .sum(:duration_seconds)

    today = Time.zone.today

    study_performance = (today - 6.days..today).map do |date|
      sessions = current_user.study_sessions.select do |session|
        session.started_at.to_date == date
      end

      {
        date: date.strftime("%b %-d"),
        seconds: sessions.sum(&:duration_seconds)
      }
    end

    study_dates = current_user.study_sessions
      .group_by { |session| session.started_at.to_date }
      .select do |_date, sessions|
        sessions.sum(&:duration_seconds) >= 300
      end
      .keys
      .sort

    current_streak = 0

    date = Time.zone.today

    while study_dates.include?(date)
      current_streak += 1
      date -= 1.day
    end

    best_streak = 0
    streak = 0

    study_dates.each_with_index do |date, index|
      if index == 0
        streak = 1
      elsif date == study_dates[index - 1] + 1.day
        streak += 1
      else
        streak = 1
      end

      best_streak = [best_streak, streak].max
    end

    render json: {
      total_courses: total_courses,
      completed_courses: completed_courses,
      total_tasks: total_tasks,
      completed_tasks: completed_tasks,
      study_seconds: study_seconds,
      today_seconds: today_seconds,
      best_streak: best_streak,
      current_streak: current_streak,
      study_performance: study_performance
    }
  end
end