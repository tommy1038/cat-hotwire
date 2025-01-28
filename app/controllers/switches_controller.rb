class SwitchesController < ApplicationController
  def create
    case params[:switch]
    when "tab1"
      render partial: "switches/tab1", locals: { content: "Tab 1 Content" }
    when "tab2"
      render partial: "switches/tab2", locals: { content: "Tab 2 Content" }
    when "tab3"
      render partial: "switches/tab3", locals: { content: "Tab 3 Content" }
    else
      # render partial: "switches/default", locals: { content: "Default Content" }
    end
  end
end
