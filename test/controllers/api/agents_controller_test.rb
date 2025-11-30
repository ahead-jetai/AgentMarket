require "test_helper"

class Api::AgentsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_agents_show_url
    assert_response :success
  end
end
