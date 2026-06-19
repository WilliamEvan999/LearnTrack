class ApplicationController < ActionController::API
  private

  def current_user
    token = request.headers["Authorization"]&.split(" ")&.last
    return nil if token.blank?

    decoded = JsonWebToken.decode(token)
    @current_user ||= User.find_by(id: decoded[:user_id])
  rescue JWT::DecodeError
    nil
  end

  def require_login
    unless current_user
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end