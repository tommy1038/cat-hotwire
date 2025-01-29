class SwitchesController < ApplicationController
  def index
    puts "turbo_frame_request?: #{turbo_frame_request?}"
    puts request.headers["Turbo-Frame"]

    if turbo_frame_request? # Turbo Frame のリクエストかどうかを確認
      case params[:tab]
      when "tab1"
        render partial: "tab1"
      when "tab2"
        render partial: "tab2"
      when "tab3"
        render partial: "tab3"
      else
        head :not_found
      end
    end
  end
end
