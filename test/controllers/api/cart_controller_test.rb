require "test_helper"

class Api::CartControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_cart_show_url
    assert_response :success
  end
end
